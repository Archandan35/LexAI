import React from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';

export default function AiAssistant() {
  return (
    <div className="fade-in">
      <PageHeader icon="bolt" title="AI Assistant" subtitle="Your intelligent legal AI assistant." />

      <Card>
        <div className="ai-assistant__chat-area">
          <div className="empty">
            <div className="empty__icon"><Icon name="bolt" size={24} /></div>
            <p className="muted">No conversation yet.</p>
          </div>
        </div>
        <div className="input-row">
          <input className="input" placeholder="Ask the AI assistant…" />
          <button className="btn btn--primary"><Icon name="bolt" size={16} /> Send</button>
        </div>
      </Card>
    </div>
  );
}
