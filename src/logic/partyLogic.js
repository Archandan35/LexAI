import { partyService } from '@/services/partyService.js';
import { ok, fail } from '@/utils/result.js';
import { nowISO, uid } from '@/utils/id.js';

export const partyLogic = {
  async list() {
    const rows = await partyService.list();
    return [...rows].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async create(data) {
    try {
      const row = await partyService.create({ ...data, id: uid('pty'), created_at: nowISO() });
      return ok(row);
    } catch (e) {
      return fail(e);
    }
  },

  async update(id, data) {
    try {
      const row = await partyService.update(id, { ...data, updated_at: nowISO() });
      return ok(row);
    } catch (e) {
      return fail(e);
    }
  },

  async remove(id) {
    try {
      await partyService.remove(id);
      return ok(true);
    } catch (e) {
      return fail(e);
    }
  },

  async reorder(ids) {
    try {
      for (let i = 0; i < ids.length; i++) {
        await partyService.update(ids[i], { display_order: i });
      }
      return ok(true);
    } catch (e) {
      return fail(e);
    }
  },

  async setStatus(id, status) {
    try {
      const row = await partyService.update(id, { status, updated_at: nowISO() });
      return ok(row);
    } catch (e) {
      return fail(e);
    }
  },

  async bulkCreate(records) {
    try {
      const rows = records.map((r) => ({ ...r, id: uid('pty'), created_at: nowISO() }));
      await partyService.bulkCreate(rows);
      return ok(rows);
    } catch (e) {
      return fail(e);
    }
  },

  async bulkRemove(ids) {
    try {
      await partyService.bulkDelete(ids);
      return ok(true);
    } catch (e) {
      return fail(e);
    }
  },
};

export default partyLogic;
