import { reportService } from '@/services/reportService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';
import { casesRepository } from '@/data-layer/repositories/casesRepository.js';
import { courtsRepository } from '@/data-layer/repositories/courtsRepository.js';
import { auditLogsRepository } from '@/data-layer/repositories/auditLogsRepository.js';

export const reportLogic = {
  async list() {
    try { return await reportService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.name || '').trim()) return fail('Report name is required.');
      if (!(data.report_type || '').trim()) return fail('Report type is required.');
      return ok(await reportService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await reportService.remove(id)); } catch (err) { return fail(err); }
  },
  async generate(config) {
    try {
      const { reportType, name, description } = config;
      let data = {};
      if (reportType === 'cases') {
        const all = await casesRepository.getAll();
        data = {
          total: all.length,
          active: all.filter((c) => !c.archived && c.status === 'Active').length,
          disposed: all.filter((c) => c.status === 'Disposed').length,
          pending: all.filter((c) => c.status === 'Pending').length,
        };
      } else if (reportType === 'courts') {
        const courts = await courtsRepository.getAll();
        data = { totalCourts: courts.length };
      } else if (reportType === 'user-activity') {
        const logs = await auditLogsRepository.getAll();
        data = { totalActions: logs.length };
      } else if (reportType === 'ai-usage') {
        const logs = await auditLogsRepository.getAll();
        const aiLogs = logs.filter((l) => l.module === 'ai');
        data = { totalQueries: aiLogs.length };
      }
      const entry = { name, report_type: reportType, config: JSON.stringify(data), description, last_generated: nowISO(), createdAt: nowISO() };
      const saved = await reportService.create(entry);
      return ok({ report: saved, data });
    } catch (err) { return fail(err); }
  },
};

export default reportLogic;
