import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Badge from '@/components/Badge.jsx';

const STATS = [
  { label: 'Total Judgments', value: '24,580', icon: 'database' },
  { label: 'Supreme Court', value: '8,340', icon: 'shield' },
  { label: 'High Courts', value: '14,200', icon: 'layers' },
  { label: 'Tribunals', value: '2,040', icon: 'grid' },
];

export default function JudgmentLibrary() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="database"
        title="Judgment Library"
        subtitle="Browse and search archived judgments."
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
        <input placeholder="Search by case name, citation, court…" />
      </div>

      <Card title="Judgments">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Case Name</th>
                <th>Court</th>
                <th>Date</th>
                <th>Citation</th>
                <th>Bench</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="empty">
                    <div className="empty__icon"><Icon name="database" size={24} /></div>
                    <p className="muted">No judgments indexed yet.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
