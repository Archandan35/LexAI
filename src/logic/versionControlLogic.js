import { draftsRepository } from '@/data-layer/repositories/draftsRepository.js';
import { ok, fail } from '@/utils/result.js';

export const versionControlLogic = {
  async getAllDrafts() {
    try { return await draftsRepository.getAll(); } catch (err) { return fail(err); }
  },
};

export default versionControlLogic;
