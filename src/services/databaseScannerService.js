import { getDatabaseProvider } from '@/providers/database/index.js';

const CATALOG_QUERIES = {
  schemas: `select schema_name as name from information_schema.schemata order by schema_name`,

  tables: `select tablename as name, schemaname, tableowner, tablespace, hasindexes, hasrules, hastriggers, rowsecurity from pg_tables where schemaname not in ('pg_catalog','information_schema') order by tablename`,

  columns: `select c.table_name, c.column_name, c.data_type, c.is_nullable, c.column_default, c.character_maximum_length, c.numeric_precision, c.numeric_scale, c.is_generated, c.is_identity from information_schema.columns c join pg_tables t on t.tablename = c.table_name where c.table_schema = 'public' order by c.table_name, c.ordinal_position`,

  primaryKeys: `select tc.table_name, kc.column_name, tc.constraint_name from information_schema.table_constraints tc join information_schema.key_column_usage kc on tc.constraint_name = kc.constraint_name where tc.constraint_type = 'PRIMARY KEY' and tc.table_schema = 'public' order by tc.table_name, kc.ordinal_position`,

  foreignKeys: `select tc.table_name, kc.column_name, tc.constraint_name, c.confrelid::regclass as referenced_table, a.attname as referenced_column from information_schema.table_constraints tc join information_schema.key_column_usage kc on tc.constraint_name = kc.constraint_name join pg_constraint c on c.conname = tc.constraint_name join pg_attribute a on a.attrelid = c.confrelid and a.attnum = c.confkey[1] where tc.constraint_type = 'FOREIGN KEY' and tc.table_schema = 'public' order by tc.table_name`,

  uniqueConstraints: `select tc.table_name, kc.column_name, tc.constraint_name from information_schema.table_constraints tc join information_schema.key_column_usage kc on tc.constraint_name = kc.constraint_name where tc.constraint_type = 'UNIQUE' and tc.table_schema = 'public' order by tc.table_name`,

  checkConstraints: `select tc.table_name, tc.constraint_name, cc.check_clause from information_schema.table_constraints tc join information_schema.check_constraints cc on tc.constraint_name = cc.constraint_name where tc.constraint_type = 'CHECK' and tc.table_schema = 'public'`,

  indexes: `select indexname as name, tablename, indexdef, tablespace, indexdef from pg_indexes where schemaname = 'public' order by tablename, indexname`,

  duplicateIndexes: `select indexname, tablename, indexdef from pg_indexes where schemaname = 'public' and indexname like '%copy%' or indexname like '%dup%' or indexname like '%backup%' or indexname like '%old%' order by tablename`,

  views: `select table_name as name, view_definition from information_schema.views where table_schema = 'public' order by table_name`,

  functions: `select p.proname as name, p.prosrc as source, l.lanname as language, p.prorettype::regtype as return_type from pg_proc p join pg_namespace n on n.oid = p.pronamespace join pg_language l on l.oid = p.prolang where n.nspname = 'public' and p.prokind = 'f' order by p.proname`,

  triggers: `select trigger_name, event_manipulation, event_object_table, action_statement, action_timing from information_schema.triggers where trigger_schema = 'public' order by trigger_name`,

  policies: `select policyname as name, tablename, permissive, roles, cmd, qual, with_check from pg_policies order by tablename, policyname`,

  extensions: `select extname as name, extversion as version, extrelocatable, extconfig from pg_extension order by extname`,

  enums: `select t.typname as name, array_agg(e.enumlabel order by e.enumsortorder) as values from pg_type t join pg_enum e on e.enumtypid = t.oid join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' group by t.typname order by t.typname`,

  storageBuckets: `select id, name, owner, public, created_at, updated_at from buckets`,

  roles: `select rolname as name, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin, rolvaliduntil from pg_roles where rolname not like 'pg_%' order by rolname`,

  publications: `select pubname as name, puballtables, pubinsert, pubupdate, pubdelete, pubtruncate from pg_publication order by pubname`,

  tableSizes: `select relname as name, pg_size_pretty(pg_total_relation_size(relid)) as size, pg_total_relation_size(relid) as bytes, (select count(*) from pg_stat_user_tables where relname = t.relname) as seq_scan from pg_catalog.pg_statio_user_tables t join pg_class c on c.relname = t.relname order by pg_total_relation_size(relid) desc`,

  duplicateRecords: `select table_name, count(*) as total, count(distinct (column_name)) as distinct_count from information_schema.columns where table_schema = 'public' group by table_name`,

  brokenForeignKeys: `select conrelid::regclass as table_name, conname as constraint_name, confrelid::regclass as referenced_table from pg_constraint where confrelid is not null and contype = 'f' and not exists (select 1 from pg_class c2 where c2.oid = pg_constraint.confrelid)`,

  tableColumns: `select table_name, count(*) as column_count from information_schema.columns where table_schema = 'public' group by table_name order by table_name`,
};

