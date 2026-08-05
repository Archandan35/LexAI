import { tasksRepository } from '@/data-layer/repositories/tasksRepository.js';
import { DateEngine } from '@/core/index.js';

// taskService — standalone task / to-do management.
export const taskService = {
  list: (query = {}) => tasksRepository.getAll(query),
  get: (id) => tasksRepository.getById(id),
  create: (data) => tasksRepository.create({ created_at: DateEngine.now(), updated_at: DateEngine.now(), ...data }),
  update: (id, patch) => tasksRepository.update(id, { ...patch, updated_at: DateEngine.now() }),
  remove: (id) => tasksRepository.delete(id),
};

export default taskService;
