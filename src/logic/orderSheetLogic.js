import { caseService } from '@/services/caseService.js';
import { orderSheetTemplatesRepository } from '@/data-layer/repositories/orderSheetTemplatesRepository.js';
import { FieldMapper } from '@/core/FieldMapper.js';
import { ok, fail } from '@/utils/result.js';
import { DateEngine } from '@/core/index.js';
import { combinedCourt } from '@/utils/caseFormat.js';
import { invalidateQuery } from '@/data-layer/queryCache.js';

function fmtCaseNumber(c) {
  if (!c) return '—';
  const ct = c.case_type || '';
  const cn = c.case_number || c.caseNumber || c.case_display_number;
  const cy = c.case_year || '';
  if (ct && cn && cy) return `${ct} ${cn}/${cy}`;
  return c.case_display_number || c.caseNumber || String(cn || '') || '—';
}

// orderSheetLogic — daily/period order sheet + per-case hearing history rendered
// through a user-chosen template. Templates are CRUD-managed by the user.
export const orderSheetLogic = {
  async orderSheet({ from, to } = {}) {
    try {
      const [cases, hearings] = await Promise.all([
        caseService.listCases(),
        caseService.listHearings(),
      ]);
      const caseMap = Object.fromEntries(cases.map((c) => [c.id, c]));
      const rows = hearings
        .filter((h) => inRange(h.date, from, to))
        .sort((a, b) => DateEngine.compare(a.date, b.date))
        .map((h) => {
          const c = caseMap[h.caseId] || caseMap[h.case_id] || null;
          return {
            ...h,
            caseId: h.caseId || h.case_id,
            case: c,
            caseNumber: c ? fmtCaseNumber(c) : '—',
            parties: c?.title || '—',
            court: c ? combinedCourt(c) : '—',
            stage: c?.stage || '—',
          };
        });
      return ok({ rows });
    } catch (e) {
      return fail(e);
    }
  },

  // History of a single case, formatted via the selected template string.
  async caseHistory(caseId, template) {
    try {
      const [theCase, hearings] = await Promise.all([
        caseService.getCase(caseId),
        caseService.listHearings(caseId),
      ]);
      const sorted = [...hearings].sort((a, b) => DateEngine.compare(a.date, b.date));
      const format = template?.historyFormat || '{date} — {stage} — {purpose} — {status}';
      const lines = sorted.map((h) =>
        format
          .replace('{date}', h.date || '')
          .replace('{stage}', theCase?.stage || '')
          .replace('{purpose}', h.purpose || '')
          .replace('{status}', h.status || '')
          .replace('{caseNumber}', theCase?.caseNumber || '')
          .replace('{parties}', theCase?.title || '')
          .replace('{court}', theCase?.court || '')
          .replace('{notes}', h.notes || '')
      );
      return ok({ case: theCase, hearings: sorted, lines });
    } catch (e) {
      return fail(e);
    }
  },

  async getHearing(id) {
    try {
      const row = await caseService.getHearing(id);
      return ok(FieldMapper.toLexAI('hearings', row));
    } catch (e) { return fail(e); }
  },
  async addHearing(data) {
    try { const r = await caseService.addHearing(data); invalidateQuery('dashboard'); return ok(r); } catch (e) { return fail(e); }
  },
  async updateHearing(id, patch) {
    try { const r = await caseService.updateHearing(id, patch); invalidateQuery('dashboard'); return ok(r); } catch (e) { return fail(e); }
  },
  async deleteHearing(id) {
    try { const r = await caseService.deleteHearing(id); invalidateQuery('dashboard'); return ok(r); } catch (e) { return fail(e); }
  },

  // Template CRUD
  listTemplates: () => orderSheetTemplatesRepository.getAll(),
  addTemplate: (data) => orderSheetTemplatesRepository.create(data),
  updateTemplate: (id, patch) => orderSheetTemplatesRepository.update(id, patch),
  deleteTemplate: (id) => orderSheetTemplatesRepository.delete(id),
};

function inRange(date, from, to) {
  if (!from && !to) return true;
  const t = DateEngine.timestamp(date);
  if (from && t < DateEngine.timestamp(from)) return false;
  if (to && t > DateEngine.timestamp(to)) return false;
  return true;
}

export default orderSheetLogic;
