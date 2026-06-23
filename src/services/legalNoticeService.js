import { legalNoticesRepository } from '@/data-layer/repositories/legalNoticesRepository.js';

export const legalNoticeService = {
  list: (query) => legalNoticesRepository.getAll(query),
  get: (id) => legalNoticesRepository.getById(id),
  create: (record) => legalNoticesRepository.create(record),
  update: (id, patch) => legalNoticesRepository.update(id, patch),
  remove: (id) => legalNoticesRepository.delete(id),
};

export default legalNoticeService;