export const databaseScannerService = {
  async scanAll() {
    const provider = getDatabaseProvider();
    if (typeof provider.execSql !== 'function') {
      return { ok: false, error: 'Provider does not support SQL introspection.' };
    }

    const run = async (key, query) => {
      try {
        const res = await provider.execSql(query);
        if (res.ok && Array.isArray(res.data)) return res.data;
        return { error: res.error || `Query failed for ${key}` };
      } catch (e) {
        return { error: e.message };
      }
    };

    const [schemas, tables, columns, primaryKeys, foreignKeys, uniqueConstraints, checkConstraints, indexes, views, functions, triggers, policies, extensions, enums, storageBuckets, roles, publications, tableSizes, duplicateIndexes] = await Promise.all([
      run('schemas', CATALOG_QUERIES.schemas),
      run('tables', CATALOG_QUERIES.tables),
      run('columns', CATALOG_QUERIES.columns),
      run('primaryKeys', CATALOG_QUERIES.primaryKeys),
      run('foreignKeys', CATALOG_QUERIES.foreignKeys),
      run('uniqueConstraints', CATALOG_QUERIES.uniqueConstraints),
      run('checkConstraints', CATALOG_QUERIES.checkConstraints),
      run('indexes', CATALOG_QUERIES.indexes),
      run('views', CATALOG_QUERIES.views),
      run('functions', CATALOG_QUERIES.functions),
      run('triggers', CATALOG_QUERIES.triggers),
      run('policies', CATALOG_QUERIES.policies),
      run('extensions', CATALOG_QUERIES.extensions),
      run('enums', CATALOG_QUERIES.enums),
      run('storageBuckets', CATALOG_QUERIES.storageBuckets).catch(() => []),
      run('roles', CATALOG_QUERIES.roles),
      run('publications', CATALOG_QUERIES.publications).catch(() => []),
      run('tableSizes', CATALOG_QUERIES.tableSizes),
      run('duplicateIndexes', CATALOG_QUERIES.duplicateIndexes),
    ]);

    const columnsByTable = {};
    if (Array.isArray(columns)) {
      for (const col of columns) {
        if (!columnsByTable[col.table_name]) columnsByTable[col.table_name] = [];
        columnsByTable[col.table_name].push(col);
      }
    }

    const indexesByTable = {};
    if (Array.isArray(indexes)) {
      for (const idx of indexes) {
        if (!indexesByTable[idx.tablename]) indexesByTable[idx.tablename] = [];
        indexesByTable[idx.tablename].push(idx);
      }
    }

    const policiesByTable = {};
    if (Array.isArray(policies)) {
      for (const pol of policies) {
        if (!policiesByTable[pol.tablename]) policiesByTable[pol.tablename] = [];
        policiesByTable[pol.tablename].push(pol);
      }
    }

    const tableDetails = {};
    if (Array.isArray(tables)) {
      for (const t of tables) {
        tableDetails[t.name] = {
          ...t,
          columns: columnsByTable[t.name] || [],
          indexes: indexesByTable[t.name] || [],
          policies: policiesByTable[t.name] || [],
        };
      }
    }

    return {
      ok: true,
      summary: {
        schemas: Array.isArray(schemas) ? schemas.length : 0,
        tables: Array.isArray(tables) ? tables.length : 0,
        columns: Array.isArray(columns) ? columns.length : 0,
        primaryKeys: Array.isArray(primaryKeys) ? primaryKeys.length : 0,
        foreignKeys: Array.isArray(foreignKeys) ? foreignKeys.length : 0,
        uniqueConstraints: Array.isArray(uniqueConstraints) ? uniqueConstraints.length : 0,
        checkConstraints: Array.isArray(checkConstraints) ? checkConstraints.length : 0,
        indexes: Array.isArray(indexes) ? indexes.length : 0,
        views: Array.isArray(views) ? views.length : 0,
        functions: Array.isArray(functions) ? functions.length : 0,
        triggers: Array.isArray(triggers) ? triggers.length : 0,
        policies: Array.isArray(policies) ? policies.length : 0,
        extensions: Array.isArray(extensions) ? extensions.length : 0,
        enums: Array.isArray(enums) ? enums.length : 0,
        storageBuckets: Array.isArray(storageBuckets) ? storageBuckets.length : 0,
        roles: Array.isArray(roles) ? roles.length : 0,
        publications: Array.isArray(publications) ? publications.length : 0,
      },
      details: {
        schemas: Array.isArray(schemas) ? schemas : [],
        tables: tableDetails,
        tableNames: Array.isArray(tables) ? tables.map((t) => t.name) : [],
        columns: Array.isArray(columns) ? columns : [],
        primaryKeys: Array.isArray(primaryKeys) ? primaryKeys : [],
        foreignKeys: Array.isArray(foreignKeys) ? foreignKeys : [],
        uniqueConstraints: Array.isArray(uniqueConstraints) ? uniqueConstraints : [],
        checkConstraints: Array.isArray(checkConstraints) ? checkConstraints : [],
        indexes: Array.isArray(indexes) ? indexes : [],
        views: Array.isArray(views) ? views : [],
        functions: Array.isArray(functions) ? functions : [],
        triggers: Array.isArray(triggers) ? triggers : [],
        policies: Array.isArray(policies) ? policies : [],
        extensions: Array.isArray(extensions) ? extensions : [],
        enums: Array.isArray(enums) ? enums : [],
        storageBuckets: Array.isArray(storageBuckets) ? storageBuckets : [],
        roles: Array.isArray(roles) ? roles : [],
        publications: Array.isArray(publications) ? publications : [],
        tableSizes: Array.isArray(tableSizes) ? tableSizes : [],
        duplicateIndexes: Array.isArray(duplicateIndexes) ? duplicateIndexes : [],
      },
    };
  },
};

export default databaseScannerService;
