import { hearingsRepository } from '@/data-layer/repositories/hearingsRepository.js';
import { remindersRepository } from '@/data-layer/repositories/remindersRepository.js';
import { casesRepository } from '@/data-layer/repositories/casesRepository.js';
import { ok, fail } from '@/utils/result.js';

export const calendarLogic = {
  async getHearings() {
    try { return await hearingsRepository.getAll(); } catch (err) { return fail(err); }
  },

  async getReminders() {
    try { return await remindersRepository.getAll(); } catch (err) { return fail(err); }
  },

  async getCases(query) {
    try { return await casesRepository.getAll(query); } catch (err) { return fail(err); }
  },
};

export default calendarLogic;
