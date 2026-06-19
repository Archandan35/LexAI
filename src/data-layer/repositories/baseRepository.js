// baseRepository — the per-entity data-access factory. Every repository is a
// thin, uniform wrapper over the active DatabaseProvider, so the service layer
// gets the SAME API for every collection regardless of which backend is live.
//
// Layering: repositories sit BELOW services and ABOVE providers. They import
// only the provider FACTORY (never an SDK) and the universal schema (for
// defaults/validation). Services import repositories; repositories never import
// services. This keeps the dependency arrow pointing down and honours R4/R5.
//
// Auto‑provisioning: on ANY failure (read or write) the repository checks
// whether the missing table exists — if not it calls ensureCollection then
// retries. This means unused collections never hit the database at all; the
// first access auto-creates the table. It also detects unknown fields in write
// payloads and calls ensureColumn so the schema stays in sync without manual
// migration steps.
import { getDatabaseProvider } from '@/providers/database/index.js';
import { applyDefaults, validateRecord, getSchema } from '@/data-provider/schema/index.js';
import { nowISO } from '@/utils/id.js';

async function ensureCollectionExists(db, collection) {
  const exists = await db.collectionExists(collection).catch(() => false);
  if (!exists) {
    const schema = getSchema(collection);
    await db.ensureCollection(collection, schema || {}).catch(() => {});
  }
  return exists;
}

async function ensureRecordColumns(db, collection, record) {
  const schema = getSchema(collection);
  if (!schema || typeof db.listColumns !== 'function') return;
  const liveColumns = await db.listColumns(collection).catch(() => null);
  if (!liveColumns) return;
  const liveNames = new Set(liveColumns.map((c) => c.name.toLowerCase()));
  const PG_TYPE_MAP = { string: 'text', number: 'numeric', boolean: 'boolean', datetime: 'timestamptz', array: 'jsonb', object: 'jsonb', json: 'jsonb' };

  for (const [field, val] of Object.entries(record)) {
    if (field === 'id') continue;
    if (!liveNames.has(field.toLowerCase())) {
      const fieldType = schema.fields?.[field] || (typeof val === 'number' ? 'numeric' : 'text');
      const canonicalType = PG_TYPE_MAP[fieldType] || fieldType;
      // eslint-disable-next-line no-await-in-loop
      await db.ensureColumn(collection, field, canonicalType).catch(() => {});
      liveNames.add(field.toLowerCase());
    }
  }
}

// Retry a provider operation once after provisioning the collection if it fails.
async function withProvisioning(provider, collection, fn) {
  try {
    return await fn();
  } catch (err) {
    await ensureCollectionExists(provider, collection);
    return fn();
  }
}

export function createRepository(collection) {
  const provider = () => getDatabaseProvider();

  return {
    collection,

    // ---- reads with auto‑provisioning ----
    getAll: (query = {}) => withProvisioning(provider(), collection, () => provider().list(collection, query)),
    getById: (id) => withProvisioning(provider(), collection, () => provider().get(collection, id)),
    query: (query = {}) => withProvisioning(provider(), collection, () => provider().list(collection, query)),
    count: (query = {}) => withProvisioning(provider(), collection, () => provider().count(collection, query)),

    // ---- writes with auto‑provisioning ----
    async create(record = {}) {
      const p = provider();
      const enriched = applyDefaults(collection, record);
      try {
        return await p.create(collection, enriched);
      } catch (err) {
        await ensureCollectionExists(p, collection);
        await ensureRecordColumns(p, collection, enriched);
        return p.create(collection, enriched);
      }
    },

    async update(id, patch = {}) {
      const p = provider();
      const stamped = { ...patch, updatedAt: nowISO() };
      try {
        return await p.update(collection, id, stamped);
      } catch (err) {
        await ensureCollectionExists(p, collection);
        await ensureRecordColumns(p, collection, stamped);
        return p.update(collection, id, stamped);
      }
    },

    delete: (id) => provider().remove(collection, id),

    // ---- bulk ----
    async bulkCreate(records = []) {
      const p = provider();
      const enriched = records.map((r) => applyDefaults(collection, r));
      try {
        return await p.bulkCreate(collection, enriched);
      } catch (err) {
        await ensureCollectionExists(p, collection);
        await ensureRecordColumns(p, collection, enriched[0] || {});
        return p.bulkCreate(collection, enriched);
      }
    },

    bulkDelete: (ids = []) => provider().bulkRemove(collection, ids),
    clear: () => provider().clear(collection),

    // ---- helpers ----
    validate: (record = {}) => validateRecord(collection, record),
  };
}

export default createRepository;
