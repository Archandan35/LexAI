import { judgmentsRepository } from '@/data-layer/repositories/judgmentsRepository.js';
import { auditLogsRepository } from '@/data-layer/repositories/auditLogsRepository.js';
import { ok, fail } from '@/utils/result.js';

export const judgmentLogic = {
  async list(query) {
    try { return await judgmentsRepository.getAll(query); } catch (err) { return fail(err); }
  },

  async getById(id) {
    try { return await judgmentsRepository.getById(id); } catch (err) { return fail(err); }
  },

  async create(data) {
    try {
      const row = await judgmentsRepository.create(data);
      await auditLogsRepository.create({ action: 'judgment.create', details: `Created judgment "${data.citation || data.title}"` });
      return ok(row);
    } catch (err) { return fail(err); }
  },

  async update(id, data) {
    try {
      const row = await judgmentsRepository.update(id, data);
      await auditLogsRepository.create({ action: 'judgment.update', details: `Updated judgment ${id}` });
      return ok(row);
    } catch (err) { return fail(err); }
  },

  async remove(id) {
    try {
      await judgmentsRepository.delete(id);
      await auditLogsRepository.create({ action: 'judgment.delete', details: `Deleted judgment ${id}` });
      return ok(true);
    } catch (err) { return fail(err); }
  },

  async bulkCreate(records) {
    try {
      const created = await judgmentsRepository.bulkCreate(records);
      await auditLogsRepository.create({ action: 'judgment.bulkCreate', details: `Created ${created.length} judgments` });
      return ok(created);
    } catch (err) { return fail(err); }
  },
};

export default judgmentLogic;
