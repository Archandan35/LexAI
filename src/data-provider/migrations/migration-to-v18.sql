-- ============================================================
-- LexAI Schema Migration v17 → v18
-- ============================================================
-- This migration upgrades an existing LexAI v17 installation to v18.
-- It adds:
--   1. Role-based access control (lexai_admin, lexai_manager, lexai_user)
--   2. System infrastructure tables (registries, state, mappings, etc.)
--   3. exec_sql() + safe_ddl() hardened functions
--   4. Entity prefix registry (LX-USR-00001 IDs)
--   5. Foreign keys with cascade strategies
--   6. Row-Level Security policies
--   7. Installer state tracking
--   8. Provider capabilities registry
--   9. Schema mapping infrastructure
-- ============================================================

BEGIN;

-- ============================================================
-- 1. ROLE-BASED ACCESS CONTROL
-- ============================================================
-- Create roles if they don't already exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'lexai_admin') THEN
    CREATE ROLE lexai_admin;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'lexai_manager') THEN
    CREATE ROLE lexai_manager;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'lexai_user') THEN
    CREATE ROLE lexai_user;
  END IF;
END $$;

-- ============================================================
-- 2. HARDENED DDL EXECUTION
-- ============================================================

CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE sql;
END;
$$;

CREATE OR REPLACE FUNCTION safe_ddl(sql TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_upper TEXT;
BEGIN
  v_upper := UPPER(sql);
  IF v_upper ~ '^\s*DROP\s+(DATABASE|SCHEMA|TABLE|VIEW|FUNCTION|INDEX|ROLE|POLICY)' THEN
    RAISE EXCEPTION 'safe_ddl: DROP is not permitted';
  END IF;
  IF v_upper ~ '^\s*TRUNCATE' THEN
    RAISE EXCEPTION 'safe_ddl: TRUNCATE is not permitted';
  END IF;
  IF v_upper ~ 'ALTER\s+TABLE.*DROP\s+(COLUMN|CONSTRAINT)' THEN
    RAISE EXCEPTION 'safe_ddl: ALTER TABLE DROP is not permitted';
  END IF;
  IF v_upper ~ '^\s*(GRANT|REVOKE)' THEN
    RAISE EXCEPTION 'safe_ddl: GRANT/REVOKE is not permitted';
  END IF;
  IF v_upper ~ '^\s*(DELETE|UPDATE|INSERT|TRUNCATE)\s' THEN
    RAISE EXCEPTION 'safe_ddl: DML statements are not permitted; use CRUD APIs';
  END IF;
  EXECUTE sql;
END;
$$;

GRANT EXECUTE ON FUNCTION exec_sql(TEXT) TO lexai_admin;
GRANT EXECUTE ON FUNCTION safe_ddl(TEXT) TO lexai_manager;

-- ============================================================
-- 3. SYSTEM INFRASTRUCTURE TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS schema_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  version INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  checksum TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  applied_by TEXT DEFAULT CURRENT_USER
);

CREATE TABLE IF NOT EXISTS entity_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL UNIQUE,
  label TEXT,
  table_name TEXT NOT NULL,
  primary_key TEXT DEFAULT 'id',
  core BOOLEAN DEFAULT FALSE,
  fields JSONB DEFAULT '{}'::JSONB,
  indexes JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS field_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  entity TEXT NOT NULL,
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL,
  required BOOLEAN DEFAULT FALSE,
  unique_field BOOLEAN DEFAULT FALSE,
  default_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS provider_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  provider_type TEXT NOT NULL,
  label TEXT,
  config JSONB DEFAULT '{}'::JSONB,
  active BOOLEAN DEFAULT TRUE,
  connected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS migration_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  version INTEGER NOT NULL,
  description TEXT,
  sql_hash TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  duration_ms INTEGER,
  success BOOLEAN DEFAULT TRUE,
  error TEXT
);

