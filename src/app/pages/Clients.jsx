import React, { useState } from 'react';
import CrudListPage from '@/components/CrudListPage.jsx';
import Field from '@/components/Field.jsx';
import { Input } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';
import { clientLogic } from '@/logic/clientLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

function ClientForm({ load, setShowForm }) {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', client_type: 'Individual' });
  const add = async () => {
    if (!form.name?.trim()) { toast.error('Name is required.'); return; }
    const r = await clientLogic.create(form);
    if (r && !r.error) { toast.success('Client added.'); setShowForm(false); setForm({ name: '', email: '', phone: '', client_type: 'Individual' }); load(); }
    else toast.error(r?.error || 'Failed to add client.');
  };
  return (
    <div className="card card--inset">
      <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
      <Field label="Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
      <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
      <Button onClick={add}>Save Client</Button>
    </div>
  );
}

export default function Clients() {
  const toast = useToast();
  return (
    <CrudListPage
      title="Clients"
      icon="users"
      logic={clientLogic}
      searchFields={['name']}
      emptyText="No clients yet."
      addLabel="Add Client"
      statsConfig={[
        { key: 'totalClients', label: 'Total Clients' },
        { key: 'activeMatters', label: 'Active Matters' },
        { key: 'pendingPayments', label: 'Pending Payments' },
        { key: 'newThisMonth', label: 'New This Month' },
      ]}
      columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Type', render: (c) => c.client_type },
        { header: 'Status', render: (c) => <span className={`badge badge--${c.status === 'Active' ? 'success' : 'muted'}`}>{c.status}</span> },
      ]}
      renderForm={(props) => <ClientForm {...props} />}
      renderRowActions={(item, load) => (
        <button className="btn-icon" onClick={async () => { await clientLogic.remove(item.id); toast.success('Client removed.'); load(); }} title="Remove"><Icon icon="trash-2" /></button>
      )}
    />
  );
}
