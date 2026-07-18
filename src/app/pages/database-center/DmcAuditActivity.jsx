import { useState, useEffect } from 'react';
import { auditService } from '@/services/auditService.js';
import { useFormat } from '@/utils/format.js';
import Icon from '@/components/Icon.jsx';

export default function DmcAuditActivity() {
  const { formatDate } = useFormat();
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    auditService.list().then((all) => setLogs(Array.isArray(all) ? all : [])).catch(() => {});
  }, []);

  const filtered = logs.filter((l) => {
    if (filter !== 'all' && l.action !== filter && !l.action?.startsWith(filter)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (l.action || '').toLowerCase().includes(q) || (l.user || l.userName || '').toLowerCase().includes(q) || (l.module || '').toLowerCase().includes(q);
    }
    return true;
  });

  const actionColor = (action) => {
    if (!action) return 'navy';
    if (action.startsWith('backup')) return 'green';
    if (action.startsWith('restore')) return 'navy';
    if (action.startsWith('delete')) return 'red';
    if (action.startsWith('import')) return 'amber';
    return 'navy';
  };

  const counts = {
    all: logs.length,
    backup: logs.filter(l => l.action?.startsWith('backup')).length,
    restore: logs.filter(l => l.action?.startsWith('restore')).length,
    import: logs.filter(l => l.action?.startsWith('import')).length,
    export: logs.filter(l => l.action?.startsWith('export')).length,
    delete: logs.filter(l => l.action?.startsWith('delete')).length,
    user: logs.filter(l => l.action?.startsWith('user')).length,
    system: logs.filter(l => l.action?.startsWith('system') || (!l.action?.startsWith('backup') && !l.action?.startsWith('restore') && !l.action?.startsWith('import') && !l.action?.startsWith('export') && !l.action?.startsWith('delete') && !l.action?.startsWith('user'))).length,
  };

  const tabs = [
    { key: 'all', label: 'All Events', count: logs.length },
    { key: 'backup', label: 'Backup', count: counts.backup },
    { key: 'restore', label: 'Restore', count: counts.restore },
    { key: 'import', label: 'Import', count: counts.import },
    { key: 'export', label: 'Export', count: counts.export },
    { key: 'delete', label: 'Delete', count: counts.delete },
    { key: 'user', label: 'User', count: counts.user },
    { key: 'system', label: 'System', count: counts.system },
  ];

  return (
    <>
      <div className="dmc-db-hero dmc-db-hero--sm">
        <div className="dmc-db-hero__icon">
          <Icon name="activity" size={26} />
        </div>
        <div className="dmc-db-hero__text">
          <div className="dmc-db-hero__accent" />
          <h2>Audit & Activity</h2>
          <p>Track every database, backup, import, export, and delete operation.</p>
        </div>
      </div>

      <div className="dmc-db-section">
        <div className="dmc-db-section__head">
          <div className="dmc-db-section__title">
            <Icon name="activity" size={18} /> Activity Log
          </div>
          <div className="dmc-db-search">
            <Icon name="search" size={14} />
            <input placeholder="Search events…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="dmc-db-section__body" style={{ padding: 0 }}>
          <div style={{ display: 'flex', gap: 4, padding: '12px 20px', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                style={{ padding: '6px 14px', fontSize: 13, whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', borderRadius: 6, background: filter === t.key ? 'var(--bg-subtle)' : 'transparent', color: filter === t.key ? 'var(--text)' : 'var(--text-soft)', fontWeight: filter === t.key ? 600 : 400 }}
              >{t.label} <span style={{ color: 'var(--text-faint)', marginLeft: 4 }}>{t.count}</span></button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ marginBottom: 8, opacity: 0.4 }}><Icon name="activity" size={32} /></div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No events found</div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>Try a different filter or search term.</div>
            </div>
          ) : (
            <>
              <div className="dmc-db-table-wrap">
                <table className="dmc-db-table">
                  <thead>
                    <tr><th>Action</th><th>User</th><th>Module</th><th>Date</th><th>Details</th></tr>
                  </thead>
                  <tbody>
                    {filtered.slice(0, 100).map((l, i) => (
                      <tr key={l.id || i}>
                        <td><span className={`dmc-badge dmc-badge--${actionColor(l.action)}`}>{l.action || '—'}</span></td>
                        <td>{l.user || l.userName || 'system'}</td>
                        <td>{l.module || '—'}</td>
                        <td>{formatDate(l.createdAt || l.created_at || l.timestamp)}</td>
                        <td className="dmc-cell-truncate">{l.details || l.description || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ textAlign: 'right', padding: '10px 20px', fontSize: 13, color: 'var(--text-soft)', borderTop: '1px solid var(--border)' }}>
                Showing {Math.min(filtered.length, 100)} of {filtered.length} event(s)
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
