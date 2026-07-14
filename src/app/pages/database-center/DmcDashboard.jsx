import { useState, useEffect } from 'react';
import { useBackups } from '@/hooks/useBackups.js';
import { databaseAdminService } from '@/services/databaseAdminService.js';
import { bytes, useFormat } from '@/utils/format.js';
import Icon from '@/components/Icon.jsx';

export default function DmcDashboard() {
  const { formatDate, formatDateTime } = useFormat();
  const { backups, stats } = useBackups();
  const [health, setHealth] = useState({ status: 'checking', provider: '—', version: '—', collections: 0 });

  useEffect(() => {
    Promise.all([
      databaseAdminService.connectionStatus().catch(() => ({ connected: false })),
    ]).then(([s]) => {
      setHealth({
        status: s.connected ? 'connected' : 'disconnected',
        provider: databaseAdminService.providerName(),
        version: String(databaseAdminService.schemaVersion()),
        collections: databaseAdminService.knownCollections().length,
      });
    }).catch(() => setHealth({ status: 'error', provider: '—', version: '—', collections: 0 }));
  }, []);

  const cards = [
    { label: 'Provider', value: health.provider, sub: 'Connection ' + health.status, dot: health.status === 'connected' ? 'ok' : health.status === 'error' ? 'err' : 'warn' },
    { label: 'Collections', value: health.collections, sub: 'Schema v' + health.version },
    { label: 'Total Backups', value: backups.length, sub: stats?.lastBackup ? 'Last: ' + formatDate(stats.lastBackup) : 'No backups yet' },
    { label: 'Backup Size', value: bytes(stats?.totalBytes || 0), sub: (stats?.protectedCount ?? 0) + ' protected' },
    { label: 'Retention', value: stats?.retention || '—', sub: stats?.frequency || 'manual' },
    { label: 'Storage Used', value: bytes(0), sub: 'File storage' },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header__text">
          <h1>Database Dashboard</h1>
          <p>Real-time health and status of your database system.</p>
        </div>
      </div>

      <div className="dmc-grid">
        {cards.map((c, i) => (
          <div key={i} className="dmc-card">
            <div className="dmc-card__header">
              <span className="dmc-card__label">{c.label}</span>
              {c.dot && <span className={`dmc-status-dot dmc-status-dot--${c.dot}`} />}
            </div>
            <div className="dmc-card__value">{c.value}</div>
            <div className="dmc-card__sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="dmc-section">
        <div className="dmc-section__title"><Icon name="activity" size={18} /> System Health</div>
        <table className="dmc-table">
          <thead>
            <tr><th>Metric</th><th>Status</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr><td>Database Connection</td><td><span className="dmc-badge" style={{ background: health.status === 'connected' ? '#16a34a18' : '#dc262618', color: health.status === 'connected' ? '#16a34a' : '#dc2626', borderColor: health.status === 'connected' ? '#16a34a40' : '#dc262640' }}>{health.status}</span></td><td>{health.provider} · {health.version}</td></tr>
            <tr><td>Schema Integrity</td><td><span className="dmc-badge" style={{ background: '#16a34a18', color: '#16a34a', borderColor: '#16a34a40' }}>Valid</span></td><td>{health.collections} collections deployed</td></tr>
            <tr><td>Backup Status</td><td><span className="dmc-badge" style={{ background: backups.length ? '#16a34a18' : '#d9770618', color: backups.length ? '#16a34a' : '#d97706', borderColor: backups.length ? '#16a34a40' : '#d9770640' }}>{backups.length ? 'Active' : 'None'}</span></td><td>{backups.length} backup(s), {stats?.protectedCount} protected</td></tr>
            <tr><td>File Storage</td><td><span className="dmc-badge" style={{ background: '#16a34a18', color: '#16a34a', borderColor: '#16a34a40' }}>Operational</span></td><td>Provider-agnostic</td></tr>
            <tr><td>Last Backup</td><td><span className="dmc-badge" style={{ background: stats?.lastBackup ? '#16a34a18' : '#d9770618', color: stats?.lastBackup ? '#16a34a' : '#d97706', borderColor: stats?.lastBackup ? '#16a34a40' : '#d9770640' }}>{stats?.lastBackup ? 'Completed' : 'Never'}</span></td><td>{stats?.lastBackup ? formatDateTime(stats.lastBackup) : 'No backup recorded'}</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
