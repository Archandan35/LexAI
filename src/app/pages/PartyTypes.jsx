import React, { useState, useCallback } from 'react';
import { usePartyTypes } from '@/hooks/usePartyTypes.js';
import { partyTypeLogic } from '@/logic/partyTypeLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import { Input, Select } from '@/components/Field.jsx';
import Icon from '@/components/Icon.jsx';
import CrudManager from '@/components/CrudManager.jsx';

export default function PartyTypes() {
  const { partyTypes, loading, refresh } = usePartyTypes();
  const toast = useToast();
  const [crudOpen, setCrudOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filtered = partyTypes.filter((p) => !filter || p.toLowerCase().includes(filter.toLowerCase()));

  const partyTypeConfig = {
    logic: partyTypeLogic,
    fields: [
      { key: 'name', label: 'Party Type Name', placeholder: 'e.g. Appellant' },
      { key: 'short_code', label: 'Short Code', placeholder: 'e.g. APP' },
    ],
    defaults: {},
    refresh,
  };

  return (
    <div className="page">
      <PageHeader
        title="Party Types"
        actions={<button className="btn btn--primary" onClick={() => setCrudOpen(true)}><Icon name="plus" size={15} /> Manage Party Types</button>}
      />
      <Card>
        <div style={{ marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Input placeholder="Search party types…" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 260 }} />
          <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{partyTypes.length} party types</span>
        </div>
        {loading ? (
          <p style={{ color: 'var(--text-soft)', padding: 20 }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-soft)', padding: 20 }}>No party types found. Click "Manage Party Types" to add.</p>
        ) : (
          <table className="case-types__table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((name) => (
                <tr key={name}>
                  <td><span className="case-types__name">{name}</span></td>
                  <td><span style={{ fontSize: 12, color: 'var(--text-faint)' }}>—</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <CrudManager open={crudOpen} onClose={() => { setCrudOpen(false); refresh(); }} entity="Party Type" config={partyTypeConfig} />
    </div>
  );
}
