import { courtsService } from '@/services/courtsService.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

function slugShortCode(name = '') {
  const cleaned = String(name).trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  // Prefer first 4 alpha chars to keep it compact/stable.
  const letters = cleaned.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return (letters.slice(0, 4) || cleaned.toUpperCase().slice(0, 4)).toUpperCase();
}

async function resolveParentId({ parent_id, parent_name }, courtsService) {
  if (parent_id) return parent_id;
  if (!parent_name) return null;
  const target = String(parent_name).trim().toLowerCase();
  if (!target) return null;
  const rows = await courtsService.list();
  const match = rows.find((c) => String(c.name).trim().toLowerCase() === target);
  return match?.id ?? null;
}

export const courtsLogic = {
  async list() {
    try {
      const rows = await courtsService.list();
      return [...rows].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) { return fail(err); }
  },

  async get(id) {
    try {
      return courtsService.get(id);
    } catch (err) { return fail(err); }
  },

  async create(data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Court name is required.');

      const parent_id = await resolveParentId(
        { parent_id: data.parent_id, parent_name: data.parent_name },
        courtsService
      );

      const short_code = (data.short_code || '').trim() || slugShortCode(name);

      return ok(await courtsService.create({
        name,
        short_code,
        level: data.level ?? 1,
        parent_id,
        display_order: data.display_order ?? 0,
        status: 'Active',
        createdAt: nowISO(),
      }));
    } catch (err) { return fail(err); }
  },

  async update(id, data) {
    try {
      const name = (data.name || '').trim();
      if (!name) return fail('Court name is required.');

      const parent_id = await resolveParentId(
        { parent_id: data.parent_id, parent_name: data.parent_name },
        courtsService
      );

      const short_code =
        (data.short_code ?? '').toString().trim() ||
        slugShortCode(name);

      return ok(await courtsService.update(id, {
        name,
        short_code,
        level: data.level,
        parent_id,
        display_order: data.display_order,
        status: data.status,
      }));
    } catch (err) { return fail(err); }
  },

  async remove(id) {
    try {
      return ok(await courtsService.remove(id));
    } catch (err) { return fail(err); }
  },
};

export default courtsLogic;
