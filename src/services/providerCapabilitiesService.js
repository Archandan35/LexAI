// ProviderCapabilitiesService — feature capability detection per database provider.
// Allows the installer and migration engine to adapt automatically based on what
// the connected provider supports (transactions, joins, exec_sql, etc.).

import { getDatabaseProvider } from '@/providers/database/index.js';
import { config } from '@/config/config.js';

const CAPABILITIES_TABLE = 'provider_capabilities';

const KNOWN_FEATURES = [
  'exec_sql',
  'safe_ddl',
  'transactions',
  'joins',
  'stored_procedures',
  'json_support',
  'full_text_search',
  'foreign_keys',
  'row_level_security',
  'schemas',
  'views',
  'triggers',
  'sequences',
  'indexes',
  'bulk_operations',
  'aggregations',
];

// Feature definitions by provider type
const PROVIDER_FEATURES = {
  supabase: {
    exec_sql: true, safe_ddl: true, transactions: true, joins: true,
    stored_procedures: true, json_support: true, full_text_search: true,
    foreign_keys: true, row_level_security: true, schemas: true,
    views: true, triggers: true, sequences: true, indexes: true,
    bulk_operations: true, aggregations: true,
  },
  postgresql: {
    exec_sql: false, safe_ddl: false, transactions: true, joins: true,
    stored_procedures: true, json_support: true, full_text_search: true,
    foreign_keys: true, row_level_security: true, schemas: true,
    views: true, triggers: true, sequences: true, indexes: true,
    bulk_operations: true, aggregations: true,
  },
  mysql: {
    exec_sql: false, safe_ddl: false, transitions: true, joins: true,
    stored_procedures: true, json_support: true, full_text_search: true,
    foreign_keys: true, row_level_security: false, schemas: false,
    views: true, triggers: true, sequences: false, indexes: true,
    bulk_operations: true, aggregations: true,
  },
  sqlite: {
    exec_sql: false, safe_ddl: false, transactions: true, joins: true,
    stored_procedures: false, json_support: true, full_text_search: false,
    foreign_keys: true, row_level_security: false, schemas: false,
    views: true, triggers: true, sequences: false, indexes: true,
    bulk_operations: false, aggregations: false,
  },
  mongodb: {
    exec_sql: false, safe_ddl: false, transactions: true, joins: false,
    stored_procedures: true, json_support: true, full_text_search: true,
    foreign_keys: false, row_level_security: false, schemas: false,
    views: false, triggers: false, sequences: false, indexes: true,
    bulk_operations: true, aggregations: true,
  },
  firebase: {
    exec_sql: false, safe_ddl: false, transactions: false, joins: false,
    stored_procedures: false, json_support: true, full_text_search: false,
    foreign_keys: false, row_level_security: true, schemas: false,
    views: false, triggers: false, sequences: false, indexes: true,
    bulk_operations: false, aggregations: false,
  },
};

export const ProviderCapabilitiesService = {
  // Detect capabilities and persist to the registry
  async detectAndPersist() {
    const providerName = config.providers.database || 'local';
    const features = PROVIDER_FEATURES[providerName] || PROVIDER_FEATURES.local || {};
    const provider = getDatabaseProvider();
    const results = [];

    for (const [feature, supported] of Object.entries(features)) {
      try {
        await provider.create(CAPABILITIES_TABLE, {
          provider: providerName,
          feature,
          supported,
          metadata: JSON.stringify({ detected: true }),
        });
      } catch {
        // Table may not exist yet
      }
      results.push({ feature, supported });
    }
    return results;
  },

  // Get capabilities for current provider
  async getCapabilities() {
    const provider = getDatabaseProvider();
    try {
      const rows = await provider.list(CAPABILITIES_TABLE, {});
      const map = {};
      for (const r of rows) {
        if (!map[r.provider]) map[r.provider] = {};
        map[r.provider][r.feature] = r.supported;
      }
      return map;
    } catch {
      return {};
    }
  },

  // Check if current provider supports a specific feature
  async supports(feature) {
    const caps = await this.getCapabilities();
    const providerName = config.providers.database || 'local';
    return !!caps[providerName]?.[feature];
  },

  // Get known features list
  knownFeatures() {
    return [...KNOWN_FEATURES];
  },

  // Get feature definitions for a specific provider (static, without DB)
  staticFeatures(providerName) {
    return { ...PROVIDER_FEATURES[providerName] } || null;
  },

  // Detect provider type from connection string/URL
  detectProviderType(urlOrHost) {
    if (!urlOrHost) return 'local';
    const u = urlOrHost.toLowerCase();
    if (u.includes('supabase')) return 'supabase';
    if (u.includes('postgres') || u.includes('psql') || u.includes('pg.')) return 'postgresql';
    if (u.includes('mysql')) return 'mysql';
    if (u.includes('sqlite') || u.endsWith('.db') || u.endsWith('.sqlite')) return 'sqlite';
    if (u.includes('mongodb') || u.includes('mongo')) return 'mongodb';
    if (u.includes('firebase') || u.includes('firestore')) return 'firebase';
    return 'supabase';
  },

  // Human-readable capability labels
  featureLabels() {
    return {
      exec_sql: 'SQL Execution',
      safe_ddl: 'Safe DDL',
      transactions: 'Transactions',
      joins: 'JOIN Queries',
      stored_procedures: 'Stored Procedures',
      json_support: 'JSON Support',
      full_text_search: 'Full-Text Search',
      foreign_keys: 'Foreign Keys',
      row_level_security: 'Row-Level Security',
      schemas: 'Database Schemas',
      views: 'Views',
      triggers: 'Triggers',
      sequences: 'Sequences',
      indexes: 'Indexes',
      bulk_operations: 'Bulk Operations',
      aggregations: 'Aggregations',
    };
  },
};

export default ProviderCapabilitiesService;
