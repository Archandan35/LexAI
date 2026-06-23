import { promptService } from '@/services/promptService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const promptLogic = {
  async list() {
    try { return await promptService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.name || '').trim()) return fail('Prompt name is required.');
      if (!(data.category || '').trim()) return fail('Category is required.');
      return ok(await promptService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await promptService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await promptService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await promptService.list();
      const cats = {};
      all.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
      return {
        total: all.length,
        categories: cats,
        categoryCount: Object.keys(cats).length,
      };
    } catch { return { total: 0, categories: {}, categoryCount: 0 }; }
  },
};

export default promptLogic;
