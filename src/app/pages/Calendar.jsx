import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { hearingsRepository } from '@/data-layer/repositories/hearingsRepository.js';
import { reminderService } from '@/services/reminderService.js';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      hearingsRepository.getAll().catch(() => []),
      reminderService.list().catch(() => []),
    ]).then(([hearings, reminders]) => {
      const h = (Array.isArray(hearings) ? hearings : []).map((h) => ({ ...h, eventType: 'hearing', title: h.title || h.caseName || 'Hearing' }));
      const r = (Array.isArray(reminders) ? reminders : []).map((r) => ({ ...r, eventType: 'reminder', title: r.title || 'Reminder' }));
      setEvents([...h, ...r]);
    }).finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const hearings = events.filter((e) => e.eventType === 'hearing');

  return (
    <div className="fade-in">
      <PageHeader icon="calendar" title="Calendar" subtitle="Manage court dates, hearings, and events." />

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="mic" size={20} /></div>
          <div className="stat-card__value">{hearings.length}</div>
          <div className="stat-card__label">Upcoming Hearings</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="clock" size={20} /></div>
          <div className="stat-card__value">{upcoming.length}</div>
          <div className="stat-card__label">Upcoming Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="calendar" size={20} /></div>
          <div className="stat-card__value">{0}</div>
          <div className="stat-card__label">Free Days</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="grid" size={20} /></div>
          <div className="stat-card__value">{events.length}</div>
          <div className="stat-card__label">Total Events</div>
        </div>
      </div>

      <Card title="Upcoming Events">
        {loading ? (
          <div className="empty"><span className="spinner" /></div>
        ) : events.length === 0 ? (
          <div className="empty">
            <Icon name="calendar" size={48} />
            <h3>No upcoming events scheduled.</h3>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr><th>Type</th><th>Title</th><th>Date</th><th>Case</th></tr>
              </thead>
              <tbody>
                {[...upcoming].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 20).map((e) => (
                  <tr key={e.id}>
                    <td><span className={`badge ${e.eventType === 'hearing' ? 'badge--navy' : 'badge--amber'}`}>{e.eventType}</span></td>
                    <td>{e.title}</td>
                    <td>{e.date}</td>
                    <td>{e.caseId || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
