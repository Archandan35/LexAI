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

    return recommendations;
  },
};

export default recommendationService;
