import { partyTypesRepository } from '@/data-layer/repositories/partyTypesRepository.js';

export const partyTypeService = {
  list: (query) => partyTypesRepository.getAll(query),
  get: (id) => partyTypesRepository.getById(id),
  create: (record) => partyTypesRepository.create(record),
  update: (id, patch) => partyTypesRepository.update(id, patch),
  remove: (id) => partyTypesRepository.delete(id),
  bulkCreate: (records) => partyTypesRepository.bulkCreate(records),
  bulkDelete: (ids) => partyTypesRepository.bulkDelete(ids),
};
