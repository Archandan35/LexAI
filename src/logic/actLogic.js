import { actService } from '@/services/actService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const actLogic = {
  async list() {
    try { return await actService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.title || '').trim()) return fail('Act title is required.');
      return ok(await actService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await actService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await actService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await actService.list();
      return {
        totalActs: all.length,
        totalSections: all.reduce((s, a) => s + (a.sections_count || 0), 0),
        totalAmendments: all.reduce((s, a) => s + (a.amendments_count || 0), 0),
        lastUpdated: all.sort((a, b) => new Date(b.last_updated || b.updated_at) - new Date(a.last_updated || a.updated_at))[0]?.last_updated || 'N/A',
      };
    } catch { return { totalActs: 0, totalSections: 0, totalAmendments: 0, lastUpdated: 'N/A' }; }
  },
};

export default actLogic;
