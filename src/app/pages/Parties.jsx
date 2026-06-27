import React, { useState, useCallback } from 'react';
import { useParties } from '@/hooks/useParties.js';
import { partyLogic } from '@/logic/partyLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import { Input, Select } from '@/components/Field.jsx';
import Icon from '@/components/Icon.jsx';
import CrudManager from '@/components/CrudManager.jsx';

export default function Parties() {
  const { parties, loading, refresh } = useParties();
  const toast = useToast();
  const [crudOpen, setCrudOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filtered = parties.filter((p) => !filter || p.toLowerCase().includes(filter.toLowerCase()));

  const partyConfig = {
    logic: partyLogic,
    fields: [
      { key: 'name', label: 'Party Name', placeholder: 'e.g. Appellant' },
      { key: 'short_code', label: 'Short Code', placeholder: 'e.g. APP' },
    ],
    defaults: {},
    refresh,
  };

  return (
    <div className="page">
      <PageHeader
        title="Parties"
        actions={<button className="btn btn--primary" onClick={() => setCrudOpen(true)}><Icon name="plus" size={15} /> Manage Parties</button>}
      />
      <Card>
        <div style={{ marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Input placeholder="Search parties…" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 260 }} />
          <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{parties.length} parties</span>
        </div>
        {loading ? (
          <p style={{ color: 'var(--text-soft)', padding: 20 }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-soft)', padding: 20 }}>No parties found. Click "Manage Parties" to add.</p>
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
      <CrudManager open={crudOpen} onClose={() => { setCrudOpen(false); refresh(); }} entity="Party" config={partyConfig} />
    </div>
  );
}
