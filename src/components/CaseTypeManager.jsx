import React, { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { Input } from './Field.jsx';
import { caseTypeLogic } from '@/logic/caseTypeLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

export default function CaseTypeManager({ open, onClose, caseTypes, onChanged }) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [dragId, setDragId] = useState(null);

  const visible = caseTypes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.short_code.toLowerCase().includes(search.toLowerCase())
  );

  const add = async () => {
    if (!newName.trim() || !newCode.trim()) { toast.push('Name and short code are required.', 'error'); return; }
    const res = await caseTypeLogic.create({ name: newName, short_code: newCode });
    if (res.ok) { setNewName(''); setNewCode(''); toast.push('Case type added.', 'success'); onChanged?.(); }
    else toast.push(res.error, 'error');
  };
  const saveEdit = async () => {
    const res = await caseTypeLogic.update(editId, { name: editName, short_code: editCode || undefined });
    if (res.ok) { setEditId(null); toast.push('Case type updated.', 'success'); onChanged?.(); }
    else toast.push(res.error, 'error');
  };
  const remove = async (t) => {
    if (!confirm(`Delete case type "${t.name}"? Cases using this type keep their value.`)) return;
    await caseTypeLogic.remove(t.id);
    toast.push('Case type deleted.', 'success'); onChanged?.();
  };

  const onDrop = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const ids = caseTypes.map((t) => t.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    setDragId(null);
    await caseTypeLogic.reorder(ids);
    onChanged?.();
  };

  return (
    <Modal open={open} title="Manage Case Types" onClose={onClose} size="lg">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Input value={newName} placeholder="New case type name…" onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <Input value={newCode} placeholder="Short code (e.g. CIV)" onChange={(e) => setNewCode(e.target.value.toUpperCase().slice(0, 6))} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <Button icon="plus" onClick={add}>Add</Button>
      </div>
      <div className="datatable__search" style={{ marginBottom: 12 }}>
        <Icon name="search" size={15} />
        <input value={search} placeholder="Search case types…" onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="table-scroll" style={{ maxHeight: '46vh' }}>
        <table className="table">
          <thead><tr><th style={{ width: 30 }} /><th>Name</th><th>Code</th><th>Status</th><th style={{ width: 110 }} /></tr></thead>
          <tbody>
            {visible.map((t) => (
              <tr
                key={t.id}
                draggable={!search}
                onDragStart={() => setDragId(t.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(t.id)}
                className={dragId === t.id ? 'row--selected' : ''}
              >
                <td style={{ cursor: search ? 'default' : 'grab', color: 'var(--text-faint)' }}>⋮⋮</td>
                <td>
                  {editId === t.id ? (
                    <Input value={editName} autoFocus onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEdit()} />
                  ) : <span style={{ fontWeight: 600 }}>{t.name}</span>}
                </td>
                <td><code style={{ fontSize: 12, background: 'var(--bg-soft)', padding: '2px 8px', borderRadius: 4 }}>{t.short_code}</code></td>
                <td><span style={{ fontSize: 11.5, color: t.status === 'Active' ? 'var(--green)' : 'var(--red)' }}>{t.status}</span></td>
                <td>
                  <div className="row-actions">
                    {editId === t.id ? (
                      <>
                        <button className="iconbtn" title="Save" onClick={saveEdit}><Icon name="check" size={15} /></button>
                        <button className="iconbtn" title="Cancel" onClick={() => setEditId(null)}><Icon name="close" size={15} /></button>
                      </>
                    ) : (
                      <>
                        <button className="iconbtn" title="Edit" onClick={() => { setEditId(t.id); setEditName(t.name); setEditCode(t.short_code); }}><Icon name="edit" size={15} /></button>
                        <button className="iconbtn iconbtn--danger" title="Delete" onClick={() => remove(t)}><Icon name="trash" size={15} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!search && <div className="muted" style={{ marginTop: 10 }}>Drag rows to reorder. Order applies to every case form.</div>}
    </Modal>
  );
}
