// SchemaMappingService — manages LexAI entity ↔ provider table/field name mapping.
// Pages use only LexAI names (users, cases, documents). This service translates
// to provider-specific names (app_users, tbl_cases, doc_records) via the
// schema_mapping registry table + in-memory FieldMapper.

import { getDatabaseProvider } from '@/providers/database/index.js';
import { listSchemas, getSchema } from '@/data-provider/schema/index.js';
import { FieldMapper } from '@/core/FieldMapper.js';

const MAPPING_TABLE = 'schema_mapping';
const HISTORY_TABLE = 'mapping_history';
const VERSIONS_TABLE = 'mapping_versions';

export const SchemaMappingService = {
  // Load all active mappings from DB into the in-memory FieldMapper
  async loadMappings() {
    const provider = getDatabaseProvider();
    try {
      const rows = await provider.list(MAPPING_TABLE, { active: 'true' });
      for (const row of rows) {
        FieldMapper.setTableMapping(row.entity_name, row.provider_table);
      }
      return { ok: true, count: rows.length };
    } catch {
      return { ok: false, count: 0 };
    }
  },

  // List all mappings with entity metadata
  async listMappings() {
    const provider = getDatabaseProvider();
    try {
      const rows = await provider.list(MAPPING_TABLE, {});
      const schemas = listSchemas();
      return rows.map((r) => {
        const s = schemas.find((x) => x.collection === r.entity_name);
        return { ...r, fields: s ? Object.keys(s.fields) : [] };
      });
    } catch {
      return [];
    }
  },

  // Create or update a mapping
  async setMapping(entityName, providerTable, reason = '') {
    const provider = getDatabaseProvider();
    const existing = await this.getMapping(entityName);
    const oldTable = existing?.provider_table || null;

    if (existing) {
      await provider.update(MAPPING_TABLE, existing.id, {
        provider_table: providerTable,
        version: (existing.version || 1) + 1,
        updated_at: new Date().toISOString(),
      });
    } else {
      await provider.create(MAPPING_TABLE, {
        entity_name: entityName,
        provider_table: providerTable,
        description: `Auto-mapped ${entityName} → ${providerTable}`,
        active: true,
        version: 1,
      });
    }

    await provider.create(HISTORY_TABLE, {
      entity_name: entityName,
      old_table: oldTable,
      new_table: providerTable,
      change_reason: reason || `Updated mapping ${entityName} → ${providerTable}`,
    });

    FieldMapper.setTableMapping(entityName, providerTable);
    return { ok: true };
  },

  // Get mapping for a specific entity
  async getMapping(entityName) {
    const provider = getDatabaseProvider();
    try {
      const rows = await provider.list(MAPPING_TABLE, { entity_name: `eq.${entityName}` });
      return rows[0] || null;
    } catch {
      return null;
    }
  },

  // Delete a mapping (soft delete by setting active=false)
  async removeMapping(entityName) {
    const provider = getDatabaseProvider();
    const existing = await this.getMapping(entityName);
    if (!existing) return { ok: false, error: 'Mapping not found' };
    await provider.update(MAPPING_TABLE, existing.id, {
      active: false,
      updated_at: new Date().toISOString(),
    });
    await provider.create(HISTORY_TABLE, {
      entity_name: entityName,
      old_table: existing.provider_table,
      new_table: entityName,
      change_reason: `Deactivated mapping for ${entityName}`,
    });
    return { ok: true };
  },

  // Save a versioned snapshot of all current mappings
  async saveSnapshot(description = '') {
    const provider = getDatabaseProvider();
    const mappings = await this.listMappings();
    const version = Date.now();
    await provider.create(VERSIONS_TABLE, {
      version,
      snapshot: JSON.stringify(mappings),
      description,
    });
    return { ok: true, version };
  },

  // List mapping versions
  async listVersions() {
    const provider = getDatabaseProvider();
    try {
      return await provider.list(VERSIONS_TABLE, {});
    } catch {
      return [];
    }
  },

  // Export all mappings as JSON
  async exportMappings() {
    const mappings = await this.listMappings();
    return {
      format: 'lexai-schema-mapping-v1',
      exported_at: new Date().toISOString(),
      mappings: mappings.map((m) => ({
        entity: m.entity_name,
        table: m.provider_table,
        active: m.active,
      })),
    };
  },

  // Import mappings from JSON
  async importMappings(json) {
    if (!json || json.format !== 'lexai-schema-mapping-v1') {
      return { ok: false, error: 'Invalid mapping format' };
    }
    const results = [];
    for (const m of json.mappings || []) {
      if (!m.entity || !m.table) continue;
      try {
        await this.setMapping(m.entity, m.table, 'Imported from JSON');
        results.push({ entity: m.entity, ok: true });
      } catch (e) {
        results.push({ entity: m.entity, ok: false, error: e.message });
      }
    }
    return { ok: true, results };
  },

  // Detect naming conflicts between multiple entities mapping to the same table
  async detectConflicts() {
    const mappings = await this.listMappings();
    const active = mappings.filter((m) => m.active);
    const tableMap = {};
    for (const m of active) {
      if (!tableMap[m.provider_table]) tableMap[m.provider_table] = [];
      tableMap[m.provider_table].push(m.entity_name);
    }
    const conflicts = Object.entries(tableMap)
      .filter(([, entities]) => entities.length > 1)
      .map(([table, entities]) => ({ table, entities }));
    return conflicts;
  },

  // Unmapped entities (entities without an active mapping)
  async detectUnmapped() {
    const schemas = listSchemas();
    const mappings = await this.listMappings();
    const mappedNames = new Set(mappings.filter((m) => m.active).map((m) => m.entity_name));
    return schemas
      .filter((s) => !mappedNames.has(s.collection))
      .map((s) => s.collection);
  },

  // Reset all mappings to defaults (entity name = table name)
  async resetDefaults() {
    const schemas = listSchemas();
    const results = [];
    for (const s of schemas) {
      try {
        await this.setMapping(s.collection, s.collection, 'Reset to default');
        results.push({ entity: s.collection, ok: true });
      } catch (e) {
        results.push({ entity: s.collection, ok: false, error: e.message });
      }
    }
    return { ok: true, results };
  },
};

export default SchemaMappingService;
