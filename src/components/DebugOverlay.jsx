import { useState } from 'react';
import { useLogCapture } from '@/components/DebugPanel.jsx';
import { DateEngine } from '@/core/DateEngine.js';

export default function DebugOverlay() {
  const { logs, clearLogs, copyLogs } = useLogCapture();
  const [open, setOpen] = useState(false);
  const hasError = logs.some((l) => l.level === 'error');

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Debug overlay"
        className={`debug-overlay__toggle-btn${hasError ? ' has-error' : ''}`}
      >
        {hasError ? '!' : '🐛'}
      </button>
    );
  }

  return (
    <div className="debug-overlay__panel">
      <div className="debug-overlay__header">
        <span className="debug-overlay__title">Debug ({logs.length})</span>
        {hasError && <span className="debug-overlay__error-badge">⚠ ERRORS</span>}
        <div className="debug-overlay__header-actions">
          <button onClick={copyLogs} className="debug-overlay__action-btn">Copy</button>
          <button onClick={clearLogs} className="debug-overlay__action-btn">Clear</button>
          <button onClick={() => setOpen(false)} className="debug-overlay__action-btn">Close</button>
        </div>
      </div>
      <div className="debug-overlay__log-area">
        {logs.length === 0 && <span className="debug-overlay__empty-msg">No logs captured.</span>}
        {logs.map((l, i) => (
          <div key={i} className={`debug-log-line debug-log-line--${l.level === 'error' ? 'error' : l.level === 'warn' ? 'warn' : 'info'}`}>
            <span className="debug-overlay__timestamp">{DateEngine.formatTime(l.t)}</span>
            [{l.level.toUpperCase()}] {l.msg}
          </div>
        ))}
      </div>
    </div>
  );
}


