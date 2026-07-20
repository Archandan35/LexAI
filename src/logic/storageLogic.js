import { storageStatsService } from '@/services/storageStatsService.js';
import { fileLogic } from '@/logic/fileLogic.js';
import { ok, fail } from '@/utils/result.js';

export const storageLogic = {
  async summary() {
    try { return await storageStatsService.summary(); } catch (err) { return fail(err); }
  },

  async testConnection() {
    try { return await storageStatsService.testConnection(); } catch (err) { return fail(err); }
  },

  async syncAll() {
    try { return await fileLogic.syncAll(); } catch (err) { return fail(err); }
  },
};

export default storageLogic;
