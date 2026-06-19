import { getDatabaseProvider } from '@/providers/database/index.js';
import { AllowlistEngine } from '@/core/AllowlistEngine.js';
import { schemas, collectionNames } from '@/data-provider/schema/index.js';
import { ok, fail } from '@/utils/result.js';

const PG_TYPE_MAP = { string: 'text', number: 'numeric', boolean: 'boolean', datetime: 'timestamptz', array: 'jsonb', object: 'jsonb' };

function toPgType(type) {
  return PG_TYPE_MAP[type] || 'text';
}

const provider = () => getDatabaseProvider();

export const databaseDdlService = {
  async listTables() {
    try {
      const p = provider();
      const existing = [];
      for (const name of collectionNames) {
        const exists = typeof p.collectionExists === 'function' ? await p.collectionExists(name) : false;
        existing.push({ name, exists, label: schemas[name]?.label || name, fields: Object.keys(schemas[name]?.fields || {}).length });
      }
      return ok(existing);
    } catch (e) { return fail(e); }
  },

  async getTableColumns(table) {
    try {
      const p = provider();
      let columns = null;
      if (typeof p.listColumns === 'function') {
        columns = await p.listColumns(table);
      }
      if (!columns) {
        const schema = schemas[table];
        if (!schema) return ok([]);
        columns = Object.entries(schema.fields || {}).map(([name, type]) => ({
          name, type: toPgType(type), schemaType: type,
        }));
      }
      return ok(columns);
    } catch (e) { return fail(e); }
  },

  async getTableIndexes(table) {
    try {
      const p = provider();
      let indexes = null;
      if (typeof p.listIndexes === 'function') {
        indexes = await p.listIndexes(table);
      }
      if (!indexes) {
        const schema = schemas[table];
        if (!schema) return ok([]);
        indexes = (schema.indexes || []).map((col) => ({ name: `${table}_${col}_idx`, column: col }));
      }
      return ok(indexes);
    } catch (e) { return fail(e); }
  },

  async getTablePolicies(table) {
    try {
      const p = provider();
      if (typeof p.execSql !== 'function') return ok([]);
      const sql = `SELECT policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE tablename = '${table.replace(/'/g, "''")}' ORDER BY policyname`;
      const res = await p.execSql(sql);
      if (!res.ok) return ok([]);
      return ok(Array.isArray(res.data) ? res.data : []);
    } catch { return ok([]); }
  },

  async createTable(name, fields) {
    try {
      if (!name || !fields || !fields.length) return fail('Table name and at least one field are required.');
      const cols = fields.map((f) => `"${f.name}" ${f.type || 'text'}${f.pk ? ' PRIMARY KEY' : ''}${f.nullable === false ? ' NOT NULL' : ''}${f.default !== undefined ? ` DEFAULT ${f.default}` : ''}`);
      const sql = `CREATE TABLE IF NOT EXISTS "${name}" (${cols.join(', ')});`;
      if (!AllowlistEngine.isAllowed(sql)) return fail(`Blocked by AllowlistEngine: ${sql.substring(0, 80)}`);
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'CREATE TABLE failed');
    } catch (e) { return fail(e); }
  },

  async addColumn(table, column, type, options = {}) {
    try {
      if (!table || !column || !type) return fail('table, column and type are required.');
      let sql = `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${column}" ${type}`;
      if (options.nullable === false) sql += ' NOT NULL';
      if (options.default !== undefined) sql += ` DEFAULT ${options.default}`;
      sql += ';';
      if (!AllowlistEngine.isAllowed(sql)) return fail(`Blocked by AllowlistEngine: ${sql.substring(0, 80)}`);
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'ADD COLUMN failed');
    } catch (e) { return fail(e); }
  },

  async dropColumn(table, column) {
    try {
      if (!table || !column) return fail('table and column are required.');
      const sql = `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${column}";`;
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'DROP COLUMN failed');
    } catch (e) { return fail(e); }
  },

  async createIndex(table, column, indexName) {
    try {
      if (!table || !column) return fail('table and column are required.');
      const name = indexName || `${table}_${column}_idx`;
      const sql = `CREATE INDEX IF NOT EXISTS "${name}" ON "${table}" ("${column}");`;
      if (!AllowlistEngine.isAllowed(sql)) return fail(`Blocked by AllowlistEngine: ${sql.substring(0, 80)}`);
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'CREATE INDEX failed');
    } catch (e) { return fail(e); }
  },

  async dropIndex(table, indexName) {
    try {
      if (!indexName) return fail('indexName is required.');
      const sql = `DROP INDEX IF EXISTS "${indexName}";`;
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'DROP INDEX failed');
    } catch (e) { return fail(e); }
  },

  async createPolicy(name, table, usingExpr, checkExpr) {
    try {
      if (!name || !table) return fail('policy name and table are required.');
      let sql = `CREATE POLICY "${name}" ON "${table}" FOR ALL USING (${usingExpr || 'true'})`;
      if (checkExpr) sql += ` WITH CHECK (${checkExpr})`;
      sql += ';';
      if (!AllowlistEngine.isAllowed(sql)) return fail(`Blocked by AllowlistEngine: ${sql.substring(0, 80)}`);
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'CREATE POLICY failed');
    } catch (e) { return fail(e); }
  },

  async dropPolicy(name, table) {
    try {
      if (!name || !table) return fail('policy name and table are required.');
      const sql = `DROP POLICY IF EXISTS "${name}" ON "${table}";`;
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'DROP POLICY failed');
    } catch (e) { return fail(e); }
  },

  async executeSql(sql) {
    try {
      if (!sql || typeof sql !== 'string') return fail('No SQL provided.');
      const validation = AllowlistEngine.validate(sql);
      if (!validation.valid) return fail(validation.errors.map((e) => `Statement ${e.statement}: ${e.reason}`).join('; '));
      const p = provider();
      const statements = AllowlistEngine.splitStatements(sql).filter((s) => s.trim());
      const results = [];
      for (const stmt of statements) {
        if (!stmt.trim()) continue;
        if (!AllowlistEngine.isAllowed(stmt.trim())) {
          results.push({ sql: stmt.substring(0, 80), ok: false, error: 'Blocked by AllowlistEngine' });
          continue;
        }
        const res = await p.safeDdl(stmt.trim());
        results.push({ sql: stmt.substring(0, 80), ok: res.ok, error: res.error || null });
      }
      const allOk = results.every((r) => r.ok);
      return ok({ results, allOk, statementCount: statements.length });
    } catch (e) { return fail(e); }
  },

  async renameTable(oldName, newName) {
    try {
      if (!oldName || !newName) return fail('old and new table names are required.');
      const sql = `ALTER TABLE IF EXISTS "${oldName}" RENAME TO "${newName}";`;
      const p = provider();
      const res = await p.safeDdl(sql);
      return res.ok ? ok({ sql }) : fail(res.error || 'RENAME failed');
    } catch (e) { return fail(e); }
  },

  async getTableSql(table) {
    try {
      const schema = schemas[table];
      if (!schema) return ok('');
      const cols = Object.entries(schema.fields || {}).map(([name, type]) => `  "${name}" ${toPgType(type)}`).join(',\n');
      const sql = `CREATE TABLE IF NOT EXISTS "${table}" (\n${cols}\n);`;
      return ok(sql);
    } catch (e) { return fail(e); }
  },

  async getSchemaForTable(table) {
    try {
      const s = schemas[table];
      if (!s) return ok(null);
      return ok({
        collection: s.collection,
        label: s.label,
        fields: Object.entries(s.fields || {}).map(([name, type]) => ({ name, type: toPgType(type), schemaType: type })),
        indexes: (s.indexes || []).map((col) => ({ name: `${table}_${col}_idx`, column: col })),
        required: s.required || [],
        defaults: s.defaults || {},
      });
    } catch (e) { return fail(e); }
  },
};

export default databaseDdlService;
