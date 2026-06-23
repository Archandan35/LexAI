import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import { reminderService } from '@/services/reminderService.js';

export default function TasksAndReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reminderService.list().then((r) => setReminders(Array.isArray(r) ? r : [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const stats = {
    pending: reminders.filter((r) => !r.done).length,
    overdue: reminders.filter((r) => !r.done && new Date(r.date) < now).length,
    completedToday: reminders.filter((r) => r.done && new Date(r.updatedAt || r.updated_at).toDateString() === now.toDateString()).length,
    active: reminders.filter((r) => !r.done).length,
  };

  return (
    <div className="fade-in">
      <PageHeader icon="check" title="Tasks & Reminders" subtitle="Track case tasks, deadlines, and automated reminders." />

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="check" size={20} /></div>
          <div className="stat-card__value">{stats.pending}</div>
          <div className="stat-card__label">Pending Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="alert" size={20} /></div>
          <div className="stat-card__value">{stats.overdue}</div>
          <div className="stat-card__label">Overdue</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="grid" size={20} /></div>
          <div className="stat-card__value">{stats.completedToday}</div>
          <div className="stat-card__label">Completed Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon"><Icon name="bell" size={20} /></div>
          <div className="stat-card__value">{stats.active}</div>
          <div className="stat-card__label">Reminders Active</div>
        </div>
      </div>

      <Card title="My Tasks">
        {loading ? (
          <div className="empty"><span className="spinner" /></div>
        ) : reminders.length === 0 ? (
          <div className="empty">
            <Icon name="check" size={48} />
            <h3>No pending tasks.</h3>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr><th>Status</th><th>Title</th><th>Date</th><th>Type</th></tr>
              </thead>
              <tbody>
                {[...reminders].sort((a, b) => new Date(a.date) - new Date(b.date)).map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.done ? (
                        <span className="badge badge--green">Done</span>
                      ) : new Date(r.date) < now ? (
                        <span className="badge badge--red">Overdue</span>
                      ) : (
                        <span className="badge badge--amber">Pending</span>
                      )}
                    </td>
                    <td>{r.title}</td>
                    <td>{r.date}</td>
                    <td>{r.type}</td>
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
