import { documentsRepository } from '@/data-layer/repositories/documentsRepository.js';
import { ok, fail } from '@/utils/result.js';

export const documentLogic = {
  async getAll(query) {
    try { return await documentsRepository.getAll(query); } catch (err) { return fail(err); }
  },

  async getArchived() {
    try {
      const all = await documentsRepository.getAll();
      return (Array.isArray(all) ? all : []).filter((d) => d.archived || d.status === 'Archived');
    } catch (err) { return fail(err); }
  },
};

export default documentLogic;
