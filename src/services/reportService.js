import { reportsRepository } from '@/data-layer/repositories/reportsRepository.js';

export const reportService = {
  list: (query) => reportsRepository.getAll(query),
  get: (id) => reportsRepository.getById(id),
  create: (record) => reportsRepository.create(record),
  update: (id, patch) => reportsRepository.update(id, patch),
  remove: (id) => reportsRepository.delete(id),
};

export default reportService;
