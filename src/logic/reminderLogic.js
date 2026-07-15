import { reminderService } from '@/services/reminderService.js';
import { caseService } from '@/services/caseService.js';
import { caseActivityService } from '@/services/caseActivityService.js';
import { ok, fail } from '@/utils/result.js';

// Auto hearing-reminder configuration.
const HEARING_REMINDER_TYPE = 'Hearing Reminder';
const REMINDER_OFFSETS = [30, 15, 7, 3, 2, 1];
const TERMINAL_STATUSES = new Set(['disposed', 'cancelled', 'canceled', 'closed', 'dismissed', 'archived', 'completed']);

function ymd(value) {
  if (!value) return '';
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayYmd() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function shiftYmd(hearingYmd, offsetDays) {
  const [y, m, d] = hearingYmd.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() - offsetDays);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function diffDays(aYmd, bYmd) {
  const [ay, am, ad] = aYmd.split('-').map(Number);
  const [by, bm, bd] = bYmd.split('-').map(Number);
  return Math.round((new Date(ay, am - 1, ad) - new Date(by, bm - 1, bd)) / 86400000);
}

function isAutoHearingReminder(r) {
  return r && r.type === HEARING_REMINDER_TYPE;
}

function reminderKey(caseId, hearingYmd, offset) {
  return `${caseId}|${hearingYmd}|${offset}`;
}

function caseNumberLabel(c) {
  return c?.case_display_number || c?.caseNumber || c?.title || 'this case';
}

// Derive the hearing "purpose" from the hearing record that established the
// next hearing date (posted_for), falling back to a same-day hearing's purpose.
function derivePurpose(hearings, hearingYmd) {
  const bySchedule = hearings.find((h) => ymd(h.nextHearingDate) === hearingYmd);
  if (bySchedule?.postedFor) return bySchedule.postedFor;
  const byDate = hearings.find((h) => ymd(h.date) === hearingYmd);
  if (byDate?.purpose) return byDate.purpose;
  return '';
}

function buildTitle(caseLabel, offset, purpose) {
  const dayWord = offset === 1 ? 'day' : 'days';
  const tail = purpose ? ` for ${purpose}` : '';
  return `Your hearing for ${caseLabel} is scheduled in ${offset} ${dayWord}${tail}.`;
}

// Compute the reminders that SHOULD exist for a case's current next hearing.
function computeDesired(c, hearings) {
  const status = String(c?.status || '').toLowerCase();
  if (TERMINAL_STATUSES.has(status)) return [];
  const hearingYmd = ymd(c?.nextHearing);
  if (!hearingYmd) return [];
  const today = todayYmd();
  if (hearingYmd < today) return [];
  const label = caseNumberLabel(c);
  const purpose = derivePurpose(hearings, hearingYmd);
  const desired = [];
  for (const offset of REMINDER_OFFSETS) {
    const trigger = shiftYmd(hearingYmd, offset);
    if (trigger < today) continue; // don't create already-past reminders
    desired.push({
      key: reminderKey(c.id, hearingYmd, offset),
      offset,
      trigger,
      hearingYmd,
      title: buildTitle(label, offset, purpose),
    });
  }
  return desired;
}

// reminderLogic — per-case reminders with deadline tracking + automatic
// hearing reminders (30/15/7/3/2/1 days before the next hearing).
export const reminderLogic = {
  async list(caseId) {
    const rows = await reminderService.list(caseId);
    return [...rows].sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  async add(caseId, { type, title, date }, user) {
    if (!title?.trim()) return fail('Reminder title is required.');
    if (!date) return fail('A date is required.');
    const row = await reminderService.create({ caseId, type: type || 'Hearing Date', title: title.trim(), date });
    await caseActivityService.record(caseId, 'case.update', `Reminder set: ${title.trim()} (${date})`, user);
    return ok(row);
  },

  async toggle(reminder) {
    return ok(await reminderService.update(reminder.id, { done: !reminder.done }));
  },

  async remove(id) {
    return ok(await reminderService.remove(id));
  },

  // Idempotently reconcile the auto hearing reminders for a case with its
  // current next hearing date + status. Creates missing reminders, removes
  // stale ones (date changed / hearing removed / case disposed), never
  // duplicates. Safe to call on every case create/update.
  async syncHearingReminders(caseId, user) {
    if (!caseId) return ok({ created: 0, removed: 0 });
    try {
      const [c, all, hearings] = await Promise.all([
        caseService.getCase(caseId),
        reminderService.list(caseId),
        caseService.listHearings(caseId).catch(() => []),
      ]);
      if (!c) return ok({ created: 0, removed: 0 });

      const existing = (all || []).filter(isAutoHearingReminder);
      const existingByKey = new Map();
      for (const r of existing) {
        const key = reminderKey(caseId, ymd(r.dueAt), diffDays(ymd(r.dueAt), ymd(r.date)));
        existingByKey.set(key, r);
      }

      const desired = computeDesired(c, hearings || []);
      const desiredByKey = new Map(desired.map((d) => [d.key, d]));

      let removed = 0;
      for (const [key, r] of existingByKey) {
        if (!desiredByKey.has(key)) {
          // eslint-disable-next-line no-await-in-loop
          await reminderService.remove(r.id);
          removed += 1;
        }
      }

      let created = 0;
      for (const [key, d] of desiredByKey) {
        if (existingByKey.has(key)) continue;
        // eslint-disable-next-line no-await-in-loop
        await reminderService.create({
          caseId,
          type: HEARING_REMINDER_TYPE,
          title: d.title,
          date: d.trigger,
          dueAt: d.hearingYmd,
          status: 'pending',
          done: false,
        });
        created += 1;
      }

      if (created > 0) {
        await caseActivityService.record(
          caseId, 'case.update',
          `Hearing reminders scheduled (${created}) for ${ymd(c.nextHearing)}`, user,
        ).catch(() => {});
      }
      return ok({ created, removed });
    } catch (e) {
      return fail(e);
    }
  },
};

export default reminderLogic;
