import { clientService } from '@/services/clientService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const clientLogic = {
  async list() {
    try { return await clientService.list(); } catch (err) { return fail(err); }
  },
  async create(data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Client name is required.');
      return ok(await clientService.create({ ...data, name, createdAt: nowISO() }));
    } catch (err) { return fail(err); }
  },
  async update(id, data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Client name is required.');
      return ok(await clientService.update(id, data));
    } catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await clientService.remove(id)); } catch (err) { return fail(err); }
  },
  async stats() {
    try {
      const all = await clientService.list();
      return {
        totalClients: all.length,
        activeMatters: all.filter((c) => c.status === 'Active').length,
        pendingPayments: all.filter((c) => c.payment_status === 'Pending').length,
        newThisMonth: all.filter((c) => {
          const d = new Date(c.created_at || c.createdAt);
          const now = new Date();
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length,
      };
    } catch { return { totalClients: 0, activeMatters: 0, pendingPayments: 0, newThisMonth: 0 }; }
  },
};

export default clientLogic;
