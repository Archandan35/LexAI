import { caseStatusesRepository } from '@/data-layer/repositories/caseStatusesRepository.js';

export const caseStatusService = {
  list: (query) => caseStatusesRepository.getAll(query),
  get: (id) => caseStatusesRepository.getById(id),
  create: (record) => caseStatusesRepository.create(record),
  update: (id, patch) => caseStatusesRepository.update(id, patch),
  remove: (id) => caseStatusesRepository.delete(id),
};

export default caseStatusService;
