import { templatesRepository } from '@/data-layer/repositories/templatesRepository.js';

export const templateService = {
  list: (query) => templatesRepository.getAll(query),
  get: (id) => templatesRepository.getById(id),
  create: (record) => templatesRepository.create(record),
  update: (id, patch) => templatesRepository.update(id, patch),
  remove: (id) => templatesRepository.delete(id),
};

export default templateService;
