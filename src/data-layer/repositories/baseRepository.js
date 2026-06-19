// baseRepository — the per-entity data-access factory. Every repository is a
// thin, uniform wrapper over the active DatabaseProvider, so the service layer
// gets the SAME API for every collection regardless of which backend is live.
//
// Layering: repositories sit BELOW services and ABOVE providers. They import
// only the provider FACTORY (never an SDK) and the universal schema (for
// defaults/validation). Services import repositories; repositories never import
// services. This keeps the dependency arrow pointing down and honours R4/R5.
//
// Auto‑provisioning: on write failure the repository checks whether the missing
// table exists — if not it calls ensureCollection then retries. It also detects
// unknown fields in the record payload and calls ensureColumn so the schema
// stays in sync without manual migration steps.
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

export function createRepository(collection) {
  const db = () => getDatabaseProvider();

  return {
    collection,

    // ---- reads ----
    getAll: (query = {}) => db().list(collection, query),
    getById: (id) => db().get(collection, id),
    query: (query = {}) => db().list(collection, query),
    count: (query = {}) => db().count(collection, query),

    // ---- writes with auto‑provisioning ----
    async create(record = {}) {
      const provider = db();
      const enriched = applyDefaults(collection, record);
      try {
        return await provider.create(collection, enriched);
      } catch (err) {
        await ensureCollectionExists(provider, collection);
        await ensureRecordColumns(provider, collection, enriched);
        return provider.create(collection, enriched);
      }
    },

    async update(id, patch = {}) {
      const provider = db();
      const stamped = { ...patch, updatedAt: nowISO() };
      try {
        return await provider.update(collection, id, stamped);
      } catch (err) {
        await ensureCollectionExists(provider, collection);
        await ensureRecordColumns(provider, collection, stamped);
        return provider.update(collection, id, stamped);
      }
    },

    delete: (id) => db().remove(collection, id),

    // ---- bulk ----
    async bulkCreate(records = []) {
      const provider = db();
      const enriched = records.map((r) => applyDefaults(collection, r));
      try {
        return await provider.bulkCreate(collection, enriched);
      } catch (err) {
        await ensureCollectionExists(provider, collection);
        await ensureRecordColumns(provider, collection, enriched[0] || {});
        return provider.bulkCreate(collection, enriched);
      }
    },

    bulkDelete: (ids = []) => db().bulkRemove(collection, ids),
    clear: () => db().clear(collection),

    // ---- helpers ----
    validate: (record = {}) => validateRecord(collection, record),
  };
}

export default createRepository;
