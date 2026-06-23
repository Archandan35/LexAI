import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Field from '@/components/Field.jsx';
import { Input } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import { contactLogic } from '@/logic/contactLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

const CONTACT_TYPES = ['Advocate', 'Judge', 'Court Staff', 'Client', 'Other'];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ totalContacts: 0, advocates: 0, judges: 0, courtStaff: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Advocate', phone: '', email: '', organization: '' });
  const toast = useToast();

  const load = () => {
    setLoading(true);
    Promise.all([contactLogic.list(), contactLogic.stats()]).then(([c, s]) => {
      setContacts(Array.isArray(c) ? c : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = contacts.filter((c) => !search || (c.name || '').toLowerCase().includes(search.toLowerCase()));

  const addContact = async () => {
    if (!form.name?.trim()) { toast.error('Name is required.'); return; }
    const r = await contactLogic.create(form);
    if (r && !r.error) { toast.success('Contact added.'); setShowForm(false); setForm({ name: '', type: 'Advocate', phone: '', email: '', organization: '' }); load(); }
    else toast.error(r?.error || 'Failed to add contact.');
  };

  const removeContact = async (id) => {
    await contactLogic.remove(id); toast.success('Contact removed.'); load();
  };

  return (
    <div>
      <PageHeader title="Contacts" icon="book" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.totalContacts}</span><span className="stat-card__label">Total Contacts</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.advocates}</span><span className="stat-card__label">Advocates</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.judges}</span><span className="stat-card__label">Judges</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.courtStaff}</span><span className="stat-card__label">Court Staff</span></div>
      </div>
      <Card title="Contact Directory">
        <div className="toolbar-row"><Input className="search-row__input" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} /><Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add Contact'}</Button></div>
        {showForm && (
          <div className="card card--inset">
            <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Type"><select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{CONTACT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></Field>
            <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Organization"><Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} /></Field>
            <Button onClick={addContact}>Save Contact</Button>
          </div>
        )}
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="book" /><p>No contacts yet.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Name</th><th>Type</th><th>Phone</th><th>Email</th><th>Organization</th><th>Actions</th></tr></thead>
            <tbody>{filtered.map((c) => (
              <tr key={c.id}><td>{c.name}</td><td><span className="badge badge--info">{c.type}</span></td><td>{c.phone}</td><td>{c.email}</td><td>{c.organization}</td>
                <td><button className="btn-icon" onClick={() => removeContact(c.id)} title="Remove"><Icon icon="trash-2" /></button></td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
