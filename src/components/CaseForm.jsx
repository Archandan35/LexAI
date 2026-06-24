import React, { useState, useMemo } from 'react';
import { Field, Input, Textarea, Select } from './Field.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import StageManager from './StageManager.jsx';
import CaseTypeManager from './CaseTypeManager.jsx';
import CourtTypeManager from './CourtTypeManager.jsx';
import { CASE_TAGS } from '@/constants/caseFolders.js';
import { useCaseStages } from '@/hooks/useCaseStages.js';
import { useCaseTypes } from '@/hooks/useCaseTypes.js';
import { useCourts } from '@/hooks/useCourts.js';
import { useCaseStatuses } from '@/hooks/useCaseStatuses.js';
import { useCourtHierarchy } from '@/hooks/useCourtHierarchy.js';
import { useBenchTypes } from '@/hooks/useBenchTypes.js';
import { usePriorities } from '@/hooks/usePriorities.js';

const currentYear = new Date().getFullYear();
const PRIORITY_TONES = { Urgent: 'red', High: 'orange', Medium: 'amber', Low: 'green' };

function blank() {
  return {
    id: '', caseNumber: '', title: '', case_type: '', case_number: '', case_year: String(currentYear),
    case_display_number: '', plaintiff: '', defendant: '',
    court: '', court_hierarchy: '', courtName: '', bench_type: '', judge: '',
    stage: '', status: 'Active', priority: '', advocate: '', client: '',
    filingDate: '', wsFilingDate: '', nextHearing: '', registration_date: '', disposal_date: '',
    filing_number: '', registration_number: '', cnr_number: '',
    description: '', case_summary: '', internal_notes: '', tags: [], document_folder: '',
  };
}

