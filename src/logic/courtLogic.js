import { courtService } from '@/services/courtService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const courtLogic = {
  async list() {
    try {
      const rows = await courtService.list();
      return [...rows].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) { return fail(err); }
  },

  async names() {
    try {
      return (await this.list()).map((c) => c.name);
    } catch (err) { return fail(err); }
  },

  async create(data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Court name is required.');
      const existing = await courtService.list();
      if (existing.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
        return fail(`Court "${name}" already exists.`);
      }
      const order = existing.reduce((m, c) => Math.max(m, c.display_order ?? 0), 0) + 1;
      return ok(await courtService.create({
        name,
        display_order: order,
        status: 'Active',
        createdAt: nowISO(),
      }));
    } catch (err) { return fail(err); }
  },

  async update(id, data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Court name is required.');
      return ok(await courtService.update(id, { name, display_order: data.display_order, status: data.status }));
    } catch (err) { return fail(err); }
  },

  async remove(id) {
    try {
      return ok(await courtService.remove(id));
    } catch (err) { return fail(err); }
  },

  async reorder(orderedIds) {
    try {
      for (let i = 0; i < orderedIds.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await courtService.update(orderedIds[i], { display_order: i });
      }
      return ok(true);
    } catch (err) { return fail(err); }
  },
};

export default courtLogic;
