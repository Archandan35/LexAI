import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Field, { Input, Textarea, Select } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';
import InlineEntityManager from '@/components/InlineEntityManager.jsx';
import { caseLogic } from '@/logic/caseLogic.js';
import { clientLogic } from '@/logic/clientLogic.js';
import { userLogic } from '@/logic/userLogic.js';
import { caseStatusLogic } from '@/logic/caseStatusLogic.js';
import { caseTypeLogic } from '@/logic/caseTypeLogic.js';
import { courtHierarchyLogic } from '@/logic/courtHierarchyLogic.js';
import { benchTypeLogic } from '@/logic/benchTypeLogic.js';
import { jurisdictionLogic } from '@/logic/jurisdictionLogic.js';
import { caseStageLogic } from '@/logic/caseStageLogic.js';
import { priorityLogic } from '@/logic/priorityLogic.js';
import { caseFolderLogic } from '@/logic/caseFolderLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';
import { useAuth } from '@/data-layer/AuthContext.jsx';
import { useCaseStatuses } from '@/hooks/useCaseStatuses.js';
import { useCaseTypes } from '@/hooks/useCaseTypes.js';
import { useCaseStages } from '@/hooks/useCaseStages.js';
import { usePriorities } from '@/hooks/usePriorities.js';
import { useCourts } from '@/hooks/useCourts.js';
import { useCourtHierarchy } from '@/hooks/useCourtHierarchy.js';
import { useBenchTypes } from '@/hooks/useBenchTypes.js';
import { useJurisdictions } from '@/hooks/useJurisdictions.js';

const INITIAL_FORM = {
  case_number: '',
  case_year: '',
  status: 'Active',
  case_type: '',
  plaintiffs: [],
  defendants: [],
  client: '',
  advocate: '',
  court_hierarchy: '',
  court_type: '',
  court_name: '',
  bench_type: '',
  presiding_officer: '',
  jurisdiction: '',
  case_stage: '',
  priority: '',
  filing_date: '',
  next_hearing_date: '',
  filing_number: '',
  registration_number: '',
  cnr_number: '',
  registration_date: '',
  disposal_date: '',
  case_summary: '',
  internal_notes: '',
  document_folder: '',
};

