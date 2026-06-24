import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard.js';
import Icon from '@/components/Icon.jsx';
import Badge from '@/components/Badge.jsx';
import Spinner from '@/components/Spinner.jsx';
import EmptyState from '@/components/EmptyState.jsx';
import { formatDate } from '@/utils/format.js';
import { useAuth } from '@/data-layer/AuthContext.jsx';

/* ---- helpers ---- */
function today() {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function DonutChart({ segments, size = 120, stroke = 18 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2, cy = size / 2;
  let offset = 0;
  const total = segments.reduce((s, seg) => s + (seg.value || 0), 0) || 1;
  return (
    <svg width={size} height={size} className="dash-donut-svg" viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ;
        const gap = circ - dash;
        const el = (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dasharray 0.5s ease' }}
          />
        );
        offset += pct;
        return el;
      })}
      {/* centre label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--navy-900)">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="var(--text-faint)">Total Cases</text>
    </svg>
  );
}

function TaskDonut({ segments, total, size = 110, stroke = 16 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2, cy = size / 2;
  let offset = 0;
  const sum = segments.reduce((s, seg) => s + (seg.value || 0), 0) || 1;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const pct = seg.value / sum;
        const dash = pct * circ;
        const gap = circ - dash;
        const el = (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        );
        offset += pct;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--navy-900)">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="var(--text-faint)">Total Tasks</text>
    </svg>
  );
}

const HEARING_ICONS = ['blue', 'amber', 'green', 'navy', 'blue', 'amber'];

const QUICK_ACTIONS = [
  { icon: 'calendar', color: 'blue', title: 'Add New Case', sub: 'Create a new case', route: '/cases/create' },
  { icon: 'users', color: 'green', title: 'Add New Client', sub: 'Register a new client', route: '/clients' },
  { icon: 'upload', color: 'amber', title: 'Upload Document', sub: 'Add documents to case', route: '/documents' },
  { icon: 'calendar', color: 'red', title: 'Schedule Hearing', sub: 'Add new hearing date', route: '/cause-list' },
  { icon: 'check', color: 'purple', title: 'Create Task', sub: 'Create a new task', route: '/tasks' },
];

const DOC_COLORS = { pdf: 'pdf', docx: 'doc', doc: 'doc' };

function docIconVariant(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  return DOC_COLORS[ext] || 'other';
}

const BAR_COLORS = ['#6d4fe8', '#1f9d6b', '#e07b00', '#2547a3', '#888'];

export default function Dashboard() {
  const { data, loading } = useDashboard();
  const nav = useNavigate();
  const { user } = useAuth();

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  if (loading) return <Spinner label="Loading dashboard…" />;
  if (!data) return <EmptyState title="Could not load dashboard." />;

  const { stats, activeCases, recentDrafts, recentDocuments, upcomingHearings } = data;

  /* Build derived stats */
  const totalCases = stats.totalCases ?? 0;
  const activeCnt = stats.activeCases ?? 0;
  const closedCnt = Math.max(0, totalCases - activeCnt);
  const docsCnt = stats.documents ?? 0;
  const hearingsCnt = stats.hearings ?? 0;

  const donutSegments = [
    { label: 'Active', value: activeCnt, color: '#2547a3', pct: totalCases ? ((activeCnt / totalCases) * 100).toFixed(1) : 0 },
    { label: 'Closed', value: closedCnt, color: '#1f9d6b', pct: totalCases ? ((closedCnt / totalCases) * 100).toFixed(1) : 0 },
    { label: 'On Hold', value: 0, color: '#e07b00', pct: '0.0' },
    { label: 'Draft', value: stats.drafts ?? 0, color: '#d4d9e8', pct: '0.0' },
  ];

  const taskSegments = [
    { label: 'Due Today', value: 5, color: '#2547a3' },
    { label: 'Due This Week', value: 12, color: '#1f9d6b' },
    { label: 'Overdue', value: 6, color: '#d8453c' },
    { label: 'Completed', value: 5, color: '#d4d9e8' },
  ];
  const totalTasks = taskSegments.reduce((s, t) => s + t.value, 0);

  /* Category distribution bars */
  const categories = [
    { label: 'Criminal', value: 72 },
    { label: 'Civil', value: 38 },
    { label: 'Corporate', value: 24 },
    { label: 'Family', value: 16 },
    { label: 'Others', value: 10 },
  ];
  const maxCat = Math.max(...categories.map((c) => c.value));

  return (
    <div className="fade-in" style={{ paddingBottom: 40 }}>

      {/* ---- Greeting row ---- */}
      <div className="dash-greeting-row">
        <div>
          <h1 className="dash-greeting__title">{greeting}, {user?.name || 'Admin'} 👋</h1>
          <p className="dash-greeting__sub">Here's what's happening with your legal practice today.</p>
        </div>
        <div className="dash-greeting__actions">
          <div className="dash-date-badge">
            <Icon name="calendar" size={15} />
            <span>{today()}</span>
          </div>
          <button className="btn btn--primary" onClick={() => nav('/cases/create')}>
            <Icon name="plus" size={15} /> Add New
          </button>
        </div>
      </div>

      {/* ---- Stat row ---- */}
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat__icon-wrap dash-stat__icon-wrap--blue"><Icon name="vault" size={22} /></div>
          <div className="dash-stat__body">
            <div className="dash-stat__value">{totalCases}</div>
            <div className="dash-stat__label">Total Cases</div>
            <div className="dash-stat__trend dash-stat__trend--up">↑ 12% vs last month</div>
          </div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat__icon-wrap dash-stat__icon-wrap--green"><Icon name="folder" size={22} /></div>
          <div className="dash-stat__body">
            <div className="dash-stat__value">{activeCnt}</div>
            <div className="dash-stat__label">Active Cases</div>
            <div className="dash-stat__trend dash-stat__trend--up">↑ 8% vs last month</div>
          </div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat__icon-wrap dash-stat__icon-wrap--orange"><Icon name="check" size={22} /></div>
          <div className="dash-stat__body">
            <div className="dash-stat__value">{closedCnt}</div>
            <div className="dash-stat__label">Closed Cases</div>
            <div className="dash-stat__trend dash-stat__trend--up">↑ 15% vs last month</div>
          </div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat__icon-wrap dash-stat__icon-wrap--red"><Icon name="calendar" size={22} /></div>
          <div className="dash-stat__body">
            <div className="dash-stat__value">{hearingsCnt}</div>
            <div className="dash-stat__label">Hearings This Month</div>
            <div className="dash-stat__trend dash-stat__trend--down">↓ 5% vs last month</div>
          </div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat__icon-wrap dash-stat__icon-wrap--purple"><Icon name="file" size={22} /></div>
          <div className="dash-stat__body">
            <div className="dash-stat__value">{docsCnt}</div>
            <div className="dash-stat__label">Documents</div>
            <div className="dash-stat__trend dash-stat__trend--up">↑ 16% vs last month</div>
          </div>
        </div>
      </div>

      {/* ---- Row 1: Case Status | Upcoming Hearings | Task Summary ---- */}
      <div className="dash-grid-3">

        {/* Case Status Overview */}
        <div className="card">
          <div className="dash-card-head">
            <span className="dash-card-head__title">Case Status Overview</span>
            <Icon name="list" size={15} style={{ color: 'var(--text-faint)', cursor: 'pointer' }} />
          </div>
          <div className="dash-donut-wrap">
            <div className="dash-donut-row">
              <DonutChart segments={donutSegments} size={130} stroke={20} />
              <div className="dash-donut-legend">
                {donutSegments.map((s) => (
                  <div className="dash-donut-legend__item" key={s.label}>
                    <div className="dash-donut-legend__left">
                      <span className="dash-donut-legend__dot" style={{ background: s.color }} />
                      {s.label}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--navy-900)' }}>{s.value}</span>
                      <span className="dash-donut-legend__pct">({s.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Hearings */}
        <div className="card">
          <div className="dash-card-head">
            <span className="dash-card-head__title">Upcoming Hearings</span>
            <span className="dash-card-head__link" onClick={() => nav('/cause-list')}>View All <Icon name="arrow" size={13} /></span>
          </div>
          {upcomingHearings.length === 0 ? (
            <div style={{ padding: '20px 18px' }}>
              <EmptyState icon="calendar" title="No upcoming hearings." />
            </div>
          ) : upcomingHearings.slice(0, 5).map((h, i) => (
            <div className="dash-hearing-row" key={h.id} onClick={() => nav('/cause-list')}>
              <div className={`dash-hearing-icon dash-hearing-icon--${HEARING_ICONS[i % HEARING_ICONS.length]}`}>
                <Icon name="calendar" size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="dash-hearing__title">{h.purpose || 'Hearing'}</div>
                <div className="dash-hearing__sub">{h.caseTitle || h.purpose || '—'}</div>
              </div>
              <div className="dash-hearing__date-col">
                <div className="dash-hearing__date">{formatDate(h.date)}</div>
                <div className="dash-hearing__time">{h.time || '10:00 AM'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Summary */}
        <div className="card">
          <div className="dash-card-head">
            <span className="dash-card-head__title">Task Summary</span>
            <Icon name="list" size={15} style={{ color: 'var(--text-faint)', cursor: 'pointer' }} />
          </div>
          <div className="dash-task-wrap">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TaskDonut segments={taskSegments} total={totalTasks} size={120} stroke={18} />
            </div>
            <div className="dash-task-legend">
              {taskSegments.map((t) => (
                <div className="dash-task-legend__item" key={t.label}>
                  <div className="dash-task-legend__left">
                    <span className="dash-donut-legend__dot" style={{ background: t.color }} />
                    {t.label}
                  </div>
                  <span className="dash-task-legend__count">{t.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, textAlign: 'right' }}>
              <span className="dash-card-head__link" onClick={() => nav('/tasks')}>View All Tasks <Icon name="arrow" size={13} /></span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Row 2: Recent Cases | Category Distribution | Quick Actions ---- */}
      <div className="dash-grid-3">

        {/* Recent Cases */}
        <div className="card" style={{ gridColumn: '1 / 2' }}>
          <div className="dash-card-head">
            <span className="dash-card-head__title">Recent Cases</span>
            <span className="dash-card-head__link" onClick={() => nav('/cases')}>View All <Icon name="arrow" size={13} /></span>
          </div>
          {activeCases.length === 0 ? (
            <div style={{ padding: '20px 18px' }}><EmptyState icon="vault" title="No cases yet." /></div>
          ) : (
            <table className="dash-cases-table">
              <thead>
                <tr>
                  <th>Case Title</th>
                  <th>Case Number</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {activeCases.slice(0, 5).map((c) => (
                  <tr key={c.id} onClick={() => nav(`/cases/${c.id}`)}>
                    <td><span className="dash-case-title">{c.title || c.caseNumber}</span></td>
                    <td><span className="dash-case-num">{c.caseNumber}</span></td>
                    <td style={{ fontSize: 13, color: 'var(--text-soft)' }}>{c.client || '—'}</td>
                    <td><Badge tone={c.status === 'Active' ? 'green' : c.status === 'On Hold' ? 'amber' : 'grey'}>{c.status || 'Active'}</Badge></td>
                    <td style={{ fontSize: 12, color: 'var(--text-faint)' }}>{formatDate(c.updatedAt || c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Category Distribution */}
        <div className="card">
          <div className="dash-card-head">
            <span className="dash-card-head__title">Case Category Distribution</span>
            <span className="dash-card-head__link" onClick={() => nav('/reports')}>View Report <Icon name="arrow" size={13} /></span>
          </div>
          <div className="dash-bar-chart">
            <div className="dash-bars">
              {categories.map((cat, i) => (
                <div className="dash-bar-item" key={cat.label}>
                  <div className="dash-bar__val">{cat.value}</div>
                  <div className="dash-bar-track">
                    <div
                      className="dash-bar-fill"
                      style={{
                        height: `${(cat.value / maxCat) * 100}%`,
                        background: BAR_COLORS[i % BAR_COLORS.length],
                      }}
                    />
                  </div>
                  <div className="dash-bar__label">{cat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="dash-card-head">
            <span className="dash-card-head__title">Quick Actions</span>
          </div>
          <div className="dash-quick-actions">
            {QUICK_ACTIONS.map((qa) => (
              <div className="dash-qa-item" key={qa.title} onClick={() => nav(qa.route)}>
                <div className="dash-qa-item__left">
                  <div className={`dash-qa-icon dash-qa-icon--${qa.color}`}><Icon name={qa.icon} size={18} /></div>
                  <div>
                    <div className="dash-qa__title">{qa.title}</div>
                    <div className="dash-qa__sub">{qa.sub}</div>
                  </div>
                </div>
                <Icon name="chevron" size={15} style={{ color: 'var(--text-faint)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Recent Documents ---- */}
      <div>
        <div className="dash-card-head" style={{ border: 'none', padding: '0 0 14px', borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
          <span className="dash-card-head__title" style={{ fontSize: 16 }}>Recent Documents</span>
          <span className="dash-card-head__link" onClick={() => nav('/documents')}>View All <Icon name="arrow" size={13} /></span>
        </div>
        {recentDocuments.length === 0 ? (
          <EmptyState icon="file" title="No documents yet." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {recentDocuments.slice(0, 5).map((d) => {
              const variant = docIconVariant(d.name);
              return (
                <div className="dash-doc-row" key={d.id} onClick={() => nav('/documents')}>
                  <div className="dash-doc-icon-row">
                    <div className={`dash-doc-icon dash-doc-icon--${variant}`}><Icon name="file" size={18} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="dash-doc__name">{d.name}</div>
                      <div className="dash-doc__date">{formatDate(d.uploadedAt)}</div>
                    </div>
                  </div>
                  <div className="dash-doc__case">{d.folder || d.caseTitle || '—'}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}