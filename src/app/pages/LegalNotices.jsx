import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Badge from '@/components/Badge.jsx';

const STATS = [
  { label: 'Draft Notices', value: '7', icon: 'doc' },
  { label: 'Sent', value: '12', icon: 'upload' },
  { label: 'Acknowledged', value: '8', icon: 'check' },
  { label: 'Replied', value: '5', icon: 'share' },
];

const STATUS_TONE = { Sent: 'amber', Acknowledged: 'green', Draft: 'amber', Replied: 'green' };

export default function LegalNotices() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="doc"
        title="Legal Notices"
        subtitle="Generate and track legal notices."
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

      <div className="toolbar-row">
        <div className="datatable__search">
          <Icon name="search" size={15} />
          <input placeholder="Search notices…" />
        </div>
        <div className="card__spacer" />
        <button className="btn btn--primary"><Icon name="plus" size={16} /> Add Notice</button>
      </div>

      <Card title="Notice Log">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Notice No.</th>
                <th>Recipient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="empty">
                    <div className="empty__icon"><Icon name="doc" size={24} /></div>
                    <p className="muted">No legal notices generated yet.</p>
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
