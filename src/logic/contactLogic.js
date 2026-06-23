import { contactService } from '@/services/contactService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const contactLogic = {
  async list() {
    try { return await contactService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.name || '').trim()) return fail('Contact name is required.');
      if (!(data.type || '').trim()) return fail('Contact type is required.');
      return ok(await contactService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await contactService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await contactService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await contactService.list();
      return {
        totalContacts: all.length,
        advocates: all.filter((c) => c.type?.toLowerCase() === 'advocate').length,
        judges: all.filter((c) => c.type?.toLowerCase() === 'judge').length,
        courtStaff: all.filter((c) => c.type?.toLowerCase() === 'staff').length,
      };
    } catch { return { totalContacts: 0, advocates: 0, judges: 0, courtStaff: 0 }; }
  },
};

export default contactLogic;