function SectionCard({ num, title, children }) {
  return (
    <div style={{ marginBottom: 20, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ background: 'var(--brand)', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{num}</span>
        {title}
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

export default function CaseForm({ initial, onSubmit, onCancel, busy, submitLabel = 'Save' }) {
  const { stages, names, refresh } = useCaseStages();
  const { caseTypes, refresh: refreshCaseTypes } = useCaseTypes();
  const { courts, courtNames, refresh: refreshCourts } = useCourts();
  const { statuses } = useCaseStatuses();
  const { hierarchy } = useCourtHierarchy();
  const { benchTypes } = useBenchTypes();
  const { priorities } = usePriorities();
  const [stageMgr, setStageMgr] = useState(false);
  const [caseTypeMgr, setCaseTypeMgr] = useState(false);
  const [courtTypeMgr, setCourtTypeMgr] = useState(false);
  const [form, setForm] = useState(() => {
    const base = { ...blank(), ...(initial || {}) };
    if (initial?.parties) {
      if (!base.plaintiff) base.plaintiff = initial.parties.plaintiff || '';
      if (!base.defendant) base.defendant = initial.parties.defendant || '';
    }
    if (Array.isArray(base.tags)) base.tags = base.tags.join(', ');
    if (!base.case_year && base.caseNumber) {
      const parts = base.caseNumber.match(/No\.\s*(\d+)\s*of\s*(\d{4})/i);
      if (parts) {
        base.case_number = Number(parts[1]);
        base.case_year = parts[2];
      }
    }
    return base;
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const caseTypeNames = useMemo(() => caseTypes.filter((t) => t.status !== 'Inactive').map((t) => t.short_code), [caseTypes]);
  const hierarchyOptions = hierarchy.map((h) => ({ value: h, label: h }));
  const benchTypeOptions = benchTypes.map((b) => ({ value: b, label: b }));
  const priorityOptions = priorities.map((p) => ({ value: p, label: p }));

  const displayNumber = useMemo(() => {
    const ct = form.case_type || '';
    const cn = form.case_number || '';
    const cy = form.case_year || '';
    return ct && cn && cy ? `${ct} No. ${cn} of ${cy}` : '';
  }, [form.case_type, form.case_number, form.case_year]);

  const autoTitle = useMemo(() => {
    const p = form.plaintiff?.trim();
    const d = form.defendant?.trim();
    return p || d ? [p, d].filter(Boolean).join(' vs ') : '';
  }, [form.plaintiff, form.defendant]);

  const submit = () => {
    const tags = String(form.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
    const payload = {
      ...form,
      case_number: form.case_number ? Number(form.case_number) : undefined,
      case_display_number: displayNumber,
      caseNumber: displayNumber || form.caseNumber,
      title: autoTitle || form.title,
      tags,
      parties: { plaintiff: form.plaintiff, defendant: form.defendant },
    };
    onSubmit?.(payload);
  };

  return (
    <div>
      <SectionCard num="1" title="Case Header">
        <div className="input-row">
          <Field label="Case Type">
            <div style={{ display: 'flex', gap: 8 }}>
              <Select value={form.case_type} onChange={(e) => set('case_type', e.target.value)}>
                <option value="">Select case type…</option>
                {caseTypeNames.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
              <button type="button" className="btn btn--ghost btn--sm" title="Manage case types" onClick={() => setCaseTypeMgr(true)}><Icon name="gear" size={15} /></button>
            </div>
          </Field>
          <Field label="Case Number">
            <Input type="number" min="1" value={form.case_number} onChange={(e) => set('case_number', e.target.value)} placeholder="42" />
          </Field>
          <Field label="Year">
            <Input type="text" value={form.case_year} onChange={(e) => set('case_year', e.target.value)} placeholder="2026" />
          </Field>
        </div>
        {displayNumber && (
          <div className="field">
            <span className="field__hint" style={{ fontSize: 13, fontWeight: 600, paddingLeft: 2 }}>
              Display: <code>{displayNumber}</code>
            </span>
          </div>
        )}
        <Field label="Status">
          <Select value={form.status} onChange={(e) => set('status', e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
      </SectionCard>

      <SectionCard num="2" title="Parties">
        <div className="input-row">
          <Field label="Plaintiff / Petitioner"><Input value={form.plaintiff} onChange={(e) => set('plaintiff', e.target.value)} placeholder="Plaintiff name(s)" /></Field>
          <Field label="Defendant / Respondent"><Input value={form.defendant} onChange={(e) => set('defendant', e.target.value)} placeholder="Defendant name(s)" /></Field>
        </div>
        <Field label="Title / Cause Title">
          <Input value={autoTitle || form.title} placeholder="Auto-generated from parties" readOnly />
        </Field>
        <div className="input-row">
          <Field label="Client"><Input value={form.client} onChange={(e) => set('client', e.target.value)} placeholder="Client name" /></Field>
          <Field label="Advocate"><Input value={form.advocate} onChange={(e) => set('advocate', e.target.value)} placeholder="Advocate name" /></Field>
        </div>
      </SectionCard>

      <SectionCard num="3" title="Court Information">
        <div className="input-row">
          <Field label="Court Type">
            <div style={{ display: 'flex', gap: 8 }}>
              <Select value={form.court} onChange={(e) => set('court', e.target.value)}>
                <option value="">Select court…</option>
                {courtNames.map((c) => <option key={c}>{c}</option>)}
              </Select>
              <button type="button" className="btn btn--ghost btn--sm" title="Manage court types" onClick={() => setCourtTypeMgr(true)}><Icon name="gear" size={15} /></button>
            </div>
          </Field>
          <Field label="Court Hierarchy">
            <Select value={form.court_hierarchy} onChange={(e) => set('court_hierarchy', e.target.value)}>
              <option value="">Select hierarchy…</option>
              {hierarchyOptions.map((h) => <option key={h} value={h}>{h}</option>)}
            </Select>
          </Field>
        </div>
        <div className="input-row">
          <Field label="Bench Type">
            <Select value={form.bench_type} onChange={(e) => set('bench_type', e.target.value)}>
              <option value="">Select bench type…</option>
              {benchTypeOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </Select>
          </Field>
          <Field label="Court Name">
            <Input value={form.courtName} onChange={(e) => set('courtName', e.target.value)} placeholder="e.g., Athgarh" />
          </Field>
          <Field label="Presiding Officer">
            <Input value={form.judge} onChange={(e) => set('judge', e.target.value)} placeholder="Judge name" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard num="4" title="Case Tracking">
        <div className="input-row">
          <Field label="Case Stage">
            <div style={{ display: 'flex', gap: 8 }}>
              <Select value={form.stage} onChange={(e) => set('stage', e.target.value)}>
                <option value="">Select stage…</option>
                {names.map((s) => <option key={s}>{s}</option>)}
              </Select>
              <button type="button" className="btn btn--ghost btn--sm" title="Manage stages" onClick={() => setStageMgr(true)}><Icon name="gear" size={15} /></button>
            </div>
          </Field>
          <Field label="Priority">
            <Select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
              <option value="">Select priority…</option>
              {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
        </div>
        <div className="input-row">
          <Field label="Filing Date"><Input type="date" value={form.filingDate} onChange={(e) => set('filingDate', e.target.value)} /></Field>
          <Field label="WS Filing Date"><Input type="date" value={form.wsFilingDate} onChange={(e) => set('wsFilingDate', e.target.value)} /></Field>
          <Field label="Next Hearing"><Input type="date" value={form.nextHearing} onChange={(e) => set('nextHearing', e.target.value)} /></Field>
        </div>
        <div className="input-row">
          <Field label="Registration Date"><Input type="date" value={form.registration_date} onChange={(e) => set('registration_date', e.target.value)} /></Field>
          <Field label="Disposal Date"><Input type="date" value={form.disposal_date} onChange={(e) => set('disposal_date', e.target.value)} /></Field>
        </div>
      </SectionCard>

      <SectionCard num="5" title="Identifiers">
        <div className="input-row">
          <Field label="Filing Number"><Input value={form.filing_number} onChange={(e) => set('filing_number', e.target.value)} placeholder="e.g., F-42/2024" /></Field>
          <Field label="Registration Number"><Input value={form.registration_number} onChange={(e) => set('registration_number', e.target.value)} placeholder="e.g., R-10/2024" /></Field>
          <Field label="CNR Number"><Input value={form.cnr_number} onChange={(e) => set('cnr_number', e.target.value)} placeholder="e.g., CNR-1234" /></Field>
        </div>
        <Field label="Document Folder"><Input value={form.document_folder} onChange={(e) => set('document_folder', e.target.value)} placeholder="e.g., Suit Copy" /></Field>
      </SectionCard>

      <SectionCard num="6" title="Notes &amp; Summary">
        <Field label="Case Summary"><Textarea value={form.case_summary || form.description} onChange={(e) => set('case_summary', e.target.value)} placeholder="Brief description of the matter…" rows={3} /></Field>
        <Field label="Internal Notes"><Textarea value={form.internal_notes} onChange={(e) => set('internal_notes', e.target.value)} placeholder="Internal notes (not visible to client)…" rows={3} /></Field>
        <Field label="Tags" hint={`Comma-separated. Suggestions: ${CASE_TAGS.join(', ')}`}>
          <Input value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="Urgent, Appeal" />
        </Field>
      </SectionCard>

      <div className="modal__foot" style={{ padding: '8px 0 0', borderTop: 'none' }}>
        <Button variant="ghost" onClick={onCancel} disabled={busy}>Cancel</Button>
        <Button variant="primary" icon="save" loading={busy} onClick={submit}>{submitLabel}</Button>
      </div>

      <StageManager open={stageMgr} stages={stages} onClose={() => setStageMgr(false)} onChanged={refresh} />
      <CaseTypeManager open={caseTypeMgr} caseTypes={caseTypes} onClose={() => setCaseTypeMgr(false)} onChanged={refreshCaseTypes} />
      <CourtTypeManager open={courtTypeMgr} courts={courts} onClose={() => setCourtTypeMgr(false)} onChanged={refreshCourts} />
    </div>
  );
}
