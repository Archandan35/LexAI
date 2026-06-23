import { contactsRepository } from '@/data-layer/repositories/contactsRepository.js';

export const contactService = {
  list: (query) => contactsRepository.getAll(query),
  get: (id) => contactsRepository.getById(id),
  create: (record) => contactsRepository.create(record),
  update: (id, patch) => contactsRepository.update(id, patch),
  remove: (id) => contactsRepository.delete(id),
};

export default contactService;
