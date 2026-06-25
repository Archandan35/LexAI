import { caseLogic } from './caseLogic.js';
import { ok, fail } from '@/utils/result.js';

export const caseCrudLogic = {
  async list() {
    const rows = await caseLogic.list();
    return Array.isArray(rows) ? rows : [];
  },

  async create(data) {
    try {
      const row = await caseLogic.create(data);
      return row?.id ? ok(row) : fail('Failed to create case');
    } catch (err) {
      return fail(err?.message || 'Failed to create case');
    }
  },

  async update(id, data) {
    try {
      const row = await caseLogic.update(id, data);
      return row?.id ? ok(row) : fail('Failed to update case');
    } catch (err) {
      return fail(err?.message || 'Failed to update case');
    }
  },

  async remove(id) {
    try {
      await caseLogic.remove(id);
      return ok(true);
    } catch (err) {
      return fail(err?.message || 'Failed to delete case');
    }
  },
};

export default caseCrudLogic;
