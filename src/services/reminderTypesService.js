import { reminderTypesRepository } from '@/data-layer/repositories/reminderTypesRepository.js';

export const reminderTypesService = {
  list: (query) => reminderTypesRepository.getAll(query),
  get: (id) => reminderTypesRepository.getById(id),
  create: (record) => reminderTypesRepository.create(record),
  update: (id, patch) => reminderTypesRepository.update(id, patch),
  remove: (id) => reminderTypesRepository.delete(id),
};

export default reminderTypesService;
