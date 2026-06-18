import { getDatabaseProvider } from '@/providers/database/index.js';
import { config } from '@/config/config.js';
import { SchemaCompiler } from '@/data-provider/schema/SchemaCompiler.js';
import { listSchemas, collectionNames } from '@/data-provider/schema/index.js';
import { schemaVersionManager } from './SchemaVersionManager.js';

export const databaseInstaller = {
  provider() { return config.providers.database || 'local'; },

  async detect() {
    const provider = getDatabaseProvider();
    const providerName = this.provider();

    const version = await schemaVersionManager.getVersion();
    console.log('[LexAI detect] schema version:', version, 'provider:', providerName);

    const present = [];
    const missing = [];
    let coreMissing = false;
    let authError = null;

    for (const s of listSchemas()) {
      let exists = false;
      try {
        exists = await provider.collectionExists(s.collection);
      } catch (e) {
        if (e.message && e.message.includes('auth denied')) {
          authError = authError || e.message;
        }
        exists = false;
      }
      (exists ? present : missing).push(s.collection);
      if (!exists && s.core) coreMissing = true;
    }

    console.log('[LexAI detect] present:', present, 'missing:', missing, 'coreMissing:', coreMissing, 'authError:', authError);

    if (authError) {
      console.warn('[LexAI detect] Supabase auth denied — check VITE_SUPABASE_ANON_KEY');
      return {
        provider: providerName,
        installed: false,
        version,
        targetVersion: schemaVersionManager.targetVersion(),
        present,
        missing,
        needsSetup: true,
        authError,
      };
    }

    return {
      provider: providerName,
      installed: version > 0 && !coreMissing,
      version,
      targetVersion: schemaVersionManager.targetVersion(),
      present,
      missing,
      needsSetup: version === 0 || coreMissing,
    };
  },

  artifact() { return SchemaCompiler.installArtifact(this.provider()); },

  async installSchema(onProgress) {
    const name = this.provider();
    const provider = getDatabaseProvider();
    const coreSchemas = listSchemas().filter((s) => s.core);
    const totalSteps = coreSchemas.length + 2;
    let step = 0;

    const report = (label, status = 'working') => {
      if (onProgress) onProgress({ step: ++step, total: totalSteps, label, status });
    };

    try {
      report('Detect Provider');

      if (name === 'supabase') {
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
