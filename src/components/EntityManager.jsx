import React, { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { Input, Textarea } from './Field.jsx';
import { useToast } from '@/data-layer/ToastContext.jsx';

export default function EntityManager({ open, onClose, title, logic, items: propItems, onChanged, fields }) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [dragId, setDragId] = useState(null);
  const [bulkText, setBulkText] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [mode, setMode] = useState('single');
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [editCode, setEditCode] = useState('');

  const hasCode = fields?.includes('code');

  const visible = propItems.filter((item) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return item.name.toLowerCase().includes(q) || (hasCode && (item.short_code || '').toLowerCase().includes(q));
  });

  const add = async () => {
    if (hasCode && (!newName.trim() || !newCode.trim())) { toast.push('Name and short code are required.', 'error'); return; }
    if (!hasCode && !newName.trim()) { toast.push('Name is required.', 'error'); return; }
    const payload = hasCode ? { name: newName, short_code: newCode } : { name: newName };
    const res = await logic.create(payload);
    if (res.ok) { setNewName(''); setNewCode(''); toast.push(`${title} added.`, 'success'); onChanged?.(); }
    else toast.push(res.error, 'error');
  };

  const parseBulk = (line) => hasCode ? line.split(':').map((s) => s.trim()) : [line.trim()];

  const addBulk = async () => {
    const lines = bulkText.split('\n').map(parseBulk).filter((parts) => parts[0]);
    if (!lines.length) { toast.push(hasCode ? 'Paste at least one entry (Name:CODE per line).' : 'Paste at least one name per line.', 'error'); return; }
    let added = 0; let skipped = 0;
    for (const parts of lines) {
      if (hasCode && (!parts[0] || !parts[1])) { skipped += 1; continue; }
      const payload = hasCode ? { name: parts[0], short_code: parts[1]?.toUpperCase() } : { name: parts[0] };
      const res = await logic.create(payload);
      if (res.ok) added += 1; else skipped += 1;
    }
    setBulkText('');
    toast.push(`${added} ${title.toLowerCase()}(s) added.${skipped ? ` ${skipped} skipped.` : ''}`, added ? 'success' : 'info');
    onChanged?.();
  };

  const saveEdit = async () => {
    const payload = hasCode ? { name: editName, short_code: editCode || undefined } : { name: editName };
    const res = await logic.update(editId, payload);
    if (res.ok) { setEditId(null); toast.push(`${title} updated.`, 'success'); onChanged?.(); }
    else toast.push(res.error, 'error');
  };

  const remove = async (item) => {
    if (!confirm(`Delete ${title.toLowerCase()} "${item.name}"?`)) return;
    await logic.remove(item.id);
    toast.push(`${title} deleted.`, 'success'); onChanged?.();
  };

  const removeBulk = async () => {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} ${title.toLowerCase()}(s)?`)) return;
    for (const id of selected) {
      await logic.remove(id);
    }
    setSelected(new Set());
    toast.push(`${selected.size} ${title.toLowerCase()}(s) deleted.`, 'success');
    onChanged?.();
  };

  const onDrop = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const ids = propItems.map((item) => item.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    setDragId(null);
    await logic.reorder(ids);
    onChanged?.();
  };

  const toggleSel = (id) => setSelected((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleAll = () => setSelected((prev) => prev.size === visible.length ? new Set() : new Set(visible.map((item) => item.id)));

  return (
    <Modal open={open} title={`Manage ${title}`} onClose={onClose} size="lg">
      {mode === 'single' ? (
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <Input value={newName} placeholder={`New ${title.toLowerCase()} name…`} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
          {hasCode && <Input value={newCode} placeholder="Short code (e.g. CIV)" onChange={(e) => setNewCode(e.target.value.toUpperCase().slice(0, 6))} onKeyDown={(e) => e.key === 'Enter' && add()} />}
          <Button icon="plus" onClick={add}>{hasCode ? 'Add' : `Add ${title}`}</Button>
          <Button variant="ghost" size="sm" onClick={() => { setMode('bulk'); setBulkText(''); }}>Bulk Add</Button>
        </div>
      ) : (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{hasCode ? 'Bulk Add — Name:CODE per line' : 'Bulk Add — one per line'}</span>
            <Button variant="ghost" size="sm" onClick={() => setMode('single')}>Single Add</Button>
          </div>
          <Textarea value={bulkText} onChange={(e) => setBulkText(e.target.value)} placeholder={hasCode ? `Civil Suit:CIV\nCriminal Case:CRL\nWrit Petition:WP` : `Supreme Court of India\nHigh Court\nDistrict & Sessions Court`} rows={5} />
          <Button icon="plus" onClick={addBulk} style={{ marginTop: 8 }}>Add All</Button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div className="datatable__search" style={{ flex: 1 }}>
          <Icon name="search" size={15} />
          <input value={search} placeholder={`Search ${title.toLowerCase()}…`} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {selected.size > 0 && (
          <Button variant="danger" size="sm" icon="trash" onClick={removeBulk}>Delete ({selected.size})</Button>
        )}
      </div>

      <div className="table-scroll" style={{ maxHeight: '46vh' }}>
        <table className="table">
          <thead><tr>
            <th style={{ width: 30 }}><input type="checkbox" onChange={toggleAll} checked={selected.size === visible.length && visible.length > 0} /></th>
            <th style={{ width: 30 }} />
            <th>Name</th>
            {hasCode && <th>Code</th>}
            {hasCode && <th>Status</th>}
            <th style={{ width: 110 }} />
          </tr></thead>
          <tbody>
            {visible.map((item) => (
              <tr
                key={item.id}
                draggable={!search}
                onDragStart={() => setDragId(item.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(item.id)}
                className={dragId === item.id ? 'row--selected' : ''}
              >
                <td><input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSel(item.id)} /></td>
                <td style={{ cursor: search ? 'default' : 'grab', color: 'var(--text-faint)' }}>⋮⋮</td>
                <td>
                  {editId === item.id ? (
                    <Input value={editName} autoFocus onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEdit()} />
                  ) : <span style={{ fontWeight: 600 }}>{item.name}</span>}
                </td>
                {hasCode && <td><code style={{ fontSize: 12, background: 'var(--bg-soft)', padding: '2px 8px', borderRadius: 4 }}>{item.short_code}</code></td>}
                {hasCode && <td><span style={{ fontSize: 11.5, color: item.status === 'Active' ? 'var(--green)' : 'var(--red)' }}>{item.status}</span></td>}
                <td>
                  <div className="row-actions">
                    {editId === item.id ? (
                      <>
                        <button className="iconbtn" title="Save" onClick={saveEdit}><Icon name="check" size={15} /></button>
                        <button className="iconbtn" title="Cancel" onClick={() => setEditId(null)}><Icon name="close" size={15} /></button>
                      </>
                    ) : (
                      <>
                        <button className="iconbtn" title="Edit" onClick={() => { setEditId(item.id); setEditName(item.name); setEditCode(item.short_code); }}><Icon name="edit" size={15} /></button>
                        <button className="iconbtn iconbtn--danger" title="Delete" onClick={() => remove(item)}><Icon name="trash" size={15} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!search && <div className="muted" style={{ marginTop: 10 }}>Drag rows to reorder.</div>}
    </Modal>
  );
}
