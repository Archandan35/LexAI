import { getDatabaseProvider } from '@/providers/database/index.js';
import { config } from '@/config/config.js';
import { SchemaCompiler } from '@/data-provider/schema/SchemaCompiler.js';
import { listSchemas, collectionNames } from '@/data-provider/schema/index.js';
import { schemaVersionManager } from './SchemaVersionManager.js';

export const databaseInstaller = {
  provider() { return config.providers.database || 'local'; },

  async detect() {
    const provider = getDatabaseProvider();
    const version = await schemaVersionManager.getVersion();
    const present = [];
    const missing = [];
    let coreMissing = false;
    for (const s of listSchemas()) {
      const exists = await provider.collectionExists(s.collection).catch(() => false);
      (exists ? present : missing).push(s.collection);
      if (!exists && s.core) coreMissing = true;
    }
    return {
      provider: this.provider(),
      installed: version > 0 && !coreMissing,
      version,
      targetVersion: schemaVersionManager.targetVersion(),
      present,
      missing,
      needsSetup: version === 0 || coreMissing,
    };
  },

  artifact() { return SchemaCompiler.installArtifact(this.provider()); },

  // Install with per-step progress reporting.
  // onProgress({ step, total, label, status })  status = 'working' | 'done' | 'error'
  async installSchema(onProgress) {
    const name = this.provider();
    const provider = getDatabaseProvider();
    const coreSchemas = listSchemas().filter((s) => s.core);
    const totalSteps = coreSchemas.length + 2; // detect + seed = +2, no seed stamp
    let step = 0;

    const report = (label, status = 'working') => {
      if (onProgress) onProgress({ step: ++step, total: totalSteps, label, status });
    };

    try {
      report('Detect Provider');

      if (name === 'supabase') {
        // Supabase browser clients CANNOT run DDL (no exec_sql RPC by default).
        // Surface the SQL immediately instead of attempting a doomed RPC call.
        const artifact = SchemaCompiler.installArtifact('supabase');
        return {
          ok: false,
          provider: 'supabase',
          needsManual: true,
          sql: artifact.text,
          reason: 'Supabase requires schema installation. Use the SQL below.',
          completedSteps: step,
          totalSteps,
        };
      }

      // local / firebase / mongodb — install each core collection
      for (const s of coreSchemas) {
        report(`Create ${s.collection}`);
        const r = await provider.ensureCollection(s.collection, s);
        if (!r || r.ok === false) {
          return {
            success: false,
            currentStep: `Create ${s.collection}`,
            completedSteps: step,
            failedStep: s.collection,
            error: `Failed to create ${s.collection}`,
            needsManual: false,
          };
        }
        report(`Create ${s.collection}`, 'done');
      }

      // Stamp version after successful structural install
      await schemaVersionManager.stamp(schemaVersionManager.targetVersion(), 'install');

      return {
        success: true,
        currentStep: 'Done',
        completedSteps: totalSteps,
        failedStep: null,
        error: null,
        needsManual: false,
      };
    } catch (e) {
      return {
        success: false,
        currentStep: `Create ${name}`,
        completedSteps: step,
        failedStep: name,
        error: e.message || 'Installation failed',
        needsManual: name === 'supabase',
      };
    }
  },

  stampInstalled() { return schemaVersionManager.stamp(schemaVersionManager.targetVersion(), 'install'); },
};

export default databaseInstaller;
