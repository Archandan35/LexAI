import React, { useState, useCallback } from 'react';
import { useCourts } from '@/hooks/useCourts.js';
import { courtLogic } from '@/logic/courtLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import { Field } from '@/components/Field.jsx';
import Icon from '@/components/Icon.jsx';

export default function CourtTypes() {
  const { courts, courtNames, loading, refresh } = useCourts();
  const toast = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '' });
  const [error, setError] = useState('');

  const resetForm = useCallback(() => {
    setForm({ name: '' });
    setEditing(null);
    setShowForm(false);
    setError('');
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Court name is required.'); return; }
    const res = editing
      ? await courtLogic.update(editing.id, { name: form.name, display_order: editing.display_order, status: editing.status })
      : await courtLogic.create(form);
    if (!res.ok) { setError(res.error); return; }
    toast.push(editing ? 'Court updated.' : 'Court created.', 'success');
    resetForm();
    await refresh();
  }, [form, editing, refresh, resetForm, toast]);

  const handleEdit = useCallback((court) => {
    setForm({ name: court.name });
    setEditing(court);
    setShowForm(true);
    setError('');
  }, []);

  const handleDelete = useCallback(async (court) => {
    if (!window.confirm(`Delete court "${court.name}"?`)) return;
    await courtLogic.remove(court.id);
    toast.push('Court deleted.', 'success');
    await refresh();
  }, [refresh, toast]);

  if (loading) return <div className="fade-in" style={{ display: 'grid', placeItems: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <PageHeader
        icon="folder"
        title="Court Types"
        subtitle="Manage court types used in case forms and filters."
        actions={(
          <button className="btn btn--primary" onClick={() => { resetForm(); setShowForm(true); }}>
            <Icon name="plus" size={15} /> Add Court
          </button>
        )}
      />

      {showForm && (
        <Card title={editing ? 'Edit Court' : 'New Court'} className="case-types__form">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert--danger" style={{ marginBottom: 14 }}>{error}</div>}
            <Field label="Name">
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
            </Field>
            <div className="toolbar-row" style={{ marginTop: 16 }}>
              <button className="btn btn--primary" type="submit">{editing ? 'Update' : 'Create'}</button>
              <button className="btn btn--ghost" type="button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      <Card bodyClass="card__body--flush">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order</th>
              <th style={{ width: 110 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.length === 0 ? (
              <tr><td className="court-types__empty" colSpan={3}>No court types found.</td></tr>
            ) : courts.map((court) => (
              <tr key={court.id}>
                <td style={{ fontWeight: 600 }}>{court.name}</td>
                <td style={{ color: 'var(--text-faint)' }}>{court.display_order}</td>
                <td>
                  <div className="row-actions">
                    <button className="iconbtn" title="Edit" onClick={() => handleEdit(court)}>
                      <Icon name="edit" size={15} />
                    </button>
                    <button className="iconbtn iconbtn--danger" title="Delete" onClick={() => handleDelete(court)}>
                      <Icon name="trash" size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <p className="muted" style={{ marginTop: 16, fontSize: 12.5 }}>
        {courtNames.length} court type(s) loaded. Courts are used in case forms and filters.
      </p>
    </div>
  );
}