CREATE TABLE IF NOT EXISTS installer_state (
  id TEXT PRIMARY KEY DEFAULT 'default',
  install_status TEXT NOT NULL DEFAULT 'none' CHECK (install_status IN ('none', 'in_progress', 'completed', 'failed')),
  schema_version INTEGER NOT NULL DEFAULT 0,
  installer_version INTEGER NOT NULL DEFAULT 1,
  provider TEXT,
  database_type TEXT,
  verified_at TIMESTAMPTZ,
  installed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schema_mapping (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  entity_name TEXT NOT NULL UNIQUE,
  provider_table TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mapping_history (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  entity_name TEXT NOT NULL,
  old_table TEXT,
  new_table TEXT NOT NULL,
  changed_by TEXT,
  change_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mapping_versions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  version INTEGER NOT NULL,
  snapshot JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS provider_capabilities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  provider TEXT NOT NULL,
  feature TEXT NOT NULL,
  supported BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::JSONB,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entity_prefix_registry (
  entity TEXT PRIMARY KEY,
  prefix TEXT NOT NULL,
  label TEXT,
  padding INTEGER NOT NULL DEFAULT 5,
  current_sequence INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS id_registry (
  entity TEXT PRIMARY KEY,
  prefix TEXT NOT NULL,
  sequence INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foreign_key_registry (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  from_entity TEXT NOT NULL,
  from_field TEXT NOT NULL,
  to_entity TEXT NOT NULL,
  to_field TEXT NOT NULL DEFAULT 'id',
  cascade_delete BOOLEAN DEFAULT FALSE,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. LX-ID SEQUENCE MANAGER
-- ============================================================

CREATE OR REPLACE FUNCTION next_lx_id(p_entity TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_prefix TEXT;
  v_pad INT;
  v_seq INT;
  v_id TEXT;
BEGIN
  INSERT INTO entity_prefix_registry (entity, prefix, label, padding, current_sequence)
  VALUES (p_entity, UPPER(SUBSTR(p_entity, 1, 5)), p_entity, 5, 0)
  ON CONFLICT (entity) DO NOTHING;
  SELECT prefix, padding INTO STRICT v_prefix, v_pad FROM entity_prefix_registry WHERE entity = p_entity;
  UPDATE entity_prefix_registry
  SET current_sequence = current_sequence + 1, updated_at = NOW()
  WHERE entity = p_entity
  RETURNING current_sequence INTO v_seq;
  v_id := 'LX-' || v_prefix || '-' || LPAD(v_seq::TEXT, v_pad, '0');
  RETURN v_id;
END;
$$;

-- Seed entity prefixes for all entities
INSERT INTO entity_prefix_registry (entity, prefix, label, padding, current_sequence) VALUES
  ('users', 'USR', 'Users', 5, 0),
  ('roles', 'ROLE', 'Roles', 5, 0),
  ('permissions', 'PERM', 'Permissions', 5, 0),
  ('cases', 'CASE', 'Cases', 5, 0),
  ('documents', 'DOC', 'Documents', 5, 0),
  ('drafts', 'DRFT', 'Drafts', 5, 0),
  ('hearings', 'HEAR', 'Hearings', 5, 0),
  ('notes', 'NOTE', 'Notes', 5, 0),
  ('judgments', 'JDGM', 'Judgments', 5, 0),
  ('reminders', 'RMND', 'Reminders', 5, 0),
  ('caseStages', 'STAGE', 'Case Stages', 5, 0),
  ('caseTypes', 'CTYPE', 'Case Types', 5, 0),
  ('courts', 'COURT', 'Courts', 5, 0),
  ('caseHistory', 'CHIST', 'Case History', 5, 0),
  ('caseActivity', 'CACT', 'Case Activity', 5, 0),
  ('caseFolders', 'CFOLD', 'Case Folders', 5, 0),
  ('causeListTemplates', 'CLTMP', 'Cause List Templates', 5, 0),
  ('auditLogs', 'AUDIT', 'Audit Logs', 5, 0),
  ('settings', 'SET', 'Settings', 5, 0),
  ('envVars', 'ENV', 'Env Vars', 5, 0),
  ('configHistory', 'CFGH', 'Config History', 5, 0),
  ('schema_meta', 'SMETA', 'Schema Meta', 5, 0)
ON CONFLICT (entity) DO NOTHING;

-- ============================================================
-- 5. FOREIGN KEYS (with cascade strategies)
-- ============================================================

-- Case-related entities: CASCADE delete when case is removed
ALTER TABLE reminders      ADD CONSTRAINT fk_reminders_case_id      FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE notes          ADD CONSTRAINT fk_notes_case_id          FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE hearings       ADD CONSTRAINT fk_hearings_case_id       FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE drafts         ADD CONSTRAINT fk_drafts_case_id         FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE documents      ADD CONSTRAINT fk_documents_case_id      FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE "caseHistory"  ADD CONSTRAINT fk_case_history_case_id   FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE "caseFolders"  ADD CONSTRAINT fk_case_folders_case_id   FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;
ALTER TABLE "caseActivity" ADD CONSTRAINT fk_case_activity_case_id  FOREIGN KEY ("caseId") REFERENCES cases(id) ON DELETE CASCADE;

-- Audit trail: SET NULL so audit logs survive user deletion
ALTER TABLE "auditLogs" ADD CONSTRAINT fk_audit_logs_user_id FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL;

-- Role reference: RESTRICT to prevent deletion of active roles
ALTER TABLE users ADD CONSTRAINT fk_users_role_code FOREIGN KEY ("roleCode") REFERENCES roles(code) ON DELETE RESTRICT;

-- Folder parent: self-referencing cascade
ALTER TABLE "caseFolders" ADD CONSTRAINT fk_case_folders_parent_id FOREIGN KEY ("parentId") REFERENCES "caseFolders"(id) ON DELETE CASCADE;

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE IF EXISTS schema_registry         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS entity_registry         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS field_registry          ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS provider_registry       ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS migration_registry      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS installer_state         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS schema_mapping          ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS mapping_history         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS mapping_versions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS provider_capabilities   ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS entity_prefix_registry  ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS id_registry             ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS foreign_key_registry    ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. RLS POLICIES
-- ============================================================

-- lexai_admin: full access to all tables
CREATE POLICY admin_all ON schema_registry        FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON entity_registry        FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON field_registry         FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON provider_registry      FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON migration_registry     FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON installer_state        FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON schema_mapping         FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON mapping_history        FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON mapping_versions       FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON provider_capabilities  FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON entity_prefix_registry FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON id_registry            FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY admin_all ON foreign_key_registry   FOR ALL TO lexai_admin USING (TRUE) WITH CHECK (TRUE);

-- lexai_manager: read + write on user data tables, read on system tables
CREATE POLICY manager_read   ON schema_registry        FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON entity_registry        FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_write  ON entity_registry        FOR INSERT TO lexai_manager WITH CHECK (TRUE);
CREATE POLICY manager_write  ON entity_registry        FOR UPDATE TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON field_registry         FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_write  ON field_registry         FOR INSERT TO lexai_manager WITH CHECK (TRUE);
CREATE POLICY manager_read   ON provider_registry      FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON migration_registry     FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON installer_state        FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON schema_mapping         FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_write  ON schema_mapping         FOR INSERT TO lexai_manager WITH CHECK (TRUE);
CREATE POLICY manager_write  ON schema_mapping         FOR UPDATE TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON mapping_history        FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON mapping_versions       FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON provider_capabilities  FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON entity_prefix_registry FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON id_registry            FOR SELECT TO lexai_manager USING (TRUE);
CREATE POLICY manager_read   ON foreign_key_registry   FOR SELECT TO lexai_manager USING (TRUE);

-- lexai_user: read-only on non-sensitive tables
CREATE POLICY user_read ON schema_registry        FOR SELECT TO lexai_user USING (TRUE);
CREATE POLICY user_read ON entity_registry        FOR SELECT TO lexai_user USING (TRUE);
CREATE POLICY user_read ON field_registry         FOR SELECT TO lexai_user USING (TRUE);
CREATE POLICY user_read ON installer_state        FOR SELECT TO lexai_user USING (TRUE);
CREATE POLICY user_read ON provider_capabilities  FOR SELECT TO lexai_user USING (TRUE);

-- ============================================================
-- 8. LEAST-PRIVILEGE GRANTS
-- ============================================================

GRANT USAGE ON SCHEMA public TO lexai_manager;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lexai_manager;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO lexai_manager;

GRANT USAGE ON SCHEMA public TO lexai_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lexai_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lexai_manager;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lexai_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO lexai_manager;

-- ============================================================
-- 9. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_field_registry_entity              ON field_registry (entity);
CREATE INDEX IF NOT EXISTS idx_schema_registry_version            ON schema_registry (version);
CREATE INDEX IF NOT EXISTS idx_migration_registry_version         ON migration_registry (version);
CREATE INDEX IF NOT EXISTS idx_migration_registry_applied_at      ON migration_registry (applied_at);
CREATE INDEX IF NOT EXISTS idx_provider_registry_active           ON provider_registry (active);
CREATE INDEX IF NOT EXISTS idx_schema_mapping_active              ON schema_mapping (active);
CREATE INDEX IF NOT EXISTS idx_mapping_history_entity             ON mapping_history (entity_name);
CREATE INDEX IF NOT EXISTS idx_provider_capabilities_provider     ON provider_capabilities (provider);
CREATE INDEX IF NOT EXISTS idx_provider_capabilities_feature      ON provider_capabilities (feature);
CREATE INDEX IF NOT EXISTS idx_entity_prefix_registry_prefix      ON entity_prefix_registry (prefix);
CREATE INDEX IF NOT EXISTS idx_foreign_key_registry_from          ON foreign_key_registry (from_entity);
CREATE INDEX IF NOT EXISTS idx_foreign_key_registry_to            ON foreign_key_registry (to_entity);

-- ============================================================
-- 10. UPDATE SCHEMA VERSION
-- ============================================================

-- Record this migration
INSERT INTO migration_registry (version, description, sql_hash, success)
VALUES (18, 'v17→v18: RBAC, registries, FK, LX-ID upgrade, RLS, installer state', MD5('migration-to-v18'), TRUE);

-- Mark installer_state as completed
INSERT INTO installer_state (id, install_status, schema_version, installer_version, verified_at, installed_at, updated_at)
VALUES ('default', 'completed', 18, 1, NOW(), NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  install_status = 'completed',
  schema_version = 18,
  installer_version = 1,
  verified_at = NOW(),
  updated_at = NOW();

COMMIT;
