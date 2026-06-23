import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Field, { Input, Textarea, Select } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import { caseLogic } from '@/logic/caseLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';
import { useAuth } from '@/data-layer/AuthContext.jsx';

const CASE_TYPES = ['Civil', 'Criminal', 'Family', 'Constitutional', 'Tax'];

export default function CreateCase() {
  const { user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ title: '', type: '', court: '', caseNumber: '', filingDate: '', description: '' });
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title?.trim()) { toast.error('Case title is required.'); return; }
    if (!form.type) { toast.error('Case type is required.'); return; }
    setSaving(true);
    try {
      const result = await caseLogic.create({
        title: form.title,
        case_type: form.type,
        court: form.court,
        case_number: form.caseNumber,
        filing_date: form.filingDate,
        description: form.description,
      }, user);
      if (result?.id) { toast.success('Case created successfully!'); setForm({ title: '', type: '', court: '', caseNumber: '', filingDate: '', description: '' }); }
      else toast.error('Failed to create case.');
    } catch { toast.error('An error occurred.'); } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader title="Create Case" icon="plus-circle" />
      <Card title="New Case">
        <Field label="Case Title"><Input value={form.title} onChange={set('title')} placeholder="Enter case title" /></Field>
        <Field label="Case Type"><Select value={form.type} onChange={set('type')} options={[{ value: '', label: 'Select type' }, ...CASE_TYPES.map((t) => ({ value: t, label: t }))]} /></Field>
        <Field label="Court"><Input value={form.court} onChange={set('court')} placeholder="Enter court name" /></Field>
        <Field label="Case Number"><Input value={form.caseNumber} onChange={set('caseNumber')} placeholder="Enter case number" /></Field>
        <Field label="Filing Date"><Input value={form.filingDate} onChange={set('filingDate')} type="date" /></Field>
        <Field label="Description"><Textarea value={form.description} onChange={set('description')} placeholder="Enter description" /></Field>
        <div className="form-actions"><Button onClick={handleSubmit} disabled={saving}>{saving ? 'Creating...' : 'Create Case'}</Button></div>
      </Card>
    </div>
  );
}
