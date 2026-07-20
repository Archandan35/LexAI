import { casesRepository } from '@/data-layer/repositories/casesRepository.js';
import { documentsRepository } from '@/data-layer/repositories/documentsRepository.js';
import { auditLogsRepository } from '@/data-layer/repositories/auditLogsRepository.js';
import { ok, fail } from '@/utils/result.js';

export const analyticsLogic = {
  async getMetrics() {
    try {
      const [cases, docs, logs] = await Promise.all([
        casesRepository.getAll().catch(() => []),
        documentsRepository.getAll().catch(() => []),
        auditLogsRepository.getAll().catch(() => []),
      ]);
      const c = Array.isArray(cases) ? cases : [];
      const d = Array.isArray(docs) ? docs : [];
      const l = Array.isArray(logs) ? logs : [];
      return {
        cases: c.length,
        documents: d.length,
        logs: l.length,
        aiLogs: l.filter((lg) => lg.module === 'ai').length,
      };
    } catch (err) { return fail(err); }
  },
};

export default analyticsLogic;
