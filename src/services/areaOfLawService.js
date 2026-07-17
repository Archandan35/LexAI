import { areaOfLawRepository } from '@/data-layer/repositories/areaOfLawRepository.js';

export const areaOfLawService = {
  list: (query) => areaOfLawRepository.getAll(query),
  get: (id) => areaOfLawRepository.getById(id),
  create: (record) => areaOfLawRepository.create(record),
  update: (id, patch) => areaOfLawRepository.update(id, patch),
  remove: (id) => areaOfLawRepository.delete(id),
  bulkCreate: (records) => areaOfLawRepository.bulkCreate(records),
  bulkDelete: (ids) => areaOfLawRepository.bulkDelete(ids),
};
