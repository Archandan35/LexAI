import { precedentsRepository } from '@/data-layer/repositories/precedentsRepository.js';

export const precedentService = {
  list: (query) => precedentsRepository.getAll(query),
  get: (id) => precedentsRepository.getById(id),
  create: (record) => precedentsRepository.create(record),
  update: (id, patch) => precedentsRepository.update(id, patch),
  remove: (id) => precedentsRepository.delete(id),
};

export default precedentService;
