import { typeOfProceedingRepository } from '@/data-layer/repositories/typeOfProceedingRepository.js';

export const typeOfProceedingService = {
  list: (query) => typeOfProceedingRepository.getAll(query),
  get: (id) => typeOfProceedingRepository.getById(id),
  create: (record) => typeOfProceedingRepository.create(record),
  update: (id, patch) => typeOfProceedingRepository.update(id, patch),
  remove: (id) => typeOfProceedingRepository.delete(id),
  bulkCreate: (records) => typeOfProceedingRepository.bulkCreate(records),
  bulkDelete: (ids) => typeOfProceedingRepository.bulkDelete(ids),
};
