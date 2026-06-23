import { templateService } from '@/services/templateService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const templateLogic = {
  async list() {
    try { return await templateService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.name || '').trim()) return fail('Template name is required.');
      if (!(data.category || '').trim()) return fail('Category is required.');
      return ok(await templateService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await templateService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await templateService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await templateService.list();
      const cats = new Set(all.map((t) => t.category));
      const active = all.filter((t) => t.is_active !== false);
      const sorted = [...all].sort((a, b) => new Date(b.last_updated || b.updated_at || b.created_at) - new Date(a.last_updated || a.updated_at || a.created_at));
      return {
        total: all.length,
        active: active.length,
        categories: cats.size,
        lastUpdated: sorted[0]?.last_updated || 'N/A',
      };
    } catch { return { total: 0, active: 0, categories: 0, lastUpdated: 'N/A' }; }
  },
};

export default templateLogic;
