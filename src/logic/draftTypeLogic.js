import { draftTypeService } from '@/services/draftTypeService.js';
import { ok, fail } from '@/utils/result.js';
import { DateEngine } from '@/core/index.js';

const SEED = [
  { id: 'plaint', label: 'Plaint', group: 'Core Pleadings' },
  { id: 'written-statement', label: 'Written Statement', group: 'Core Pleadings' },
  { id: 'counter-claim', label: 'Counter Claim', group: 'Core Pleadings' },
  { id: 'amendment', label: 'Amendment Petition', group: 'Applications' },
  { id: 'affidavit', label: 'Affidavit', group: 'Evidence' },
  { id: 'evidence', label: 'Evidence Affidavit', group: 'Evidence' },
  { id: 'argument', label: 'Written Argument', group: 'Arguments' },
  { id: 'legal-notice', label: 'Legal Notice', group: 'Notices' },
  { id: 'appeal', label: 'Appeal', group: 'Appeals' },
  { id: 'revision', label: 'Revision', group: 'Appeals' },
  { id: 'review', label: 'Review', group: 'Appeals' },
  { id: 'bail', label: 'Bail', group: 'Applications' },
];

let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  const existing = await draftTypeService.list();
  if (existing.length > 0) { seeded = true; return; }
  for (let i = 0; i < SEED.length; i++) {
    await draftTypeService.create({ ...SEED[i], display_order: i, createdAt: DateEngine.now() });
  }
  seeded = true;
}

export const draftTypeLogic = {
  async list() {
    try {
      await ensureSeeded();
      const all = await draftTypeService.list();
      return [...all].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) { return fail(err); }
  },
  async create(data) {
    try { return ok(await draftTypeService.create({ ...data, createdAt: DateEngine.now() })); }
    catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await draftTypeService.remove(id)); }
    catch (err) { return fail(err); }
  },
};

export default draftTypeLogic;
