import { natureOfDisputeRepository } from '@/data-layer/repositories/natureOfDisputeRepository.js';

export const natureOfDisputeService = {
  list: (query) => natureOfDisputeRepository.getAll(query),
  get: (id) => natureOfDisputeRepository.getById(id),
  create: (record) => natureOfDisputeRepository.create(record),
  update: (id, patch) => natureOfDisputeRepository.update(id, patch),
  remove: (id) => natureOfDisputeRepository.delete(id),
  bulkCreate: (records) => natureOfDisputeRepository.bulkCreate(records),
  bulkDelete: (ids) => natureOfDisputeRepository.bulkDelete(ids),
};
