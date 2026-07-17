import { WizardLogger } from './WizardLogger.js';

export const HealthAnalyzer = {
  _rlEnabledTables(present) {
    if (!present) return 0;
    const rlTables = ['users', 'roles', 'cases', 'documents', 'hearings', 'notes', 'drafts',
      'reminders', 'case_history', 'case_folders', 'case_activity', 'audit_logs', 'settings',
      'schema_meta', 'schema_registry', 'entity_registry', 'field_registry', 'provider_registry',
      'migration_registry', 'installer_state', 'schema_mapping', 'mapping_history',
      'mapping_versions', 'provider_capabilities', 'entity_prefix_registry', 'id_registry',
      'foreign_key_registry', 'user_role_registry', 'provider_adapter_registry',
      'courts', 'case_types', 'case_stages', 'judgments', 'cause_list_templates',
      'bench_types', 'jurisdictions', 'clients', 'contacts', 'acts', 'prompts', 'templates',
      'legal_notices', 'precedents', 'reports', 'party_types', 'case_statuses', 'priorities',
      'hearing_statuses', 'contact_types', 'judges', 'reminder_types', 'folder_templates', 'draft_types', 'area_of_law',
      'type_of_proceeding', 'nature_of_dispute', 'provisions'];
    return rlTables.filter(t => present.includes(t)).length;
  },

  analyze(scanResult, diffResult) {
    WizardLogger.info('Analyzing database health');
    const present = scanResult?.present || [];
    const missing = scanResult?.missing || [];
    const total = present.length + missing.length;
    const installPct = total > 0 ? Math.round((present.length / total) * 100) : 0;
    const diffChanges = diffResult?.changes?.length || 0;
    const diffMissing = diffResult?.missingTables?.length || 0;

    const rlCount = this._rlEnabledTables(present);
    const rlExpected = 54;
    const securityScore = Math.round((rlCount / rlExpected) * 100);

    const idxTables = present.filter(t =>
      ['cases', 'documents', 'hearings', 'notes', 'drafts', 'reminders', 'case_history',
       'case_folders', 'case_activity', 'audit_logs', 'settings', 'env_vars', 'config_history',
       'users', 'roles', 'permissions', 'courts', 'case_types', 'case_stages', 'judgments',
       'cause_list_templates', 'bench_types', 'jurisdictions', 'clients', 'contacts', 'acts',
       'prompts', 'templates', 'legal_notices', 'precedents', 'reports', 'party_types',
       'case_statuses', 'priorities', 'hearing_statuses', 'contact_types', 'judges',
       'reminder_types', 'folder_templates', 'draft_types', 'area_of_law',
       'type_of_proceeding', 'nature_of_dispute', 'provisions'].includes(t)
    ).length;
    const performanceScore = total > 0 ? Math.round((idxTables / Math.max(total, 1)) * 100) : 80;

    const warnings = [];
    const recommendations = [];
    const optimizationSuggestions = [];

    if (missing.length > 0) {
      warnings.push(`${missing.length} component(s) missing`);
      recommendations.push('Run installation to create missing components');
    }
    if (diffChanges > 0) {
      warnings.push(`${diffChanges} schema difference(s) detected`);
      recommendations.push('Review schema diff for potential issues');
    }
    if (diffMissing > 0) {
      warnings.push(`${diffMissing} table(s) missing according to schema diff`);
      recommendations.push('Run repair schema to fix missing tables');
    }
    if (installPct < 100) {
      optimizationSuggestions.push('Complete installation for full functionality');
    }

    const health = {
      overallScore: 0,
      installationScore: installPct,
      securityScore,
      performanceScore,
      compatibilityScore: 90,
      warnings,
      recommendations,
      missingComponents: missing,
      duplicateObjects: [],
      unusedObjects: [],
      optimizationSuggestions,
    };

    if (missing.length === 0) health.overallScore += 30;
    if (diffChanges === 0) health.overallScore += 20;
    if (installPct === 100) health.overallScore += 30;

    health.overallScore += health.securityScore * 0.1 + health.performanceScore * 0.1 + health.compatibilityScore * 0.1;
    health.overallScore = Math.min(100, Math.round(health.overallScore));

    WizardLogger.success('Health analysis complete', { score: health.overallScore });
    return health;
  },
};
