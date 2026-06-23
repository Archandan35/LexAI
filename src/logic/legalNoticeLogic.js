import { legalNoticeService } from '@/services/legalNoticeService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const legalNoticeLogic = {
  async list() {
    try { return await legalNoticeService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      if (!(data.notice_number || '').trim()) return fail('Notice number is required.');
      if (!(data.recipient || '').trim()) return fail('Recipient is required.');
      return ok(await legalNoticeService.create({ ...data, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try { return ok(await legalNoticeService.update(id, data)); } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await legalNoticeService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await legalNoticeService.list();
      return {
        draft: all.filter((n) => n.status === 'Draft').length,
        sent: all.filter((n) => n.status === 'Sent').length,
        acknowledged: all.filter((n) => n.status === 'Acknowledged').length,
        replied: all.filter((n) => n.status === 'Replied').length,
      };
    } catch { return { draft: 0, sent: 0, acknowledged: 0, replied: 0 }; }
  },
};

export default legalNoticeLogic;
