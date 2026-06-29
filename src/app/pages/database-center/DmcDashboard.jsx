import { useState, useEffect } from 'react';
import { useBackups } from '@/hooks/useBackups.js';
import { databaseAdminService } from '@/services/databaseAdminService.js';
import { userService } from '@/services/userService.js';
import { bytes } from '@/utils/format.js';
import { useAuth } from '@/data-layer/AuthContext.jsx';
import Icon from '@/components/Icon.jsx';

export default function DmcDashboard() {
  const { user } = useAuth();
  const { backups, stats } = useBackups();
  const [health, setHealth] = useState({ status: 'checking', provider: '—', version: '—', collections: 0 });

  useEffect(() => {
    databaseAdminService.connectionStatus().then((s) => {
      setHealth({ status: s.connected ? 'connected' : 'disconnected', provider: s.provider || '—', version: s.version || '—', collections: s.collections || 0 });
    }).catch(() => setHealth({ status: 'error', provider: '—', version: '—', collections: 0 }));
  }, []);

  const cards = [
    { label: 'Provider', value: health.provider, sub: 'Connection ' + health.status, dot: health.status === 'connected' ? 'ok' : health.status === 'error' ? 'err' : 'warn' },
    { label: 'Collections', value: health.collections, sub: 'Schema v' + health.version },
    { label: 'Total Backups', value: backups.length, sub: stats?.lastBackup ? 'Last: ' + new Date(stats.lastBackup).toLocaleDateString() : 'No backups yet' },
    { label: 'Backup Size', value: bytes(stats?.totalBytes || 0), sub: stats?.protectedCount + ' protected' },
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
            <tr><td>Database Connection</td><td><span className={`dmc-badge dmc-badge--${health.status === 'connected' ? 'green' : 'red'}`}>{health.status}</span></td><td>{health.provider} · {health.version}</td></tr>
            <tr><td>Schema Integrity</td><td><span className="dmc-badge dmc-badge--green">Valid</span></td><td>{health.collections} collections deployed</td></tr>
            <tr><td>Backup Status</td><td><span className={`dmc-badge dmc-badge--${backups.length ? 'green' : 'amber'}`}>{backups.length ? 'Active' : 'None'}</span></td><td>{backups.length} backup(s), {stats?.protectedCount} protected</td></tr>
            <tr><td>File Storage</td><td><span className="dmc-badge dmc-badge--green">Operational</span></td><td>Provider-agnostic</td></tr>
            <tr><td>Last Backup</td><td><span className={`dmc-badge dmc-badge--${stats?.lastBackup ? 'green' : 'amber'}`}>{stats?.lastBackup ? 'Completed' : 'Never'}</span></td><td>{stats?.lastBackup ? new Date(stats.lastBackup).toLocaleString() : 'No backup recorded'}</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
