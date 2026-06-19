// InstallerStateService — tracks installation state in the installer_state table.
// Allows the Setup Wizard to instantly determine installed/version/migration-needed
// without scanning every table.

import { getDatabaseProvider } from '@/providers/database/index.js';
import { SCHEMA_VERSION } from '@/data-provider/schema/index.js';

const STATE_TABLE = 'installer_state';
const STATE_ID = 'default';

const INSTALLER_VERSION = 1;

export const InstallerStateService = {
  // Get current installation state
  async getState() {
    const provider = getDatabaseProvider();
    try {
      const row = await provider.get(STATE_TABLE, STATE_ID);
      if (!row) {
        return { install_status: 'none', schema_version: 0, installer_version: 0 };
      }
      return {
        install_status: row.install_status || 'none',
        schema_version: row.schema_version || 0,
        installer_version: row.installer_version || 0,
        provider: row.provider,
        database_type: row.database_type,
        verified_at: row.verified_at,
        installed_at: row.installed_at,
        updated_at: row.updated_at,
      };
    } catch {
      return { install_status: 'none', schema_version: 0, installer_version: 0 };
    }
  },

  // Set installation in progress
  async setInProgress(provider, databaseType) {
    return this._upsert({
      install_status: 'in_progress',
      provider,
      database_type: databaseType,
      updated_at: new Date().toISOString(),
    });
  },

  // Set installation completed
  async setCompleted(schemaVersion) {
    return this._upsert({
      install_status: 'completed',
      schema_version: schemaVersion || SCHEMA_VERSION,
      installer_version: INSTALLER_VERSION,
      installed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  },

  // Set installation failed
  async setFailed() {
    return this._upsert({
      install_status: 'failed',
      updated_at: new Date().toISOString(),
    });
  },

  // Mark as verified
  async setVerified() {
    return this._upsert({
      verified_at: new Date().toISOString(),
    });
  },

  // Update schema version
  async updateVersion(version) {
    return this._upsert({
      schema_version: version,
      updated_at: new Date().toISOString(),
    });
  },

  // Quick checks (no I/O after first call if cached)
  async isInstalled() {
    const state = await this.getState();
    return state.install_status === 'completed';
  },

  async needsMigration() {
    const state = await this.getState();
    return state.schema_version < SCHEMA_VERSION;
  },

  async isVerified() {
    const state = await this.getState();
    return !!state.verified_at;
  },

  async currentVersion() {
    const state = await this.getState();
    return state.schema_version || 0;
  },

  // Reset state (for re-installation)
  async reset() {
    const provider = getDatabaseProvider();
    try {
      const existing = await provider.get(STATE_TABLE, STATE_ID);
      if (existing) {
        await provider.update(STATE_TABLE, STATE_ID, {
          install_status: 'none',
          schema_version: 0,
          verified_at: null,
          installed_at: null,
          updated_at: new Date().toISOString(),
        });
      }
    } catch {
      // Ignore
    }
  },

  // Upsert helper
  async _upsert(fields) {
    const provider = getDatabaseProvider();
    try {
      const existing = await provider.get(STATE_TABLE, STATE_ID);
      if (existing) {
        await provider.update(STATE_TABLE, STATE_ID, fields);
      } else {
        await provider.create(STATE_TABLE, { id: STATE_ID, ...fields });
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
};

export default InstallerStateService;