function MultiValueField({ items, inputValue, onInputChange, onAdd, onRemove, placeholder }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
        />
        <Button variant="secondary" size="sm" onClick={onAdd} disabled={!inputValue.trim()}>Add</Button>
      </div>
      {items.length > 0 && (
        <div className="multi-value-container">
          {items.map((item, i) => (
            <span key={i} className="multi-value-item">
              {item}
              <button type="button" className="icon-btn" onClick={() => onRemove(i)} aria-label={`Remove ${item}`}>
                <Icon name="close" size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function InlineAddButton({ onClick, title }) {
  return (
    <button type="button" className="icon-btn" onClick={onClick} title={title}>
      <Icon name="plus" size={16} />
    </button>
  );
}

function SelectWithAdd({ value, onChange, options, placeholder, onAdd, addTitle }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Select value={value} onChange={onChange} style={{ flex: 1 }}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
      <InlineAddButton onClick={onAdd} title={addTitle} />
    </div>
  );
}

export default function CreateCase() {
  const { user } = useAuth();
  const toast = useToast();

  const { statuses, refresh: refreshStatuses } = useCaseStatuses();
  const { caseTypes, refresh: refreshCaseTypes } = useCaseTypes();
  const { names: stageNames, refresh: refreshStages } = useCaseStages();
  const { priorities, refresh: refreshPriorities } = usePriorities();
  const { courtNames, refresh: refreshCourts } = useCourts();
  const { hierarchy, refresh: refreshHierarchy } = useCourtHierarchy();
  const { benchTypes, refresh: refreshBenchTypes } = useBenchTypes();
  const { jurisdictions, refresh: refreshJurisdictions } = useJurisdictions();

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    clientLogic.list().then((r) => { if (Array.isArray(r)) setClients(r); else setClients([]); }).catch(() => setClients([]));
    userLogic.list().then((r) => { if (Array.isArray(r)) setUsers(r); else setUsers([]); }).catch(() => setUsers([]));
  }, []);

  const [form, setForm] = useState({ ...INITIAL_FORM });
  const [plaintiffInput, setPlaintiffInput] = useState('');
  const [defendantInput, setDefendantInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const [entityModal, setEntityModal] = useState({ open: false, title: '', fields: [], onSave: null });

  const openEntityManager = useCallback((title, fields, handler) => {
    setEntityModal({ open: true, title, fields, onSave: handler });
  }, []);

  const closeEntityManager = useCallback(() => {
    setEntityModal((prev) => ({ ...prev, open: false }));
  }, []);

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFieldEvent = useCallback((key) => (e) => {
    setField(key, e.target.value);
  }, [setField]);

  const addPlaintiff = useCallback(() => {
    const val = plaintiffInput.trim();
    if (!val) return;
    if (!form.plaintiffs.includes(val)) {
      setField('plaintiffs', [...form.plaintiffs, val]);
    }
    setPlaintiffInput('');
  }, [plaintiffInput, form.plaintiffs, setField]);

  const removePlaintiff = useCallback((index) => {
    setField('plaintiffs', form.plaintiffs.filter((_, i) => i !== index));
  }, [form.plaintiffs, setField]);

  const addDefendant = useCallback(() => {
    const val = defendantInput.trim();
    if (!val) return;
    if (!form.defendants.includes(val)) {
      setField('defendants', [...form.defendants, val]);
    }
    setDefendantInput('');
  }, [defendantInput, form.defendants, setField]);

  const removeDefendant = useCallback((index) => {
    setField('defendants', form.defendants.filter((_, i) => i !== index));
  }, [form.defendants, setField]);

  const autoTitle = useMemo(() => {
    const pl = form.plaintiffs.join(', ');
    const df = form.defendants.join(', ');
    if (!pl && !df) return '';
    return [pl, df].filter(Boolean).join(' vs ');
  }, [form.plaintiffs, form.defendants]);

  const handleFileChange = useCallback((e) => {
    setSelectedFiles(Array.from(e.target.files || []));
  }, []);

  const handleAddStatus = useCallback(async (data) => {
    const result = await caseStatusLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create status'); return; }
    await refreshStatuses();
    toast.success('Status created');
    closeEntityManager();
  }, [refreshStatuses, toast, closeEntityManager]);

  const handleAddCaseType = useCallback(async (data) => {
    const result = await caseTypeLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create case type'); return; }
    await refreshCaseTypes();
    toast.success('Case type created');
    closeEntityManager();
  }, [refreshCaseTypes, toast, closeEntityManager]);

  const handleAddHierarchy = useCallback(async (data) => {
    const result = await courtHierarchyLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create hierarchy'); return; }
    await refreshHierarchy();
    toast.success('Court hierarchy created');
    closeEntityManager();
  }, [refreshHierarchy, toast, closeEntityManager]);

  const handleAddBenchType = useCallback(async (data) => {
    const result = await benchTypeLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create bench type'); return; }
    await refreshBenchTypes();
    toast.success('Bench type created');
    closeEntityManager();
  }, [refreshBenchTypes, toast, closeEntityManager]);

  const handleAddJurisdiction = useCallback(async (data) => {
    const result = await jurisdictionLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create jurisdiction'); return; }
    await refreshJurisdictions();
    toast.success('Jurisdiction created');
    closeEntityManager();
  }, [refreshJurisdictions, toast, closeEntityManager]);

  const handleAddStage = useCallback(async (data) => {
    const result = await caseStageLogic.add(data.name);
    if (!result.ok) { toast.error(result.error || 'Failed to create stage'); return; }
    await refreshStages();
    toast.success('Stage created');
    closeEntityManager();
  }, [refreshStages, toast, closeEntityManager]);

  const handleAddPriority = useCallback(async (data) => {
    const result = await priorityLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create priority'); return; }
    await refreshPriorities();
    toast.success('Priority created');
    closeEntityManager();
  }, [refreshPriorities, toast, closeEntityManager]);

  const handleAddClient = useCallback(async (data) => {
    const result = await clientLogic.create(data);
    if (!result.ok) { toast.error(result.error || 'Failed to create client'); return; }
    const updated = await clientLogic.list();
    if (Array.isArray(updated)) setClients(updated);
    toast.success('Client created');
    closeEntityManager();
  }, [toast, closeEntityManager]);

  const validate = useCallback(() => {
    if (!form.case_number.trim()) { toast.error('Case number is required.'); return false; }
    if (!form.status) { toast.error('Status is required.'); return false; }
    if (!form.case_type) { toast.error('Case type is required.'); return false; }
    if (form.plaintiffs.length === 0 && form.defendants.length === 0) {
      toast.error('At least one plaintiff or defendant is required.');
      return false;
    }
    if (!form.client) { toast.error('Client is required.'); return false; }
    return true;
  }, [form, toast]);

  const buildPayload = useCallback((draft) => ({
    case_number: form.case_number,
    case_year: form.case_year,
    status: draft ? 'Draft' : form.status,
    case_type: form.case_type,
    plaintiff: form.plaintiffs.join(', '),
    defendant: form.defendants.join(', '),
    client: form.client,
    advocate: form.advocate,
    court_hierarchy: form.court_hierarchy,
    court_type: form.court_type,
    court_name: form.court_name,
    bench_type: form.bench_type,
    presiding_officer: form.presiding_officer,
    jurisdiction: form.jurisdiction,
    case_stage: form.case_stage,
    priority: form.priority,
    filing_date: form.filing_date,
    next_hearing_date: form.next_hearing_date,
    filing_number: form.filing_number,
    registration_number: form.registration_number,
    cnr_number: form.cnr_number,
    registration_date: form.registration_date,
    disposal_date: form.disposal_date,
    case_summary: form.case_summary,
    internal_notes: form.internal_notes,
  }), [form]);

  const resetForm = useCallback(() => {
    setForm({ ...INITIAL_FORM });
    setSelectedFiles([]);
    setPlaintiffInput('');
    setDefendantInput('');
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  const submitCase = useCallback(async (draft) => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = buildPayload(draft);
      const result = await caseLogic.create(payload, user);
      if (result?.id) {
        const folderName = form.document_folder.trim();
        if (folderName) {
          const folderResult = await caseFolderLogic.create(result.id, folderName, 'document', user);
          if (!folderResult.ok) toast.warning(`Case created but folder failed: ${folderResult.error}`);
        }
        toast.success(draft ? 'Draft saved!' : 'Case created successfully!');
        resetForm();
      } else {
        toast.error('Failed to create case.');
      }
    } catch (e) {
      toast.error(e?.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  }, [validate, buildPayload, form.document_folder, user, toast, resetForm]);

  const caseTypeOptions = caseTypes.map((ct) => ({ value: ct.name, label: ct.name }));
  const statusOptions = statuses.map((s) => ({ value: s, label: s }));
  const hierarchyOptions = hierarchy.map((h) => ({ value: h, label: h }));
  const benchTypeOptions = benchTypes.map((b) => ({ value: b, label: b }));
  const jurisdictionOptions = jurisdictions.map((j) => ({ value: j, label: j }));
  const stageOptions = stageNames.map((s) => ({ value: s, label: s }));
  const priorityOptions = priorities.map((p) => ({ value: p, label: p }));
  const courtNameOptions = courtNames.map((c) => ({ value: c, label: c }));
  const clientOptions = clients.map((c) => ({ value: c.name, label: c.name }));
  const userOptions = users.map((u) => ({ value: u.name, label: u.name }));

  return (
    <div className="page-area">
      <PageHeader title="Create Case" icon="pen" />

      <InlineEntityManager
        open={entityModal.open}
        title={entityModal.title}
        fields={entityModal.fields}
        onClose={closeEntityManager}
        onSave={entityModal.onSave}
      />

      <Card title="Case Header">
        <div className="grid-2">
          <Field label="Case Number">
            <Input value={form.case_number} onChange={setFieldEvent('case_number')} placeholder="e.g., 123/2024" />
          </Field>
          <Field label="Case Year">
            <Input value={form.case_year} onChange={setFieldEvent('case_year')} placeholder="e.g., 2024" />
          </Field>
          <Field label="Status">
            <SelectWithAdd
              value={form.status}
              onChange={setFieldEvent('status')}
              options={statusOptions}
              placeholder="Select status"
              onAdd={() => openEntityManager('Add Status', [{ key: 'name', label: 'Status Name', placeholder: 'Enter status name' }], handleAddStatus)}
              addTitle="Add new status"
            />
          </Field>
          <Field label="Case Type">
            <SelectWithAdd
              value={form.case_type}
              onChange={setFieldEvent('case_type')}
              options={caseTypeOptions}
              placeholder="Select case type"
              onAdd={() => openEntityManager('Add Case Type', [
                { key: 'name', label: 'Case Type Name', placeholder: 'e.g., Civil' },
                { key: 'short_code', label: 'Short Code', placeholder: 'e.g., CIV' },
              ], handleAddCaseType)}
              addTitle="Add new case type"
            />
          </Field>
        </div>
      </Card>

      <Card title="Parties">
        <div className="grid-2">
          <Field label="Plaintiff / Petitioner">
            <MultiValueField
              items={form.plaintiffs}
              inputValue={plaintiffInput}
              onInputChange={setPlaintiffInput}
              onAdd={addPlaintiff}
              onRemove={removePlaintiff}
              placeholder="Add plaintiff name"
            />
          </Field>
          <Field label="Defendant / Respondent">
            <MultiValueField
              items={form.defendants}
              inputValue={defendantInput}
              onInputChange={setDefendantInput}
              onAdd={addDefendant}
              onRemove={removeDefendant}
              placeholder="Add defendant name"
            />
          </Field>
        </div>
        <Field label="Cause Title">
          <Input value={autoTitle} readOnly className="title-preview" />
        </Field>
      </Card>

      <Card title="Assignment">
        <div className="grid-2">
          <Field label="Client">
            <SelectWithAdd
              value={form.client}
              onChange={setFieldEvent('client')}
              options={clientOptions}
              placeholder="Select client"
              onAdd={() => openEntityManager('Add Client', [
                { key: 'name', label: 'Client Name', placeholder: 'Enter client name' },
              ], handleAddClient)}
              addTitle="Add new client"
            />
          </Field>
          <Field label="Advocate">
            <Select value={form.advocate} onChange={setFieldEvent('advocate')}>
              <option value="">Select advocate</option>
              {userOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </Field>
        </div>
      </Card>

      <Card title="Court Information">
        <div className="grid-2">
          <Field label="Court Hierarchy">
            <SelectWithAdd
              value={form.court_hierarchy}
              onChange={setFieldEvent('court_hierarchy')}
              options={hierarchyOptions}
              placeholder="Select hierarchy"
              onAdd={() => openEntityManager('Add Court Hierarchy', [
                { key: 'name', label: 'Hierarchy Name', placeholder: 'e.g., Supreme Court' },
              ], handleAddHierarchy)}
              addTitle="Add new court hierarchy"
            />
          </Field>
          <Field label="Court Type">
            <SelectWithAdd
              value={form.court_type}
              onChange={setFieldEvent('court_type')}
              options={caseTypeOptions}
              placeholder="Select court type"
              onAdd={() => openEntityManager('Add Case Type', [
                { key: 'name', label: 'Case Type Name' },
                { key: 'short_code', label: 'Short Code' },
              ], handleAddCaseType)}
              addTitle="Add new court type"
            />
          </Field>
          <Field label="Court Name">
            <Select value={form.court_name} onChange={setFieldEvent('court_name')}>
              <option value="">Select court</option>
              {courtNameOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </Field>
          <Field label="Bench Type">
            <SelectWithAdd
              value={form.bench_type}
              onChange={setFieldEvent('bench_type')}
              options={benchTypeOptions}
              placeholder="Select bench type"
              onAdd={() => openEntityManager('Add Bench Type', [
                { key: 'name', label: 'Bench Type Name', placeholder: 'e.g., Single Bench' },
                { key: 'short_code', label: 'Short Code', placeholder: 'e.g., SB' },
              ], handleAddBenchType)}
              addTitle="Add new bench type"
            />
          </Field>
          <Field label="Presiding Officer">
            <Input value={form.presiding_officer} onChange={setFieldEvent('presiding_officer')} placeholder="e.g., Justice Sharma" />
          </Field>
          <Field label="Jurisdiction">
            <SelectWithAdd
              value={form.jurisdiction}
              onChange={setFieldEvent('jurisdiction')}
              options={jurisdictionOptions}
              placeholder="Select jurisdiction"
              onAdd={() => openEntityManager('Add Jurisdiction', [
                { key: 'name', label: 'Jurisdiction Name', placeholder: 'e.g., Delhi' },
                { key: 'short_code', label: 'Short Code', placeholder: 'e.g., DL' },
              ], handleAddJurisdiction)}
              addTitle="Add new jurisdiction"
            />
          </Field>
        </div>
      </Card>

      <Card title="Case Tracking">
        <div className="grid-2">
          <Field label="Case Stage">
            <SelectWithAdd
              value={form.case_stage}
              onChange={setFieldEvent('case_stage')}
              options={stageOptions}
              placeholder="Select stage"
              onAdd={() => openEntityManager('Add Case Stage', [
                { key: 'name', label: 'Stage Name', placeholder: 'e.g., Pleading' },
              ], handleAddStage)}
              addTitle="Add new case stage"
            />
          </Field>
          <Field label="Priority">
            <SelectWithAdd
              value={form.priority}
              onChange={setFieldEvent('priority')}
              options={priorityOptions}
              placeholder="Select priority"
              onAdd={() => openEntityManager('Add Priority', [
                { key: 'name', label: 'Priority Name', placeholder: 'e.g., High' },
                { key: 'color', label: 'Color', type: 'color', default: '#6b7280' },
              ], handleAddPriority)}
              addTitle="Add new priority"
            />
          </Field>
          <Field label="Filing Date">
            <Input type="date" value={form.filing_date} onChange={setFieldEvent('filing_date')} />
          </Field>
          <Field label="Next Hearing Date">
            <Input type="date" value={form.next_hearing_date} onChange={setFieldEvent('next_hearing_date')} />
          </Field>
        </div>
      </Card>

      <Card title="Identifiers">
        <div className="grid-2">
          <Field label="Filing Number">
            <Input value={form.filing_number} onChange={setFieldEvent('filing_number')} placeholder="Enter filing number" />
          </Field>
          <Field label="Registration Number">
            <Input value={form.registration_number} onChange={setFieldEvent('registration_number')} placeholder="Enter registration number" />
          </Field>
          <Field label="CNR Number">
            <Input value={form.cnr_number} onChange={setFieldEvent('cnr_number')} placeholder="Enter CNR number" />
          </Field>
          <Field label="Registration Date">
            <Input type="date" value={form.registration_date} onChange={setFieldEvent('registration_date')} />
          </Field>
          <Field label="Disposal Date">
            <Input type="date" value={form.disposal_date} onChange={setFieldEvent('disposal_date')} />
          </Field>
        </div>
      </Card>

      <Card title="Summary &amp; Notes">
        <Field label="Case Summary">
          <Textarea value={form.case_summary} onChange={setFieldEvent('case_summary')} rows={4} placeholder="Enter case summary" />
        </Field>
        <Field label="Internal Notes">
          <Textarea value={form.internal_notes} onChange={setFieldEvent('internal_notes')} rows={3} placeholder="Enter internal notes" />
        </Field>
      </Card>

      <Card title="Documents">
        <Field label="Document Folder">
          <Input
            value={form.document_folder}
            onChange={setFieldEvent('document_folder')}
            placeholder="Enter folder name for case documents"
          />
        </Field>
        <Field label="Upload Documents">
          <input type="file" multiple ref={fileRef} onChange={handleFileChange} className="input" />
        </Field>
        {selectedFiles.length > 0 && (
          <div className="multi-value-container" style={{ marginTop: 8 }}>
            {selectedFiles.map((file, i) => (
              <span key={i} className="multi-value-item">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </span>
            ))}
          </div>
        )}
      </Card>

      <div className="form-actions" style={{ marginTop: 24 }}>
        <Button variant="ghost" onClick={resetForm} disabled={saving}>Cancel</Button>
        <Button variant="secondary" onClick={() => submitCase(true)} disabled={saving}>Save Draft</Button>
        <Button variant="primary" onClick={() => submitCase(false)} disabled={saving}>
          {saving ? 'Creating...' : 'Create Case'}
        </Button>
      </div>
    </div>
  );
}
