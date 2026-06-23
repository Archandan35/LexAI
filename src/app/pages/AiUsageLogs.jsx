import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { value: '1,482', label: 'Total Queries' },
  { value: '2.3M', label: 'Tokens Used' },
  { value: '1.8s', label: 'Avg Response Time' },
  { value: '47', label: 'Queries Today' },
];

export default function AiUsageLogs() {
  return (
    <div className="fade-in">
      <PageHeader icon="clock" title="AI Usage Logs" subtitle="Monitor AI assistant usage across the platform." />

      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <Card title="Usage Log">
        <div className="empty">
          <div className="empty__icon"><Icon name="clock" size={24} /></div>
          <p className="muted">No usage logs yet.</p>
        </div>
      </Card>
    </div>
  );
}
