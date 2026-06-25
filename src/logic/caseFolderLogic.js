import { caseFolderService } from '@/services/caseFolderService.js';
import { caseActivityService } from '@/services/caseActivityService.js';
import { draftsRepository } from '@/data-layer/repositories/draftsRepository.js';
import { documentsRepository } from '@/data-layer/repositories/documentsRepository.js';
import { folderTemplateLogic } from '@/logic/folderTemplateLogic.js';
import { ok, fail } from '@/utils/result.js';
import { DateEngine } from '@/core/index.js';

// caseFolderLogic — per-case folder management for documents and drafts.
export const caseFolderLogic = {
  // Create the default folder set for a case (called on case creation). Idempotent.
  async ensureForCase(caseId) {
    const existing = await caseFolderService.list(caseId);
    if (existing.length) return existing;
    const allTemplates = await folderTemplateLogic.list();
    const docTemplates = allTemplates.filter((t) => t.kind === 'document');
    const draftTemplates = allTemplates.filter((t) => t.kind === 'draft');
    let order = 0;
    for (const tpl of docTemplates) {
      // eslint-disable-next-line no-await-in-loop
      await caseFolderService.create({ caseId, name: tpl.name, kind: 'document', order: order++, system: true, createdAt: DateEngine.now() });
    }
    for (const tpl of draftTemplates) {
      // eslint-disable-next-line no-await-in-loop
      await caseFolderService.create({ caseId, name: tpl.name, kind: 'draft', order: order++, system: true, createdAt: DateEngine.now() });
    }
    return caseFolderService.list(caseId);
  },

  async list(caseId, kind) {
    const rows = await this.ensureForCase(caseId);
    const filtered = kind ? rows.filter((f) => f.kind === kind) : rows;
    return [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },

  async create(caseId, name, kind, user, parentId) {
    const n = (name || '').trim();
    if (!n) return fail('Folder name is required.');
    const existing = await caseFolderService.list(caseId, kind);
    if (!parentId && parentId !== null && existing.some((f) => f.name.toLowerCase() === n.toLowerCase())) return fail('Folder already exists.');
    const order = existing.reduce((m, f) => Math.max(m, f.order ?? 0), 0) + 1;
    const row = await caseFolderService.create({ caseId, name: n, kind, order, parentId: parentId || null, system: false, createdAt: DateEngine.now() });
    await caseActivityService.record(caseId, 'folder.create', `Created ${kind} folder "${n}"`, user);
    return ok(row);
  },

  async rename(folder, name, user) {
    const n = (name || '').trim();
    if (!n) return fail('Folder name is required.');
    // Re-tag any items currently filed under the old name.
    const repo = folder.kind === 'draft' ? draftsRepository : documentsRepository;
    const items = await repo.getAll({ caseId: folder.caseId, folder: folder.name });
    for (const it of items) {
      // eslint-disable-next-line no-await-in-loop
      await repo.update(it.id, { folder: n });
    }
    await caseFolderService.update(folder.id, { name: n });
    await caseActivityService.record(folder.caseId, 'folder.rename', `Renamed folder "${folder.name}" → "${n}"`, user);
    return ok(true);
  },

  async remove(folder, { moveTo = 'Miscellaneous' } = {}, user) {
    const repo = folder.kind === 'draft' ? draftsRepository : documentsRepository;
    const items = await repo.getAll({ caseId: folder.caseId, folder: folder.name });
    // Reassign items to a fallback folder rather than orphaning them.
    for (const it of items) {
      // eslint-disable-next-line no-await-in-loop
      await repo.update(it.id, { folder: moveTo });
    }
    await caseFolderService.remove(folder.id);
    await caseActivityService.record(folder.caseId, 'folder.delete', `Deleted folder "${folder.name}" (moved ${items.length} item(s) to ${moveTo})`, user);
    return ok(true);
  },
};

export default caseFolderLogic;
