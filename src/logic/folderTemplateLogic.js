import { folderTemplateService } from '@/services/folderTemplateService.js';
import { ok, fail } from '@/utils/result.js';
import { DateEngine } from '@/core/index.js';

const SEED_DOC = ['Suit', 'Petition', 'Written Statement', 'Evidence', 'Affidavit', 'Exhibits', 'Orders', 'Judgments', 'Miscellaneous'];
const SEED_DRAFT = ['Petitions', 'Written Statements', 'Objections', 'Affidavits', 'Notes', 'Miscellaneous'];

let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  const existing = await folderTemplateService.list();
  if (existing.length > 0) { seeded = true; return; }
  let order = 0;
  for (const name of SEED_DOC) {
    await folderTemplateService.create({ name, kind: 'document', system: true, display_order: order++, createdAt: DateEngine.now() });
  }
  for (const name of SEED_DRAFT) {
    await folderTemplateService.create({ name, kind: 'draft', system: true, display_order: order++, createdAt: DateEngine.now() });
  }
  seeded = true;
}

export const folderTemplateLogic = {
  async list(kind) {
    try {
      await ensureSeeded();
      const all = await folderTemplateService.list();
      const filtered = kind ? all.filter((f) => f.kind === kind) : all;
      return [...filtered].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) { return fail(err); }
  },
  async create(data) {
    try { return ok(await folderTemplateService.create({ ...data, createdAt: DateEngine.now() })); }
    catch (err) { return fail(err); }
  },
  async remove(id) {
    try { return ok(await folderTemplateService.remove(id)); }
    catch (err) { return fail(err); }
  },
};

export default folderTemplateLogic;
