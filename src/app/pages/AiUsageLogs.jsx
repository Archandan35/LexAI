import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { auditLogsRepository } from '@/data-layer/repositories/auditLogsRepository.js';

export default function AiUsageLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditLogsRepository.getAll()
      .then((all) => {
        const aiLogs = (Array.isArray(all) ? all : []).filter((l) => l.module === 'ai');
        setLogs(aiLogs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalTokens = logs.reduce((s, l) => s + (l.tokens || 0), 0);
  const totalTime = logs.reduce((s, l) => s + (l.responseTime || 0), 0);
  const todayLogs = logs.filter(
    (l) => new Date(l.at || l.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div>
      <PageHeader icon="clock" title="AI Usage Logs" subtitle="Monitor AI assistant usage across the platform." />
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-card__value">{logs.length.toLocaleString()}</span>
          <span className="stat-card__label">Total Queries</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{(totalTokens / 1000).toFixed(1)}K</span>
          <span className="stat-card__label">Tokens Used</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{logs.length > 0 ? (totalTime / logs.length / 1000).toFixed(1) : '0'}s</span>
          <span className="stat-card__label">Avg Response Time</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{todayLogs.length}</span>
          <span className="stat-card__label">Queries Today</span>
        </div>
      </div>
      <Card title="Usage Log">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : logs.length === 0 ? (
          <div className="empty-state">
            <Icon name="clock" size={24} />
            <p>No AI usage recorded yet.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Query</th>
                <th>Tokens</th>
                <th>Time</th>
                <th>Model</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {[...logs]
                .sort((a, b) => new Date(b.at || b.timestamp) - new Date(a.at || a.timestamp))
                .slice(0, 50)
                .map((l) => (
                  <tr key={l.id}>
                    <td>{l.userName || l.user || '-'}</td>
                    <td>{(l.details || l.query || '').slice(0, 60)}</td>
                    <td>{l.tokens || '-'}</td>
                    <td>{l.responseTime ? `${(l.responseTime / 1000).toFixed(1)}s` : '-'}</td>
                    <td>{l.model || '-'}</td>
                    <td>{l.at || l.timestamp || ''}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
