import { useState, useMemo } from 'react';
import Icon from './Icon.jsx';
import Badge from './Badge.jsx';
import EmptyState from './EmptyState.jsx';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { stripHtml, useFormat } from '@/utils/format.js';

// HearingHistoryView — reusable hearing timeline + card view used by both the
// Manage Case "Hearings" tab (mirrors the Order Sheet > Case History design)
// and the "History" tab. Fully responsive across desktop, tablet and mobile.
// Props:
//   hearings        : array of hearing records (id, date, status, purpose, notes, nextHearingDate)
//   onEdit(hearing) : optional — opens the hearing in the edit modal from the preview
//   getStatusStyle  : (status) => { bg, text, border, dot }  (colour tokens)
//   emptyTitle / emptyIcon
export default function HearingHistoryView({
  hearings = [],
  onEdit,
  getStatusStyle,
  emptyTitle = 'No hearings recorded.',
  emptyIcon = 'calendar',
}) {
  const { formatDate } = useFormat();
  const [view, setView] = useState('timeline'); // timeline | card
  const [sortDir, setSortDir] = useState('desc'); // desc = newest first
  const [statusFilter, setStatusFilter] = useState('');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState(null);

  const styleFor = (status) => {
    if (getStatusStyle) return getStatusStyle(status);
    return { bg: '#f1f3f5', text: '#495057', border: '#dee2e6', dot: '#868e96' };
  };

  const statusOptions = useMemo(() => {
    const set = new Set();
    (hearings || []).forEach((h) => h.status && set.add(h.status));
    return [...set];
  }, [hearings]);

  const visible = useMemo(() => {
    let list = [...(hearings || [])];
    if (statusFilter) list = list.filter((h) => h.status === statusFilter);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((h) =>
        `${h.purpose || ''} ${stripHtml(h.notes || '')} ${h.status || ''}`.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return sortDir === 'desc' ? tb - ta : ta - tb;
    });
    return list;
  }, [hearings, statusFilter, query, sortDir]);

  const openPreview = (h) => setPreview(h);

  if (!hearings || hearings.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} />;
  }

  return (
    <div className="hh-view">
      {/* View mode toggle (Timeline / Cards) */}
      <div className="hh-view__toggle">
        <button
          type="button"
          className={`hh-view__toggle-btn ${view === 'timeline' ? 'active' : ''}`}
          onClick={() => setView('timeline')}
        >
          <Icon name="activity" size={14} /> Timeline
        </button>
        <button
          type="button"
          className={`hh-view__toggle-btn ${view === 'card' ? 'active' : ''}`}
          onClick={() => setView('card')}
        >
          <Icon name="grid" size={14} /> Cards
        </button>
      </div>

      {view === 'timeline' ? (
        /* Mirrors the Order Sheet > Case History vertical timeline exactly */
        <div className="order-sheet__timeline-v-container">
          <div className="order-sheet__timeline-v-line-path" />
          {visible.map((h, i) => {
            const markerClass = (h.status || '').toLowerCase() || 'default';
            const st = styleFor(h.status);
            return (
              <div className="order-sheet__timeline-v-row" key={h.id || i}>
                <div className="order-sheet__timeline-v-node-col">
                  <div
                    className={`order-sheet__timeline-v-circle order-sheet__timeline-v-circle--${markerClass}`}
                    style={{ borderColor: st.dot, color: st.dot }}
                  >
                    {h.status === 'Completed' ? <Icon name="check" size={13} /> : <Icon name="clock" size={13} />}
                  </div>
                </div>
                <div className="order-sheet__timeline-v-connector" />
                <div className="order-sheet__timeline-v-title-col">
                  <h4 className="order-sheet__timeline-v-event-title">{h.purpose || 'Hearing'}</h4>
                  <span className="order-sheet__timeline-v-event-date">{formatDate(h.date)}</span>
                </div>
                <div className="order-sheet__timeline-v-desc-col">
                  <div className="order-sheet__timeline-v-desc">{stripHtml(h.notes || '—')}</div>
                </div>
                <div className="order-sheet__timeline-v-action-col">
                  <button className="order-sheet__timeline-v-btn" onClick={() => openPreview(h)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {/* Card view sort / filter toolbar */}
          <div className="hh-view__toolbar">
            <div className="hh-view__search">
              <Icon name="search" size={15} />
              <input
                value={query}
                placeholder="Search proceedings…"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              className="hh-view__select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              className="hh-view__select"
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value)}
            >
              <option value="desc">Last Update (Newest)</option>
              <option value="asc">Last Update (Oldest)</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <EmptyState icon="search" title="No hearings match the filter." />
          ) : (
            <div className="hh-view__cards">
              {visible.map((h, i) => {
                const st = styleFor(h.status);
                return (
                  <div className="hh-view__card" key={h.id || i}>
                    <div className="hh-view__card-top">
                      <div className="hh-view__card-date">
                        <Icon name="calendar" size={13} />
                        <span>{formatDate(h.date)}</span>
                      </div>
                      {h.status && (
                        <span
                          className="hh-view__status badge--dyn"
                          style={{ '--bd-bg': st.bg, '--bd-color': st.text, '--bd-border': st.border }}
                        >
                          <span className="cl-card__badge-dot sync__dot--dyn" style={{ '--dot-bg': st.dot }} />
                          {h.status}
                        </span>
                      )}
                    </div>
                    <h4 className="hh-view__card-title">{h.purpose || 'Hearing'}</h4>
                    {h.notes && <div className="hh-view__card-desc">{stripHtml(h.notes)}</div>}
                    {h.nextHearingDate && (
                      <div className="hh-view__card-next">
                        <Icon name="calendar" size={12} />
                        <span>Next: {formatDate(h.nextHearingDate)}</span>
                      </div>
                    )}
                    <div className="hh-view__card-actions">
                      <button className="hh-view__card-btn" onClick={() => openPreview(h)}>
                        <Icon name="eye" size={14} /> View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Read-only proceedings preview — shows only the text entered in the editor field */}
      {preview && (
        <Modal
          open
          title={`${preview.purpose || 'Hearing'} — ${formatDate(preview.date)}`}
          onClose={() => setPreview(null)}
          footer={(
            <>
              {onEdit && (
                <Button variant="ghost" onClick={() => { setPreview(null); onEdit(preview); }}>
                  Edit
                </Button>
              )}
              <Button variant="ghost" onClick={() => setPreview(null)}>Close</Button>
            </>
          )}
        >
          <div className="hh-view__preview">
            {preview.status && (
              <div className="hh-view__preview-status">
                <Badge dot>{preview.status}</Badge>
              </div>
            )}
            <div className="hh-view__preview-text">
              {stripHtml(preview.notes) ? stripHtml(preview.notes) : 'No proceedings recorded.'}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
