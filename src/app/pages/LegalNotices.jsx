import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { Input } from '@/components/Field.jsx';
import Button from '@/components/Button.jsx';
import { legalNoticeLogic } from '@/logic/legalNoticeLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

const STATUS_TONE = { Draft: 'muted', Sent: 'info', Acknowledged: 'warning', Replied: 'success' };

export default function LegalNotices() {
  const [notices, setNotices] = useState([]);
  const [stats, setStats] = useState({ draft: 0, sent: 0, acknowledged: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ notice_number: '', recipient: '', date: '', content: '' });
  const toast = useToast();

  const load = () => {
    setLoading(true);
    Promise.all([legalNoticeLogic.list(), legalNoticeLogic.stats()]).then(([n, s]) => {
      setNotices(Array.isArray(n) ? n : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = notices.filter((n) => !search || (n.notice_number || '').toLowerCase().includes(search.toLowerCase()) || (n.recipient || '').toLowerCase().includes(search.toLowerCase()));

  const addNotice = async () => {
    if (!form.notice_number?.trim()) { toast.error('Notice number is required.'); return; }
    if (!form.recipient?.trim()) { toast.error('Recipient is required.'); return; }
    const r = await legalNoticeLogic.create(form);
    if (r && !r.error) { toast.success('Notice added.'); setShowForm(false); setForm({ notice_number: '', recipient: '', date: '', content: '' }); load(); }
    else toast.error(r?.error || 'Failed to add notice.');
  };

  return (
    <div>
      <PageHeader title="Legal Notices" icon="file-text" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.draft}</span><span className="stat-card__label">Draft</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.sent}</span><span className="stat-card__label">Sent</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.acknowledged}</span><span className="stat-card__label">Acknowledged</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.replied}</span><span className="stat-card__label">Replied</span></div>
      </div>
      <Card title="Notice Log">
        <div className="toolbar-row"><Input className="search-row__input" placeholder="Search notices..." value={search} onChange={(e) => setSearch(e.target.value)} /><Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add Notice'}</Button></div>
        {showForm && (
          <div className="card card--inset">
            <div className="field"><label>Notice No.</label><Input value={form.notice_number} onChange={(e) => setForm({ ...form, notice_number: e.target.value })} /></div>
            <div className="field"><label>Recipient</label><Input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} /></div>
            <div className="field"><label>Date</label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <Button onClick={addNotice}>Save Notice</Button>
          </div>
        )}
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="file-text" /><p>No notices yet.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Notice No.</th><th>Recipient</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{filtered.map((n) => (
              <tr key={n.id}><td>{n.notice_number}</td><td>{n.recipient}</td><td>{n.date}</td><td><span className={`badge badge--${STATUS_TONE[n.status] || 'muted'}`}>{n.status}</span></td>
                <td><button className="btn-icon" onClick={() => legalNoticeLogic.remove(n.id).then(load)} title="Remove"><Icon icon="trash-2" /></button></td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
