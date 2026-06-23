import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { Input } from '@/components/Field.jsx';
import { actLogic } from '@/logic/actLogic.js';

export default function ActLibrary() {
  const [acts, setActs] = useState([]);
  const [stats, setStats] = useState({ totalActs: 0, totalSections: 0, totalAmendments: 0, lastUpdated: 'N/A' });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([actLogic.list(), actLogic.stats()]).then(([a, s]) => {
      setActs(Array.isArray(a) ? a : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = acts.filter((a) => !search || (a.title || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Acts Library" icon="book" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.totalActs}</span><span className="stat-card__label">Acts</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.totalSections.toLocaleString()}</span><span className="stat-card__label">Sections</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.totalAmendments}</span><span className="stat-card__label">Amendments</span></div>
        <div className="stat-card"><span className="stat-card__value">{stats.lastUpdated}</span><span className="stat-card__label">Last Updated</span></div>
      </div>
      <Card title="Acts">
        <div className="search-row"><Input className="search-row__input" placeholder="Search acts..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="book" /><p>No acts found.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Title</th><th>Type</th><th>Jurisdiction</th><th>Sections</th><th>Amendments</th></tr></thead>
            <tbody>{filtered.map((a) => (
              <tr key={a.id}><td>{a.title}</td><td><span className="badge badge--info">{a.act_type || '-'}</span></td><td>{a.jurisdiction || '-'}</td><td>{a.sections_count || 0}</td><td>{a.amendments_count || 0}</td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
