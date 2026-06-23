import { clientsRepository } from '@/data-layer/repositories/clientsRepository.js';

export const clientService = {
  list: (query) => clientsRepository.getAll(query),
  get: (id) => clientsRepository.getById(id),
  create: (record) => clientsRepository.create(record),
  update: (id, patch) => clientsRepository.update(id, patch),
  remove: (id) => clientsRepository.delete(id),
};

export default clientService;
