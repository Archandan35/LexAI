import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { value: 12, label: 'Courts Active' },
  { value: 487, label: 'Cases Filed' },
  { value: 231, label: 'Cases Disposed' },
  { value: '4.2mo', label: 'Avg Disposal Time' },
];

export default function CourtReports() {
  return (
    <div className="fade-in">
      <PageHeader icon="folder" title="Court Reports" subtitle="Court-wise case distribution and performance." />

      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <Card title="Court Statistics">
        <div className="empty">
          <div className="empty__icon"><Icon name="folder" size={24} /></div>
          <p className="muted">No court data yet.</p>
        </div>
      </Card>
    </div>
  );
}
