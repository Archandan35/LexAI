import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Badge from '@/components/Badge.jsx';

export default function VersionControl() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="history"
        title="Version Control"
        subtitle="Track revisions and document versions."
      />

      <Card title="Version History">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Version</th>
                <th>Author</th>
                <th>Date</th>
                <th>Changes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="empty">
                    <div className="empty__icon"><Icon name="history" size={24} /></div>
                    <p className="muted">No version history yet.</p>
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
