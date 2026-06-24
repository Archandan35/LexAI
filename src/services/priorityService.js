import { prioritiesRepository } from '@/data-layer/repositories/prioritiesRepository.js';

export const priorityService = {
  list: (query) => prioritiesRepository.getAll(query),
  get: (id) => prioritiesRepository.getById(id),
  create: (record) => prioritiesRepository.create(record),
  update: (id, patch) => prioritiesRepository.update(id, patch),
  remove: (id) => prioritiesRepository.delete(id),
};

export default priorityService;
