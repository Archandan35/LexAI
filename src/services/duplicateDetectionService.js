import { getDatabaseProvider } from '@/providers/database/index.js';

const DUPLICATE_QUERIES = {
  duplicateTables: `
    select a.tablename as table_a, b.tablename as table_b,
      (select string_agg(column_name || ':' || data_type, ',' order by ordinal_position)
       from information_schema.columns
       where table_schema = 'public' and table_name = a.tablename) as columns_a,
      (select string_agg(column_name || ':' || data_type, ',' order by ordinal_position)
       from information_schema.columns
       where table_schema = 'public' and table_name = b.tablename) as columns_b
    from pg_tables a
    join pg_tables b on a.tablename < b.tablename
      and a.schemaname = 'public' and b.schemaname = 'public'
      and a.tablename like '%' || b.tablename || '%' or b.tablename like '%' || a.tablename || '%'
    order by a.tablename
  `,
  duplicateIndexesByColumns: `
    select a.indexname as index_a, b.indexname as index_b,
      a.tablename, a.indexdef as def_a, b.indexdef as def_b
    from pg_indexes a
    join pg_indexes b on a.tablename = b.tablename
      and a.indexname < b.indexname
      and a.schemaname = 'public' and b.schemaname = 'public'
      and translate(a.indexdef, '()', '') = translate(b.indexdef, '()', '')
    order by a.tablename
  `,
  duplicatePolicies: `
    select a.policyname as policy_a, b.policyname as policy_b,
      a.tablename, a.cmd, a.qual, a.with_check
    from pg_policies a
    join pg_policies b on a.tablename = b.tablename
      and a.policyname < b.policyname
      and coalesce(a.qual, '') = coalesce(b.qual, '')
      and coalesce(a.with_check, '') = coalesce(b.with_check, '')
    order by a.tablename
  `,
  duplicateFunctions: `
    select a.proname as name_a, b.proname as name_b,
      a.prosrc as source_a, b.prosrc as source_b
    from pg_proc a
    join pg_proc b on a.proname < b.proname
      and a.pronamespace = (select oid from pg_namespace where nspname = 'public')
      and b.pronamespace = (select oid from pg_namespace where nspname = 'public')
      and a.prosrc = b.prosrc
    order by a.proname
  `,
  duplicateTriggers: `
    select a.trigger_name as trigger_a, b.trigger_name as trigger_b,
      a.event_object_table, a.event_manipulation, a.action_statement
    from information_schema.triggers a
    join information_schema.triggers b
      on a.event_object_table = b.event_object_table
      and a.trigger_name < b.trigger_name
      and a.event_manipulation = b.event_manipulation
      and a.trigger_schema = 'public' and b.trigger_schema = 'public'
    order by a.event_object_table
  `,
  duplicateViews: `
    select a.table_name as view_a, b.table_name as view_b,
      a.view_definition
    from information_schema.views a
    join information_schema.views b
      on a.table_schema = 'public' and b.table_schema = 'public'
      and a.table_name < b.table_name
      and a.view_definition = b.view_definition
    order by a.table_name
  `,
  duplicateConstraints: `
    select a.conname as constraint_a, b.conname as constraint_b,
      a.conrelid::regclass::text as table_name,
      a.contype, pg_get_constraintdef(a.oid) as def_a
    from pg_constraint a
    join pg_constraint b on a.conrelid = b.conconfrelid
      and a.conname < b.conname
      and a.contype = b.contype
      and a.conrelid = b.conrelid
      and pg_get_constraintdef(a.oid) = pg_get_constraintdef(b.oid)
    order by a.conrelid::regclass::text
  `,
  duplicateEnums: `
    select a.typname as enum_a, b.typname as enum_b,
      a.values as values_a
    from (
      select t.typname, array_agg(e.enumlabel order by e.enumsortorder) as values
      from pg_type t
      join pg_enum e on e.enumtypid = t.oid
      join pg_namespace n on n.oid = t.typnamespace
      where n.nspname = 'public'
      group by t.typname
    ) a
    join (
      select t.typname, array_agg(e.enumlabel order by e.enumsortorder) as values
      from pg_type t
      join pg_enum e on e.enumtypid = t.oid
      join pg_namespace n on n.oid = t.typnamespace
      where n.nspname = 'public'
      group by t.typname
    ) b on a.typname < b.typname and a.values = b.values
  `,
  unusedIndexes: `
    select indexrelid::regclass::text as index_name,
      relname as table_name,
      idx_scan as scans
    from pg_stat_user_indexes
    where idx_scan = 0
    order by relname
  `,
  circularForeignKeys: `
    with recursive fk_chain as (
      select conname, conrelid::regclass::text as src, confrelid::regclass::text as dst
      from pg_constraint where contype = 'f'
      union
      select c.conname, c.conrelid::regclass, c.confrelid::regclass
      from pg_constraint c
      join fk_chain fc on c.conrelid::regclass::text = fc.dst and c.contype = 'f'
    )
    select distinct src, dst from fk_chain
    where src = dst
  `,
  orphanRecords: `
    select conrelid::regclass::text as table_name,
      confrelid::regclass::text as referenced_table,
      conname as constraint_name
    from pg_constraint
    where contype = 'f' and confrelid is not null
      and not exists (
        select 1 from pg_class c where c.oid = pg_constraint.confrelid
      )
  `,
};

