import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { label: 'Total Acts', value: '128', icon: 'book' },
  { label: 'Sections', value: '4,256', icon: 'layers' },
  { label: 'Amendments', value: '340', icon: 'edit' },
  { label: 'Last Updated', value: 'Today', icon: 'clock' },
];

export default function ActLibrary() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="book"
        title="Act Library"
        subtitle="Browse statutes and acts with sections."
      />

      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__icon"><Icon name={s.icon} size={20} /></div>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="datatable__search">
        <Icon name="search" size={15} />
        <input placeholder="Search acts…" />
      </div>

      <Card title="Acts">
        <div className="empty">
          <div className="empty__icon"><Icon name="book" size={24} /></div>
          <p className="muted">No acts loaded yet.</p>
        </div>
      </Card>
    </div>
  );
}
