import { folderTemplatesRepository } from '@/data-layer/repositories/folderTemplatesRepository.js';

export const folderTemplateService = {
  list: (query) => folderTemplatesRepository.getAll(query),
  get: (id) => folderTemplatesRepository.getById(id),
  create: (record) => folderTemplatesRepository.create(record),
  update: (id, patch) => folderTemplatesRepository.update(id, patch),
  remove: (id) => folderTemplatesRepository.delete(id),
};

export default folderTemplateService;
