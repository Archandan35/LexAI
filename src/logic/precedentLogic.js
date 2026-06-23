import { precedentService } from '@/services/precedentService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const precedentLogic = {
  async list() {
    try { return await precedentService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.title || '').trim()) return fail('Title is required.');
      if (!(data.citation || '').trim()) return fail('Citation is required.');
      return ok(await precedentService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await precedentService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await precedentService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await precedentService.list();
      const sorted = [...all].sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
      return {
        totalSaved: all.length,
        totalTags: new Set(all.flatMap((p) => (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean))).size,
        recentlyAdded: sorted.slice(0, 5).length,
        favorites: all.filter((p) => p.is_favorite).length,
      };
    } catch { return { totalSaved: 0, totalTags: 0, recentlyAdded: 0, favorites: 0 }; }
  },
};

export default precedentLogic;
