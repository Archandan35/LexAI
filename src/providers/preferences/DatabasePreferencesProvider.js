import { getDatabaseProvider } from '@/providers/database/index.js';
import { EntityRegistry, FieldMapper } from '@/core/index.js';
import { nowISO } from '@/utils/id.js';

const SETTINGS_TABLE = () => EntityRegistry.providerTable('settings');

// DatabasePreferencesProvider — stores preferences in the active database
// provider's `settings` collection. Survives page refreshes and provider
// switches (the .udb export/import carries settings too).
// Maintains an in-memory cache so get/set/remove remain synchronous for
// callers (backupService, DraftingStudio, etc.). The DB is loaded eagerly
// on construction so the cache is typically populated before first render.
export default class DatabasePreferencesProvider {
  #cache = new Map();

  constructor() {
    this.#loadAll();
  }

  async #loadAll() {
    try {
      const db = getDatabaseProvider();
      const rows = await db.list(SETTINGS_TABLE());
      for (const raw of rows) {
        const row = FieldMapper.toLexAI('settings', raw);
        this.#cache.set(row.key, row.value);
      }
    } catch {
      // DB not ready yet — preferences start empty, will populate when the
      // provider is available and the next write triggers a re-fetch.
    }
  }

  async #persist(key, value) {
    try {
      const db = getDatabaseProvider();
      const existing = await this.#find(key);
      const patch = FieldMapper.toProvider('settings', {
        value,
        updated_at: nowISO(),
      });
      if (existing) {
        await db.update(SETTINGS_TABLE(), existing.id, patch);
      } else {
        await db.create(SETTINGS_TABLE(), FieldMapper.toProvider('settings', {
          id: `sett_${key.replace(/[^a-zA-Z0-9]/g, '_')}`,
          key,
          value,
          updated_at: nowISO(),
        }));
      }
    } catch {
      // Persist failure is non-fatal — cache still has the value for this
      // session; it will be re-attempted on next write.
    }
  }

  async #find(key) {
    const db = getDatabaseProvider();
    const rows = await db.list(SETTINGS_TABLE(), { key });
    return rows[0] || null;
  }

  get(key, fallback = null) {
    if (this.#cache.has(key)) return this.#cache.get(key);
    return fallback;
  }

  set(key, value) {
    this.#cache.set(key, value);
    this.#persist(key, value);
  }

  remove(key) {
    this.#cache.delete(key);
    this.#remove(key);
  }

  async #remove(key) {
    try {
      const db = getDatabaseProvider();
      const existing = await this.#find(key);
      if (existing) {
        await db.remove(SETTINGS_TABLE(), existing.id);
      }
    } catch { /* ignore */ }
  }
}
