import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

export default function DocumentArchive() {
  return (
    <div className="fade-in">
      <PageHeader
        icon="folder"
        title="Document Archive"
        subtitle="Browse archived documents and drafts."
      />

      <div className="datatable__search">
        <Icon name="search" size={15} />
        <input placeholder="Search archived documents…" />
      </div>

      <Card title="Archive">
        <div className="empty">
          <div className="empty__icon"><Icon name="folder" size={24} /></div>
          <p className="muted">No archived files.</p>
        </div>
      </Card>
    </div>
  );
}
