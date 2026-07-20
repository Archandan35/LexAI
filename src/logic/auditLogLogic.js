import { auditLogsRepository } from '@/data-layer/repositories/auditLogsRepository.js';
import { ok, fail } from '@/utils/result.js';

export const auditLogLogic = {
  async getAll(query) {
    try { return await auditLogsRepository.getAll(query); } catch (err) { return fail(err); }
  },

  async getAiUsage() {
    try {
      const all = await auditLogsRepository.getAll();
      return (Array.isArray(all) ? all : []).filter((l) => l.module === 'ai');
    } catch (err) { return fail(err); }
  },
};

export default auditLogLogic;
