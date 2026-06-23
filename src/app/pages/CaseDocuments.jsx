import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

const CATEGORIES = [
  'All Documents', 'Suits', 'Written Statements', 'Petitions',
  'Applications', 'Affidavits', 'Evidence', 'Orders', 'Judgments',
];

export default function CaseDocuments() {
  const [active, setActive] = useState('All Documents');

  return (
    <div className="fade-in">
      <PageHeader
        icon="folder"
        title="Case Documents"
        subtitle="Browse case documents organized by category."
      />

      <div className="docmgr">
        <aside className="docmgr__folders">
          <div className="docmgr__folders-head">
            <span>Categories</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`docmgr__folder ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              <Icon name="folder" size={15} />
              <span>{cat}</span>
            </button>
          ))}
        </aside>

        <div className="docmgr__main">
          <Card title={active}>
            <div className="empty">
              <div className="empty__icon"><Icon name="folder" size={24} /></div>
              <p className="muted">No documents uploaded yet.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
