import React, { useState, useMemo, useCallback } from 'react';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { bytes, formatDate } from '@/utils/format.js';

function fileExt(name = '') {
  return (name.split('.').pop() || '').toUpperCase();
}

function FileTypeIcon({ name }) {
  const ext = fileExt(name);
  const map = {
    PDF: { bg: '#fef2f2', color: '#dc2626', label: 'PDF' },
    DOCX: { bg: '#eff6ff', color: '#2563eb', label: 'W' },
    DOC: { bg: '#eff6ff', color: '#2563eb', label: 'W' },
    XLSX: { bg: '#f0fdf4', color: '#16a34a', label: 'XL' },
    XLS: { bg: '#f0fdf4', color: '#16a34a', label: 'XL' },
  };
  const cfg = map[ext] || { bg: 'var(--brand-soft)', color: 'var(--navy-700)', label: ext.slice(0, 2) || '?' };
  return (
    <span className="cdoc__type-icon" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function ExtBadge({ name }) {
  const ext = fileExt(name);
  return <span className="cdoc__badge">{ext}</span>;
}

export default function CaseDocTab({ caseId, caseNumber, folders, documents, onChanged }) {
  const [activeFolder, setActiveFolder] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [viewMode, setViewMode] = useState('list');
  const [search, setSearch] = useState('');

  const rootFolder = useMemo(() => {
    const name = caseNumber;
    return folders.find((f) => f.name === name && !f.parent_id) || null;
  }, [folders, caseNumber]);

  const rootFolders = useMemo(() => {
    if (rootFolder) return [rootFolder];
    // fallback: show all root document folders
    return folders.filter((f) => !f.parent_id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [rootFolder, folders]);

  const getChildren = useCallback((parentId) =>
    folders.filter((f) => f.parent_id === parentId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    , [folders]);

  const docCounts = useMemo(() => {
    const m = {};
    documents.forEach((d) => { m[d.folder] = (m[d.folder] || 0) + 1; });
    return m;
  }, [documents]);

  const sorted = useMemo(() => {
    if (!activeFolder) return [];
    const folderName = folders.find((f) => f.id === activeFolder)?.name;
    const arr = documents.filter((d) => d.folder === folderName);
    if (search) arr.filter((d) => (d.name || '').toLowerCase().includes(search.toLowerCase()));
    return arr;
  }, [activeFolder, documents, folders, search]);

  const isFileView = activeFolder && getChildren(activeFolder).length === 0;

  const breadcrumbPath = useMemo(() => {
    if (!activeFolder) return [];
    const path = [];
    let current = folders.find((f) => f.id === activeFolder);
    while (current) {
      path.unshift(current);
      current = current.parent_id ? folders.find((f) => f.id === current.parent_id) : null;
    }
    return path;
  }, [activeFolder, folders]);

  function renderTree(list, depth = 0) {
    return list.map((f, i) => {
      const isLast = i === list.length - 1;
      const children = getChildren(f.id);
      const open = expanded[f.id];
      return (
        <div key={f.id}>
          <div
            className="docmgr__tree-row"
            style={{ paddingLeft: 12 + depth * 16 }}
            onClick={() => { setActiveFolder(f.id); }}
          >
            {children.length > 0 && (
              <span
                className="docmgr__tree-expand"
                onClick={(e) => { e.stopPropagation(); setExpanded((p) => ({ ...p, [f.id]: !p[f.id] })); }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
            )}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="docmgr__tree-icon">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span className="docmgr__tree-name" style={{ fontWeight: activeFolder === f.id ? 700 : 450 }}>{f.name}</span>
            <span className="docmgr__tree-count">{docCounts[f.name] || 0}</span>
          </div>
          {open && children.length > 0 && renderTree(children, depth + 1)}
        </div>
      );
    });
  }

  return (
    <div className="cdoc__layout">
      <aside className="cdoc__sidebar" style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <div className="cdoc__sidebar-head">
          <span className="cdoc__sidebar-title">FOLDERS</span>
        </div>
        {rootFolders.length === 0 ? (
          <div className="empty" style={{ padding: 20 }}><p className="muted">No case folder.</p></div>
        ) : (
          renderTree(rootFolders)
        )}
      </aside>

      <div className="cdoc__content" style={{ maxHeight: 'none', overflow: 'visible' }}>
        <div className="cdoc__toolbar">
          <div className="cdoc__breadcrumb">
            <button className={`cdoc__bc-btn${!activeFolder ? ' active' : ''}`} onClick={() => setActiveFolder(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" /></svg>
              {rootFolder?.name || 'Documents'}
            </button>
            {breadcrumbPath.map((f) => (
              <React.Fragment key={f.id}>
                <span className="cdoc__bc-sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg></span>
                <button className="cdoc__bc-btn" onClick={() => setActiveFolder(f.id)}>{f.name}</button>
              </React.Fragment>
            ))}
          </div>

          <div className="cdoc__toolbar-right">
            <div className="cdoc__seg">
              <button className={`cdoc__seg-btn${viewMode === 'grid' ? ' active' : ''}`} title="Grid" onClick={() => setViewMode('grid')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              </button>
              <button className={`cdoc__seg-btn${viewMode === 'list' ? ' active' : ''}`} title="List" onClick={() => setViewMode('list')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Folder grid when viewing root or parent folder */}
        {(!activeFolder || getChildren(activeFolder).length > 0) && (
          <div className="docmgr__folder-grid" style={{ marginTop: 12 }}>
            {(activeFolder === null ? rootFolders : getChildren(activeFolder)).map((f) => {
              const childCount = getChildren(f.id).length;
              const fileCount = docCounts[f.name] || 0;
              return (
                <div key={f.id} className="docmgr__folder-card" onClick={() => setActiveFolder(f.id)}>
                  <div className="cdoc__folder-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                  </div>
                  <span className="docmgr__folder-card-name">{f.name}</span>
                  <span className="docmgr__folder-card-meta">
                    {childCount > 0 && `${childCount} folder${childCount > 1 ? 's' : ''}`}
                    {childCount > 0 && fileCount > 0 && ' · '}
                    {fileCount > 0 && `${fileCount} file${fileCount > 1 ? 's' : ''}`}
                    {childCount === 0 && fileCount === 0 && 'Empty'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Document view */}
        {isFileView && (
          sorted.length === 0 ? (
            <div className="empty" style={{ marginTop: 20 }}>
              <div className="empty__icon"><Icon name="folder" size={24} /></div>
              <p className="muted">No documents in this folder.</p>
            </div>
          ) : viewMode === 'list' ? (
            <div className="cdoc__table-wrap" style={{ marginTop: 12 }}>
              <table className="cdoc__table">
                <thead>
                  <tr>
                    <th className="cdoc__th cdoc__th--name">Name</th>
                    <th className="cdoc__th">Type</th>
                    <th className="cdoc__th">Size</th>
                    <th className="cdoc__th">Uploaded On</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((d) => {
                    const name = d.name || d.title || 'Untitled';
                    return (
                      <tr key={d.id} className="cdoc__tr">
                        <td className="cdoc__td cdoc__td--name">
                          <div className="cdoc__doc-name-cell">
                            <FileTypeIcon name={name} />
                            <span className="cdoc__doc-name">{name}</span>
                          </div>
                        </td>
                        <td className="cdoc__td"><ExtBadge name={name} /></td>
                        <td className="cdoc__td cdoc__td--muted">{bytes(d.size)}</td>
                        <td className="cdoc__td cdoc__td--muted">{formatDate(d.uploaded_at || d.created_at || d.uploadedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="docgrid" style={{ marginTop: 12 }}>
              {sorted.map((d) => {
                const name = d.name || d.title || 'Untitled';
                return (
                  <div key={d.id} className="doccard">
                    <div className="doccard__icon"><FileTypeIcon name={name} /></div>
                    <div className="doccard__name" title={name}>{name}</div>
                    <div className="doccard__meta">
                      <ExtBadge name={name} />
                      <span>{bytes(d.size)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}
