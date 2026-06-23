import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { Input } from '@/components/Field.jsx';
import { promptLogic } from '@/logic/promptLogic.js';

export default function PromptLibrary() {
  const [prompts, setPrompts] = useState([]);
  const [stats, setStats] = useState({ total: 0, categories: {}, categoryCount: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([promptLogic.list(), promptLogic.stats()]).then(([p, s]) => {
      setPrompts(Array.isArray(p) ? p : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = prompts.filter((p) => !search || (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.category || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Prompt Library" icon="terminal" />
      <div className="stats-row">
        <div className="stat-card"><span className="stat-card__value">{stats.total}</span><span className="stat-card__label">Total Prompts</span></div>
        {Object.entries(stats.categories).slice(0, 4).map(([cat, count]) => (
          <div key={cat} className="stat-card"><span className="stat-card__value">{count}</span><span className="stat-card__label">{cat}</span></div>
        ))}
      </div>
      <Card title="Prompts">
        <div className="search-row"><Input className="search-row__input" placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        {loading ? <p className="loading-text">Loading...</p> : filtered.length === 0 ? (
          <div className="empty-state"><Icon icon="terminal" /><p>No prompts yet.</p></div>
        ) : (
          <table className="data-table"><thead><tr><th>Prompt Name</th><th>Category</th><th>Last Used</th><th>Usage</th></tr></thead>
            <tbody>{filtered.map((p) => (
              <tr key={p.id}><td>{p.name}</td><td><span className="badge badge--info">{p.category}</span></td><td>{p.last_used || 'Never'}</td><td>{p.usage_count || 0}</td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
