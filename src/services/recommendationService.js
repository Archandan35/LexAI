const ACTIONS = ['create', 'remove', 'repair', 'rename', 'merge', 'ignore'];

export const recommendationService = {
  generate(findings) {
    if (!findings) return [];

    const recommendations = [];

    for (const table of findings.missingTables || []) {
      recommendations.push({
        id: `create_table_${table.name}`,
        category: 'table',
        action: 'create',
        target: table.name,
        label: `Create table "${table.name}"`,
        description: table.core ? `Core table "${table.name}" is missing. Required for system operation.` : `Missing table "${table.name}".`,
        severity: table.severity || 'warning',
        sql: `CREATE TABLE IF NOT EXISTS public.${table.name} (id TEXT PRIMARY KEY);`,
        metadata: { type: table.type, core: table.core },
      });
    }

    for (const idx of findings.missingIndexes || []) {
      recommendations.push({
        id: `create_index_${idx}`,
        category: 'index',
        action: 'create',
        target: idx,
        label: `Create index "${idx}"`,
        description: `Missing index that improves query performance.`,
        severity: 'improvement',
      });
    }

    for (const pol of findings.missingPolicies || []) {
      recommendations.push({
        id: `create_policy_${pol.name}`,
        category: 'policy',
        action: 'create',
        target: pol.name,
        table: pol.table,
        label: `Create policy "${pol.name}" on "${pol.table}"`,
        description: `Missing RLS policy for access control.`,
        severity: 'warning',
      });
    }

    for (const fn of findings.missingFunctions || []) {
      recommendations.push({
        id: `create_function_${fn}`,
        category: 'function',
        action: 'create',
        target: fn,
        label: `Create function "${fn}"`,
        description: `Required database function is missing.`,
        severity: 'critical',
      });
    }

    for (const fk of findings.missingFks || []) {
      recommendations.push({
        id: `create_fk_${fk.name}`,
        category: 'foreignKey',
        action: 'create',
        target: fk.name,
        label: `Create foreign key "${fk.name}"`,
        description: `FK from ${fk.from}.${fk.from_col} to ${fk.to}.`,
        severity: 'warning',
      });
    }

    for (const fk of findings.brokenFks || []) {
      recommendations.push({
        id: `repair_fk_${fk.name}`,
        category: 'foreignKey',
        action: 'repair',
        target: fk.name,
        label: `Repair broken foreign key "${fk.name}"`,
        description: fk.reason,
        severity: 'critical',
      });
    }

    for (const ext of findings.missingExtensions || []) {
      recommendations.push({
        id: `create_extension_${ext}`,
        category: 'extension',
        action: 'create',
        target: ext,
        label: `Enable extension "${ext}"`,
        description: `Required PostgreSQL extension.`,
        severity: 'warning',
      });
    }

    for (const role of findings.missingRoles || []) {
      recommendations.push({
        id: `create_role_${role}`,
        category: 'role',
        action: 'create',
        target: role,
        label: `Create role "${role}"`,
        description: `Required application role for access control.`,
        severity: 'critical',
      });
    }

    for (const trigger of findings.missingTriggers || []) {
      recommendations.push({
        id: `create_trigger_${trigger}`,
        category: 'trigger',
        action: 'create',
        target: trigger,
        label: `Create trigger "${trigger}"`,
        description: `Required database trigger is missing.`,
        severity: 'warning',
      });
    }

    for (const col of findings.missingColumns || []) {
      recommendations.push({
        id: `add_column_${col.table}_${col.column}`,
        category: 'column',
        action: 'create',
        target: `${col.table}.${col.column}`,
        label: `Add column "${col.column}" to "${col.table}"`,
        description: `Required column "${col.column}" (${col.expectedType}) is missing.`,
        severity: 'warning',
        sql: `ALTER TABLE public.${col.table} ADD COLUMN ${col.column} ${col.expectedType};`,
      });
    }

    for (const table of findings.unnecessaryTables || []) {
      recommendations.push({
        id: `remove_table_${table.name}`,
        category: 'table',
        action: 'remove',
        target: table.name,
        label: `Remove unnecessary table "${table.name}"`,
        description: `${table.name} exists but is not part of the LexAI blueprint.`,
        severity: 'info',
        canRemove: true,
        sql: `DROP TABLE IF EXISTS public.${table.name} CASCADE;`,
      });
    }

    for (const idx of findings.unnecessaryIndexes || []) {
      recommendations.push({
        id: `remove_index_${idx}`,
        category: 'index',
        action: 'remove',
        target: idx,
        label: `Remove unnecessary index "${idx}"`,
        description: `Index exists but is not part of the LexAI blueprint.`,
        severity: 'info',
        canRemove: true,
        sql: `DROP INDEX IF EXISTS public.${idx};`,
      });
    }

    for (const pol of findings.unnecessaryPolicies || []) {
      recommendations.push({
        id: `remove_policy_${pol.name}`,
        category: 'policy',
        action: 'remove',
        target: pol.name,
        table: pol.table,
        label: `Remove unnecessary policy "${pol.name}" on "${pol.table}"`,
        description: `Policy exists but is not part of the LexAI blueprint.`,
        severity: 'info',
        canRemove: true,
        sql: `DROP POLICY IF EXISTS "${pol.name}" ON public.${pol.table};`,
      });
    }

    for (const idx of findings.unusedIndexes || []) {
      recommendations.push({
        id: `remove_unused_index_${idx.name}`,
        category: 'index',
        action: 'remove',
        target: idx.name,
        table: idx.table,
        label: `Remove unused index "${idx.name}"`,
        description: `Index has never been scanned (0 scans) on table "${idx.table}".`,
        severity: 'improvement',
        canRemove: true,
        sql: `DROP INDEX IF EXISTS public.${idx.name};`,
      });
    }

    for (const fk of findings.circularFks || []) {
      recommendations.push({
        id: `repair_circular_fk_${fk.table}_${fk.references}`,
        category: 'foreignKey',
        action: 'repair',
        target: `${fk.table} -> ${fk.references}`,
        label: `Fix circular FK reference: "${fk.table}" references itself`,
        description: `Foreign key creates a circular reference.`,
        severity: 'critical',
      });
    }

    return recommendations;
  },

  evaluateAction(recommendation, selectedAction) {
    if (!recommendation) return null;
    const valid = ACTIONS.includes(selectedAction);
    if (recommendation.action === 'create' && selectedAction === 'create') return 'execute';
    if (recommendation.action === 'remove' && selectedAction === 'remove') return 'execute';
    if (recommendation.action === 'repair' && selectedAction === 'repair') return 'execute';
    if (selectedAction === 'rename') return 'rename';
    if (selectedAction === 'merge') return 'merge';
    if (selectedAction === 'ignore') return 'skip';
    if (selectedAction === 'keep') return 'skip';
    return valid ? 'execute' : 'skip';
  },

  getValidActions(recommendation) {
    if (!recommendation) return ['ignore'];
    if (recommendation.action === 'create' || recommendation.action === 'repair') return ['execute', 'ignore'];
    if (recommendation.canRemove) return ['remove', 'keep', 'rename', 'ignore', 'decide_later'];
    return ['keep', 'ignore', 'decide_later'];
  },
};

export default recommendationService;
