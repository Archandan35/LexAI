import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { label: 'Saved Precedents', value: '47', icon: 'star' },
  { label: 'Tags', value: '12', icon: 'bookmark' },
  { label: 'Recently Added', value: '5', icon: 'clock' },
  { label: 'Favorites', value: '8', icon: 'star' },
];

export default function PrecedentVault() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="star"
        title="Precedent Vault"
        subtitle="Save, tag and organize important judgments."
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
        <input placeholder="Search precedents…" />
      </div>

      <Card title="Saved Precedents">
        <div className="empty">
          <div className="empty__icon"><Icon name="star" size={24} /></div>
          <p className="muted">No precedents saved yet.</p>
        </div>
      </Card>
    </div>
  );
}
