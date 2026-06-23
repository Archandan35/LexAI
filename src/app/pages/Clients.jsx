import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Field from '@/components/Field.jsx';
import { Input } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import { clientLogic } from '@/logic/clientLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({ totalClients: 0, activeMatters: 0, pendingPayments: 0, newThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', client_type: 'Individual' });
  const toast = useToast();

  const load = () => {
    setLoading(true);
    Promise.all([clientLogic.list(), clientLogic.stats()]).then(([c, s]) => {
      setClients(Array.isArray(c) ? c : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = clients.filter((c) => !search || (c.name || '').toLowerCase().includes(search.toLowerCase()));

  const addClient = async () => {
    if (!form.name?.trim()) { toast.error('Name is required.'); return; }
    const r = await clientLogic.create(form);
    if (r && !r.error) { toast.success('Client added.'); setShowForm(false); setForm({ name: '', email: '', phone: '', client_type: 'Individual' }); load(); }
    else toast.error(r?.error || 'Failed to add client.');
  };

  const removeClient = async (id) => {
    const r = await clientLogic.remove(id);
    if (r && !r.error) { toast.success('Client removed.'); load(); }
  };

  return (
    <div>
      <PageHeader title="Clients" icon="users" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.totalClients}</span><span className="stat-card__label">Total Clients</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.activeMatters}</span><span className="stat-card__label">Active Matters</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.pendingPayments}</span><span className="stat-card__label">Pending Payments</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.newThisMonth}</span><span className="stat-card__label">New This Month</span></div>
      </div>
      <Card title="Client Directory">
        <div className="toolbar-row"><Input className="search-row__input" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} /><Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add Client'}</Button></div>
        {showForm && (
          <div className="card card--inset"><Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Button onClick={addClient}>Save Client</Button></div>
        )}
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="users" /><p>No clients yet.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{filtered.map((c) => (
              <tr key={c.id}><td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.client_type}</td><td><span className={`badge badge--${c.status === 'Active' ? 'success' : 'muted'}`}>{c.status}</span></td>
                <td><button className="btn-icon" onClick={() => removeClient(c.id)} title="Remove"><Icon icon="trash-2" /></button></td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
