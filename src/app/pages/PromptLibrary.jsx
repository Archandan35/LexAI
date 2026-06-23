import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Badge from '@/components/Badge.jsx';
import Icon from '@/components/Icon.jsx';

const STATS = [
  { value: 24, label: 'Total Prompts' },
  { value: 8, label: 'Drafting' },
  { value: 6, label: 'Research' },
  { value: 5, label: 'Review' },
  { value: 5, label: 'Custom' },
];

export default function PromptLibrary() {
  return (
    <div className="fade-in">
      <PageHeader icon="book" title="Prompt Library" subtitle="Manage reusable AI prompt templates." />

      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <Card title="Prompt Templates">
        <div className="datatable__search">
          <Icon name="search" size={16} />
          <input placeholder="Search prompts…" />
        </div>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Prompt Name</th>
                <th>Category</th>
                <th>Last Used</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  <div className="empty">
                    <div className="empty__icon"><Icon name="book" size={24} /></div>
                    <p className="muted">No prompts created yet.</p>
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