export const duplicateDetectionService = {
  async detect(scanResult) {
    const provider = getDatabaseProvider();
    if (typeof provider.execSql !== 'function') {
      return { ok: false, error: 'Provider does not support SQL introspection.' };
    }

    const run = async (key, query) => {
      try {
        const res = await provider.execSql(query);
        if (res.ok && Array.isArray(res.data)) return res.data;
        return [];
      } catch {
        return [];
      }
    };

    const [
      duplicateTables, duplicateIndexesByCols, duplicatePolicies,
      duplicateFunctions, duplicateTriggers, duplicateViews,
      duplicateConstraints, duplicateEnums, unusedIndexes,
      circularForeignKeys, orphanRecords,
    ] = await Promise.all([
      run('duplicateTables', DUPLICATE_QUERIES.duplicateTables),
      run('duplicateIndexesByColumns', DUPLICATE_QUERIES.duplicateIndexesByColumns),
      run('duplicatePolicies', DUPLICATE_QUERIES.duplicatePolicies),
      run('duplicateFunctions', DUPLICATE_QUERIES.duplicateFunctions),
      run('duplicateTriggers', DUPLICATE_QUERIES.duplicateTriggers),
      run('duplicateViews', DUPLICATE_QUERIES.duplicateViews),
      run('duplicateConstraints', DUPLICATE_QUERIES.duplicateConstraints),
      run('duplicateEnums', DUPLICATE_QUERIES.duplicateEnums),
      run('unusedIndexes', DUPLICATE_QUERIES.unusedIndexes),
      run('circularForeignKeys', DUPLICATE_QUERIES.circularForeignKeys),
      run('orphanRecords', DUPLICATE_QUERIES.orphanRecords),
    ]);

    const duplicates = [];

    for (const row of duplicateTables) {
      if (row.columns_a === row.columns_b) {
        duplicates.push({
          type: 'table',
          duplicate: row.table_a,
          original: row.table_b,
          reason: 'Identical column structure detected.',
          severity: 'warning',
        });
        duplicates.push({
          type: 'table',
          duplicate: row.table_b,
          original: row.table_a,
          reason: 'Identical column structure detected.',
          severity: 'warning',
        });
      }
    }

    for (const row of duplicateIndexesByCols) {
      duplicates.push({
        type: 'index',
        duplicate: row.index_a,
        original: row.index_b,
        table: row.tablename,
        reason: 'Both indexes cover the same column(s).',
        severity: 'warning',
      });
    }

    for (const row of duplicatePolicies) {
      duplicates.push({
        type: 'policy',
        duplicate: row.policy_a,
        original: row.policy_b,
        table: row.tablename,
        reason: 'Policy logic is identical.',
        severity: 'warning',
      });
    }

    for (const row of duplicateFunctions) {
      duplicates.push({
        type: 'function',
        duplicate: row.name_a,
        original: row.name_b,
        reason: 'Source code is identical.',
        severity: 'warning',
      });
    }

    for (const row of duplicateTriggers) {
      duplicates.push({
        type: 'trigger',
        duplicate: row.trigger_a,
        original: row.trigger_b,
        table: row.event_object_table,
        reason: `Same event (${row.event_manipulation}) with identical action.`,
        severity: 'warning',
      });
    }

    for (const row of duplicateViews) {
      duplicates.push({
        type: 'view',
        duplicate: row.view_a,
        original: row.view_b,
        reason: 'View definition is identical.',
        severity: 'warning',
      });
    }

    for (const row of duplicateConstraints) {
      duplicates.push({
        type: 'constraint',
        duplicate: row.constraint_a,
        original: row.constraint_b,
        table: row.table_name,
        reason: `Constraint definition is identical (type: ${row.contype}).`,
        severity: 'warning',
      });
    }

    for (const row of duplicateEnums) {
      duplicates.push({
        type: 'enum',
        duplicate: row.enum_a,
        original: row.enum_b,
        reason: 'Enum values are identical.',
        severity: 'warning',
      });
    }

    const nameBasedDuplicates = deduplicateByName(scanResult);

    const allDuplicates = [...duplicates, ...nameBasedDuplicates];

    return {
      ok: true,
      duplicates: allDuplicates,
      summary: {
        total: allDuplicates.length,
        byType: countBy(allDuplicates, 'type'),
      },
      unusedIndexes: (unusedIndexes || []).map((r) => ({
        name: r.index_name,
        table: r.table_name,
        scans: Number(r.scans),
        severity: 'improvement',
      })),
      circularForeignKeys: (circularForeignKeys || []).map((r) => ({
        table: r.src,
        references: r.dst,
        severity: 'critical',
      })),
      orphanRecords: (orphanRecords || []).map((r) => ({
        constraintName: r.constraint_name,
        table: r.table_name,
        referencedTable: r.referenced_table,
        severity: 'critical',
      })),
    };
  },
};

