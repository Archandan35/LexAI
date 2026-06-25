import { draftTypesRepository } from '@/data-layer/repositories/draftTypesRepository.js';

export const draftTypeService = {
  list: (query) => draftTypesRepository.getAll(query),
  get: (id) => draftTypesRepository.getById(id),
  create: (record) => draftTypesRepository.create(record),
  update: (id, patch) => draftTypesRepository.update(id, patch),
  remove: (id) => draftTypesRepository.delete(id),
};

export default draftTypeService;
