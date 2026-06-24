import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Icon from '@/components/Icon.jsx';
import Button from '@/components/Button.jsx';
import { Input } from '@/components/Field.jsx';
import { documentsRepository } from '@/data-layer/repositories/documentsRepository.js';
import { caseFoldersRepository } from '@/data-layer/repositories/caseFoldersRepository.js';
import { formatDate, bytes } from '@/utils/format.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

export default function CaseDocuments() {
  const toast = useToast();
  const [docs, setDocs] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');
  const [activeFolder, setActiveFolder] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [bulkAdding, setBulkAdding] = useState(false);
  const [bulkNames, setBulkNames] = useState('');
  const [docSelected, setDocSelected] = useState([]);
  const [folderSelected, setFolderSelected] = useState(new Set());
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [clipboard, setClipboard] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [d, f] = await Promise.all([
      documentsRepository.getAll().catch(() => []),
      caseFoldersRepository.getAll().catch(() => []),
    ]);
    setDocs(Array.isArray(d) ? d : []);
    setFolders(Array.isArray(f) ? f : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const rootFolders = useMemo(() =>
    folders.filter((f) => !f.parent_id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  , [folders]);

  const getChildren = useCallback((parentId) =>
    folders.filter((f) => f.parent_id === parentId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  , [folders]);

  const docCounts = useMemo(() => {
    const m = {};
    docs.forEach((d) => { m[d.folder] = (m[d.folder] || 0) + 1; });
    return m;
  }, [docs]);

  const visible = !activeFolder
    ? docs
    : docs.filter((d) => d.folder === getFolderName(activeFolder));

  const filtered = visible.filter((d) =>
    !search || (d.name || d.title || '').toLowerCase().includes(search.toLowerCase())
  );

  function getFolderName(id) {
    const f = folders.find((x) => x.id === id);
    return f ? f.name : null;
  }

  function getAllDescendantIds(parentId) {
    const ids = [];
    const walk = (pid) => {
      const children = folders.filter((f) => f.parent_id === pid);
      for (const c of children) {
        ids.push(c.id);
        walk(c.id);
      }
    };
    walk(parentId);
    return ids;
  }

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectFolder = (id) => {
    if (clipboard) return;
    setActiveFolder(id);
    setDocSelected([]);
  };

  const createFolder = async () => {
    const name = newName.trim();
    if (!name) { toast.push('Folder name is required.', 'error'); return; }
    const order = folders.reduce((m, f) => Math.max(m, f.order ?? 0), 0) + 1;
    const res = await caseFoldersRepository.create({
      name, kind: 'document',
      parent_id: activeFolder || null, order,
      system: false, created_at: new Date().toISOString(),
    }).catch((e) => { toast.push(e?.message || 'Failed to create folder.', 'error'); return null; });
    if (res) {
      toast.push('Folder created.', 'success');
      setNewName(''); setCreating(false);
      await load();
      if (activeFolder) setExpanded((prev) => ({ ...prev, [activeFolder]: true }));
    }
  };

  const bulkAddFolders = async () => {
    const names = bulkNames.split('\n').map((n) => n.trim()).filter(Boolean);
    if (names.length === 0) { toast.push('Enter at least one folder name.', 'error'); return; }
    const order = folders.reduce((m, f) => Math.max(m, f.order ?? 0), 0) + 1;
    let created = 0;
    for (let i = 0; i < names.length; i++) {
      const res = await caseFoldersRepository.create({
        name: names[i], kind: 'document',
        parent_id: activeFolder || null,
        order: order + i, system: false,
        created_at: new Date().toISOString(),
      }).catch(() => null);
      if (res) created++;
    }
    toast.push(`${created} folder(s) created.`, 'success');
    setBulkNames(''); setBulkAdding(false); setCreating(false);
    await load();
    if (activeFolder) setExpanded((prev) => ({ ...prev, [activeFolder]: true }));
  };

  const startRename = (f) => {
    setEditingId(f.id);
    setEditName(f.name);
  };

  const saveRename = async () => {
    const name = editName.trim();
    if (!name) { setEditingId(null); return; }
    await caseFoldersRepository.update(editingId, { name }).catch(() => {});
    setEditingId(null);
    await load();
  };

  const cancelRename = () => setEditingId(null);

  const deleteFolder = async (f) => {
    const descIds = getAllDescendantIds(f.id);
    const allIds = [...descIds.reverse(), f.id];
    if (!confirm(`Delete "${f.name}"${descIds.length > 0 ? ` and ${descIds.length} sub-folder(s)` : ''}?`)) return;
    for (const id of allIds) {
      await caseFoldersRepository.delete(id).catch(() => {});
    }
    toast.push('Folder deleted.', 'success');
    if (activeFolder === f.id || descIds.includes(activeFolder)) setActiveFolder(null);
    await load();
  };

  const bulkDeleteFolders = async () => {
    if (folderSelected.size === 0) return;
    const allIds = new Set(folderSelected);
    for (const id of folderSelected) {
      getAllDescendantIds(id).forEach((did) => allIds.add(did));
    }
    if (!confirm(`Delete ${allIds.size} folder(s)?`)) return;
    for (const id of [...allIds].reverse()) {
      await caseFoldersRepository.delete(id).catch(() => {});
    }
    toast.push(`Deleted ${allIds.size} folder(s).`, 'success');
    setFolderSelected(new Set());
    await load();
  };

  const cutFolder = (f) => {
    setClipboard({ type: 'cut', folderId: f.id, folder: f });
  };

  const copyFolder = (f) => {
    setClipboard({ type: 'copy', folderId: f.id, folder: f });
  };

  const cancelClipboard = () => setClipboard(null);

  const pasteHere = async (targetId) => {
    if (!clipboard) return;
    const { type, folder } = clipboard;

    if (type === 'cut') {
      if (folder.id === targetId) { toast.push('Cannot move folder into itself.', 'error'); return; }
      const descIds = getAllDescendantIds(folder.id);
      if (descIds.includes(targetId)) { toast.push('Cannot move folder into its own sub-folder.', 'error'); return; }
      if (targetId && getChildren(targetId).some((f) => f.name.toLowerCase() === folder.name.toLowerCase())) {
        toast.push('A folder with that name already exists in the destination.', 'error'); return;
      }
      await caseFoldersRepository.update(folder.id, { parent_id: targetId || null }).catch(() => {});
      toast.push('Folder moved.', 'success');
    } else if (type === 'copy') {
      const copyRecursive = async (sourceId, newParentId) => {
        const source = folders.find((f) => f.id === sourceId);
        if (!source) return;
        const children = getChildren(sourceId);
        const newFolder = await caseFoldersRepository.create({
          name: source.name, kind: source.kind,
          parent_id: newParentId || null,
          order: source.order ?? 0, system: false,
          created_at: new Date().toISOString(),
        }).catch(() => null);
        if (!newFolder) return;
        for (const child of children) {
          await copyRecursive(child.id, newFolder.id);
        }
      };
      await copyRecursive(folder.id, targetId);
      toast.push('Folder copied.', 'success');
    }

    setClipboard(null);
    await load();
  };

  const toggleDocSelect = (id) => setDocSelected((s) =>
    s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
  );

  const toggleFolderSelect = (id) => {
    setFolderSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderTree = (nodes, depth = 0) => {
    return nodes.map((f) => {
      const children = getChildren(f.id);
      const isExpanded = expanded[f.id];
      const isActive = activeFolder === f.id;
      const isEditing = editingId === f.id;
      const isCut = clipboard?.type === 'cut' && clipboard?.folderId === f.id;
      const isHovered = hoveredId === f.id;
      const isSelected = folderSelected.has(f.id);
      const canPaste = clipboard && clipboard.folderId !== f.id && !getAllDescendantIds(f.id).includes(clipboard.folderId);

      return (
        <React.Fragment key={f.id}>
          <div
            className={`docmgr__folder-wrap ${isCut ? 'docmgr__folder--cut' : ''} ${isSelected ? 'docmgr__folder--selected' : ''}`}
            onMouseEnter={() => setHoveredId(f.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <input
              type="checkbox"
              className="docmgr__folder-checkbox"
              checked={isSelected}
              onChange={() => toggleFolderSelect(f.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className={`docmgr__folder ${isActive ? 'active' : ''}`}
              style={{ paddingLeft: 8 + depth * 16 }}
              onClick={() => selectFolder(f.id)}
            >
              {children.length > 0 ? (
                <span className="docmgr__toggle" onClick={(e) => { e.stopPropagation(); toggleExpand(f.id); }}>
                  <Icon name={isExpanded ? 'chevronDown' : 'chevron'} size={12} />
                </span>
              ) : <span style={{ width: 12 }} />}
              <Icon name="folder" size={15} />
              {isEditing ? (
                <Input
                  autoFocus
                  value={editName}
                  className="docmgr__rename-input"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveRename(); if (e.key === 'Escape') cancelRename(); }}
                />
              ) : (
                <span className="docmgr__folder-name">{f.name}</span>
              )}
              <span className="docmgr__count">{docCounts[f.name] || 0}</span>
            </button>
            {(isHovered || isEditing) && !clipboard && (
              <div className="docmgr__folder-actions">
                {isEditing ? (
                  <><button className="iconbtn" title="Save" onClick={(e) => { e.stopPropagation(); saveRename(); }}><Icon name="check" size={13} /></button><button className="iconbtn" title="Cancel" onClick={(e) => { e.stopPropagation(); cancelRename(); }}><Icon name="close" size={13} /></button></>
                ) : (
                  <><button className="iconbtn" title="Rename" onClick={(e) => { e.stopPropagation(); startRename(f); }}><Icon name="edit" size={13} /></button><button className="iconbtn" title="Cut" onClick={(e) => { e.stopPropagation(); cutFolder(f); }}><Icon name="scissors" size={13} /></button><button className="iconbtn" title="Copy" onClick={(e) => { e.stopPropagation(); copyFolder(f); }}><Icon name="copy" size={13} /></button><button className="iconbtn iconbtn--danger" title="Delete" onClick={(e) => { e.stopPropagation(); deleteFolder(f); }}><Icon name="trash" size={13} /></button></>
                )}
              </div>
            )}
            {canPaste && (
              <button className="docmgr__paste-btn" title="Paste here" onClick={(e) => { e.stopPropagation(); pasteHere(f.id); }}>
                <Icon name="cornerDownRight" size={13} /> Paste
              </button>
            )}
          </div>
          {children.length > 0 && isExpanded && renderTree(children, depth + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fade-in">
      <PageHeader icon="folder" title="Case Documents" subtitle="Browse case documents organized by folders." />

      <div className="docmgr">
        <aside className="docmgr__folders">
          <div className="docmgr__folders-head">
            <span>Folders ({folders.length})</span>
            <button className="iconbtn" title="Create folder" onClick={() => { setCreating(true); setBulkAdding(false); setNewName(''); }}>
              <Icon name="plus" size={14} />
            </button>
          </div>

          {clipboard && (
            <div className="docmgr__clipboard-bar">
              <span className="muted">
                {clipboard.type === 'cut' ? '✂️ Move' : '📋 Copy'}: <strong>{clipboard.folder.name}</strong>
              </span>
              <button className="iconbtn" title="Cancel" onClick={cancelClipboard}><Icon name="close" size={13} /></button>
            </div>
          )}

          {folderSelected.size > 0 && !clipboard && (
            <div className="docmgr__bulk-bar">
              <span className="muted">{folderSelected.size} selected</span>
              <button className="iconbtn iconbtn--danger" title="Delete selected" onClick={bulkDeleteFolders}><Icon name="trash" size={13} /></button>
              <button className="iconbtn" title="Clear selection" onClick={() => setFolderSelected(new Set())}><Icon name="close" size={13} /></button>
            </div>
          )}

          <button
            className={`docmgr__folder ${!activeFolder ? 'active' : ''}`}
            onClick={() => selectFolder(null)}
          >
            <Icon name="layers" size={15} /> <span>All Documents</span>
            <span className="docmgr__count">{docs.length}</span>
          </button>

          {clipboard && (
            <button className="docmgr__paste-btn" onClick={() => pasteHere(null)} style={{ margin: '4px 12px' }}>
              <Icon name="cornerDownRight" size={13} /> Paste to root
            </button>
          )}

          {renderTree(rootFolders)}

          {creating && (
            <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {!bulkAdding ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Input
                    autoFocus
                    value={newName}
                    placeholder="Folder name..."
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') createFolder(); if (e.key === 'Escape') { setCreating(false); setBulkAdding(false); } }}
                  />
                  <button className="iconbtn" title="Confirm" onClick={createFolder}><Icon name="check" size={14} /></button>
                  <button className="iconbtn" title="Cancel" onClick={() => { setCreating(false); setBulkAdding(false); }}><Icon name="close" size={14} /></button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <textarea
                    className="input docmgr__bulk-textarea"
                    autoFocus
                    value={bulkNames}
                    placeholder="Enter folder names, one per line..."
                    onChange={(e) => setBulkNames(e.target.value)}
                    rows={4}
                  />
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Button size="sm" icon="plus" onClick={bulkAddFolders}>Create All</Button>
                    <Button size="sm" variant="ghost" onClick={() => setBulkAdding(false)}>Single</Button>
                    <div style={{ flex: 1 }} />
                    <button className="iconbtn" title="Cancel" onClick={() => { setCreating(false); setBulkAdding(false); }}><Icon name="close" size={14} /></button>
                  </div>
                </div>
              )}
              {!bulkAdding && (
                <button className="docmgr__bulk-toggle" onClick={() => { setBulkAdding(true); setNewName(''); }}>
                  + Add multiple folders
                </button>
              )}
            </div>
          )}
        </aside>

        <div className="docmgr__main">
          <div className="toolbar-row">
            <div style={{ flex: 1 }} />
            <div className="seg">
              <button className={`seg__btn ${view === 'list' ? 'active' : ''}`} title="List view" onClick={() => setView('list')}>
                <Icon name="list" size={15} />
              </button>
              <button className={`seg__btn ${view === 'grid' ? 'active' : ''}`} title="Grid view" onClick={() => setView('grid')}>
                <Icon name="grid" size={15} />
              </button>
            </div>
          </div>

          <div className="search-row" style={{ marginBottom: 12 }}>
            <div className="datatable__search search-row__input">
              <Icon name="search" size={15} />
              <input value={search} placeholder="Search documents..." onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {loading ? (
            <div className="empty"><span className="spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              <div className="empty__icon"><Icon name="folder" size={24} /></div>
              <p className="muted">No documents found.</p>
            </div>
          ) : view === 'list' ? (
            <Card bodyClass="card__body--flush">
              <div className="table-scroll">
                <table className="table">
                  <thead>
                    <tr><th style={{ width: 34 }} /><th>Name</th><th>Folder</th><th>Size</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d.id} className={docSelected.includes(d.id) ? 'row--selected' : ''}>
                        <td><input type="checkbox" checked={docSelected.includes(d.id)} onChange={() => toggleDocSelect(d.id)} /></td>
                        <td style={{ fontWeight: 600 }}>
                          <Icon name="file" size={14} /> {d.name || d.title || 'Untitled'}
                        </td>
                        <td><span className="badge badge--grey">{d.folder || '—'}</span></td>
                        <td>{bytes(d.size)}</td>
                        <td>{formatDate(d.uploaded_at || d.created_at || d.uploadedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div className="docgrid">
              {filtered.map((d) => (
                <div key={d.id} className={`doccard ${docSelected.includes(d.id) ? 'doccard--sel' : ''}`}>
                  <div className="doccard__top">
                    <input type="checkbox" checked={docSelected.includes(d.id)} onChange={() => toggleDocSelect(d.id)} />
                  </div>
                  <div className="doccard__icon"><Icon name="file" size={26} /></div>
                  <div className="doccard__name" title={d.name}>{d.name || d.title || 'Untitled'}</div>
                  <div className="doccard__meta">
                    <span className="badge badge--grey">{d.folder || '—'}</span>
                    <span>{bytes(d.size)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div className="modal modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <span className="modal__title">{preview.name || 'Document Preview'}</span>
              <button className="modal__close" onClick={() => setPreview(null)}><Icon name="close" size={18} /></button>
            </div>
            <div className="modal__body" style={{ whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.7 }}>
              {preview.text || preview.content || 'No preview available.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
