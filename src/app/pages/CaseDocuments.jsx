import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { documentsRepository } from '@/data-layer/repositories/documentsRepository.js';

const CATEGORIES = ['All Documents', 'Suits', 'Written Statements', 'Petitions', 'Applications', 'Affidavits', 'Evidence', 'Orders', 'Judgments'];

export default function CaseDocuments() {
  const [active, setActive] = useState('All Documents');
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    documentsRepository.getAll().then(setDocs).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = docs.filter((d) => {
    const matchCat = active === 'All Documents' || d.category === active;
    const matchSearch = !search || (d.name || d.title || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fade-in">
      <PageHeader icon="folder" title="Case Documents" subtitle="Browse case documents organized by category." />

      <div className="docmgr">
        <aside className="docmgr__folders">
          <div className="docmgr__folders-head"><span>Categories</span></div>
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`docmgr__folder ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
              <Icon name={cat === 'All Documents' ? 'folder' : 'folder'} size={15} />
              <span>{cat}</span>
            </button>
          ))}
        </aside>

        <div className="docmgr__main">
          <Card title={active}>
            <div className="search-row">
              <input className="search-row__input input" placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {loading ? (
              <div className="empty"><span className="spinner" /></div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty__icon"><Icon name="folder" size={24} /></div>
                <p className="muted">No {active === 'All Documents' ? 'documents' : active.toLowerCase()} yet.</p>
              </div>
            ) : (
              <div className="table-scroll">
                <table className="table">
                  <thead>
                    <tr><th>Name</th><th>Category</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d.id}>
                        <td><Icon name="file" size={15} /> {d.name || d.title || 'Untitled'}</td>
                        <td><span className="badge badge--navy">{d.category}</span></td>
                        <td>{d.created_at || d.uploadedAt || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
