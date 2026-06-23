import { promptsRepository } from '@/data-layer/repositories/promptsRepository.js';

export const promptService = {
  list: (query) => promptsRepository.getAll(query),
  get: (id) => promptsRepository.getById(id),
  create: (record) => promptsRepository.create(record),
  update: (id, patch) => promptsRepository.update(id, patch),
  remove: (id) => promptsRepository.delete(id),
};

export default promptService;
