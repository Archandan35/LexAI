import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { label: 'Total Templates', value: '24', icon: 'copy' },
  { label: 'Active Templates', value: '18', icon: 'check' },
  { label: 'Categories', value: '6', icon: 'layers' },
  { label: 'Last Updated', value: 'Today', icon: 'clock' },
];

export default function TemplatesLibrary() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="copy"
        title="Templates Library"
        subtitle="Browse and manage reusable document templates and clause libraries."
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
        <input placeholder="Search templates…" />
      </div>

      <Card title="Templates">
        <div className="empty">
          <div className="empty__icon"><Icon name="copy" size={24} /></div>
          <p className="muted">No templates created yet.</p>
        </div>
      </Card>
    </div>
  );
}
