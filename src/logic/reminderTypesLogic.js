import { reminderTypesService } from '@/services/reminderTypesService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const reminderTypesLogic = {
  async list() {
    try {
      const rows = await reminderTypesService.list();
      return [...rows].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) { return fail(err); }
  },

  async get(id) {
    try {
      return reminderTypesService.get(id);
    } catch (err) { return fail(err); }
  },

  async create(data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Reminder type name is required.');
      return ok(await reminderTypesService.create({
        name,
        description: (data.description || '').trim(),
        display_order: data.display_order ?? 0,
        status: 'Active',
        createdAt: nowISO(),
      }));
    } catch (err) { return fail(err); }
  },

  async update(id, data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Reminder type name is required.');
      return ok(await reminderTypesService.update(id, {
        name,
        description: (data.description || '').trim(),
        display_order: data.display_order,
        status: data.status,
      }));
    } catch (err) { return fail(err); }
  },

  async remove(id) {
    try {
      return ok(await reminderTypesService.remove(id));
    } catch (err) { return fail(err); }
  },
};

export default reminderTypesLogic;
