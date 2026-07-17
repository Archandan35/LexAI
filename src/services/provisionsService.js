import { provisionsRepository } from '@/data-layer/repositories/provisionsRepository.js';

export const provisionsService = {
  list: (query) => provisionsRepository.getAll(query),
  get: (id) => provisionsRepository.getById(id),
  create: (record) => provisionsRepository.create(record),
  update: (id, patch) => provisionsRepository.update(id, patch),
  remove: (id) => provisionsRepository.delete(id),
  bulkCreate: (records) => provisionsRepository.bulkCreate(records),
  bulkDelete: (ids) => provisionsRepository.bulkDelete(ids),
};
