import React, { useState, useRef, useEffect } from 'react';

const ACTIONS = [
  { id: 'single-add', label: 'Single Add', icon: 'plus' },
  { id: 'single-edit', label: 'Single Edit', icon: 'edit' },
  { id: 'single-delete', label: 'Single Delete', icon: 'trash' },
  { id: 'bulk-add', label: 'Bulk Add', icon: 'plus' },
  { id: 'bulk-edit', label: 'Bulk Edit', icon: 'edit' },
  { id: 'bulk-delete', label: 'Bulk Delete', icon: 'trash' },
  { id: 'bulk-import', label: 'Bulk Import', icon: 'upload' },
];

export default function CrudContextMenu({ open, onClose, onAction, entityLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="crud-menu" ref={ref}>
      <div className="crud-menu__head">{entityLabel}</div>
      {ACTIONS.map((a) => (
        <button key={a.id} type="button" className="crud-menu__item" onClick={() => { onAction(a.id); onClose(); }}>
          <span className={`crud-menu__icon crud-menu__icon--${a.id.startsWith('single') ? 'single' : 'bulk'}`}>
            {a.id === 'single-add' && '+'}
            {a.id === 'single-edit' && '\u270E'}
            {a.id === 'single-delete' && '\u2716'}
            {a.id === 'bulk-add' && '++'}
            {a.id === 'bulk-edit' && '\u270E\u270E'}
            {a.id === 'bulk-delete' && '\u2716\u2716'}
            {a.id === 'bulk-import' && '\u21E7'}
          </span>
          {a.label}
        </button>
      ))}
    </div>
  );
}
