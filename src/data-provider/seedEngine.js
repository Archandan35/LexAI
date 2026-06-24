// seedEngine — provider-agnostic clearing and row counts. Demo seeding has been
// removed per architecture audit. The permissions catalog is now managed through
// the Permission Manager UI only — no programmatic seeding on boot or install.
import { getDatabaseProvider } from '@/providers/database/index.js';
import { collectionNames } from '@/data-provider/schema/index.js';
import { nowISO, uid } from '@/utils/id.js';

const db = () => getDatabaseProvider();

export const seedEngine = {
  async seedMasterData() {
    const provider = db();
    const now = nowISO();
    const defaults = [];

    const existingStatuses = await provider.getAll('case_statuses').catch(() => []);
    if (!existingStatuses.length) {
      const rows = [
        { name: 'Active', display_order: 1 },
        { name: 'Disposed', display_order: 2 },
        { name: 'Stayed', display_order: 3 },
        { name: 'Appeal', display_order: 4 },
        { name: 'Closed', display_order: 5 },
      ];
      for (const r of rows) {
        await provider.create('case_statuses', { id: uid('cs'), ...r, status: 'Active', created_at: now });
      }
      defaults.push('case_statuses');
    }

    const existingPriorities = await provider.getAll('priorities').catch(() => []);
    if (!existingPriorities.length) {
      const rows = [
        { name: 'Critical', display_order: 1, color: '#ef4444' },
        { name: 'High', display_order: 2, color: '#f97316' },
        { name: 'Normal', display_order: 3, color: '#6b7280' },
        { name: 'Low', display_order: 4, color: '#22c55e' },
      ];
      for (const r of rows) {
        await provider.create('priorities', { id: uid('pr'), ...r, status: 'Active', created_at: now });
      }
      defaults.push('priorities');
    }

    return defaults;
  },

  // Wipe every known collection. Returns per-collection removed counts.
  async clearAll() {
    const provider = db();
    const removed = {};
    for (const name of collectionNames) {
      // eslint-disable-next-line no-await-in-loop
      removed[name] = await provider.clear(name).catch(() => 0);
    }
    return removed;
  },

  // Current row counts per collection (for the Database Manager dashboard).
  async counts() {
    const provider = db();
    const out = {};
    for (const name of collectionNames) {
      // eslint-disable-next-line no-await-in-loop
      out[name] = await provider.count(name).catch(() => 0);
    }
    return out;
  },
};

export default seedEngine;
