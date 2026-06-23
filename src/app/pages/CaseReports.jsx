import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { value: 342, label: 'Total Cases' },
  { value: 198, label: 'Active' },
  { value: 104, label: 'Disposed' },
  { value: 40, label: 'Pending' },
];

export default function CaseReports() {
  return (
    <div className="fade-in">
      <PageHeader icon="folder" title="Case Reports" subtitle="Case statistics, stage distribution, and disposal reports." />

      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <Card title="Case Statistics">
        <div className="empty">
          <div className="empty__icon"><Icon name="folder" size={24} /></div>
          <p className="muted">No case data available.</p>
        </div>
      </Card>

      <Card title="Case Distribution">
        <div className="empty">
          <div className="empty__icon"><Icon name="folder" size={24} /></div>
          <p className="muted">No case data available.</p>
        </div>
      </Card>
    </div>
  );
}