function deduplicateByName(scanResult) {
  const results = [];
  if (!scanResult?.details) return results;

  const { tableNames, indexes, functions, policies, triggers, storageBuckets } = scanResult.details;

  const seenNames = new Set();

  const checkName = (category, name, table, kind) => {
    if (!name) return;
    const lower = name.toLowerCase();
    const patterns = [/[_ ](copy|dup|l?backup|old|test|temp|legacy|archive)(_?\d*)?$/i, /^test[_ ]/, /^temp[_ ]/, /^old[_ ]/, /^backup[_ ]/, /^legacy[_ ]/];
    for (const pat of patterns) {
      if (pat.test(lower)) {
        const stem = lower.replace(pat, '');
        if (stem.length > 2) {
          const key = `${category}:${stem}`;
          if (!seenNames.has(key)) {
            seenNames.add(key);
            results.push({
              type: category,
              duplicate: name,
              original: stem,
              table,
              reason: `Name suggests "${stem}" is the original (suffix/prefix: ${kind || 'copy/backup/old'}).`,
              severity: 'info',
            });
          }
        }
        break;
      }
    }
  };

  for (const t of tableNames || []) checkName('table', t);
  for (const i of indexes || []) checkName('index', i.name, i.tablename);
  for (const f of functions || []) checkName('function', f.name);
  for (const p of policies || []) checkName('policy', p.name, p.tablename);
  for (const t of triggers || []) checkName('trigger', t.trigger_name, t.event_object_table);
  for (const b of storageBuckets || []) checkName('storageBucket', b.name);

  return results;
}

function countBy(arr, key) {
  const counts = {};
  for (const item of arr) {
    const val = item[key];
    counts[val] = (counts[val] || 0) + 1;
  }
  return counts;
}

export default duplicateDetectionService;
