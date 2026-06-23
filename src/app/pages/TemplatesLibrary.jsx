import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { Input } from '@/components/Field.jsx';
import { templateLogic } from '@/logic/templateLogic.js';

export default function TemplatesLibrary() {
  const [templates, setTemplates] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, categories: 0, lastUpdated: 'N/A' });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([templateLogic.list(), templateLogic.stats()]).then(([t, s]) => {
      setTemplates(Array.isArray(t) ? t : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = templates.filter((t) => !search || (t.name || '').toLowerCase().includes(search.toLowerCase()) || (t.category || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Templates Library" icon="file-text" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.total}</span><span className="stat-card__label">Total Templates</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.active}</span><span className="stat-card__label">Active</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.categories}</span><span className="stat-card__label">Categories</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.lastUpdated}</span><span className="stat-card__label">Last Updated</span></div>
      </div>
      <Card title="Templates">
        <div className="search-row"><Input className="search-row__input" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="file-text" /><p>No templates yet.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Name</th><th>Category</th><th>Status</th><th>Last Updated</th></tr></thead>
            <tbody>{filtered.map((t) => (
              <tr key={t.id}><td>{t.name}</td><td><span className="badge badge--info">{t.category}</span></td><td><span className={`badge badge--${t.is_active !== false ? 'success' : 'muted'}`}>{t.is_active !== false ? 'Active' : 'Inactive'}</span></td><td>{t.last_updated || '-'}</td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
