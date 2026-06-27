import { partiesRepository } from '@/data-layer/repositories/partiesRepository.js';

export const partyService = {
  list: (query) => partiesRepository.getAll(query),
  get: (id) => partiesRepository.getById(id),
  create: (record) => partiesRepository.create(record),
  update: (id, patch) => partiesRepository.update(id, patch),
  remove: (id) => partiesRepository.delete(id),
  bulkCreate: (records) => partiesRepository.bulkCreate(records),
  bulkDelete: (ids) => partiesRepository.bulkDelete(ids),
};
