import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';
import { Input, Textarea, Select } from '@/components/Field.jsx';
import { useToast } from '@/data-layer/ToastContext.jsx';
import { benchTypeLogic } from '@/logic/benchTypeLogic.js';

const ACTIONS = [
  { key: 'add', label: 'Add', icon: 'plus', variant: 'primary' },
  { key: 'edit', label: 'Edit', icon: 'edit', variant: 'secondary' },
  { key: 'delete', label: 'Delete', icon: 'trash', variant: 'danger' },
  { key: 'import', label: 'Import', icon: 'upload', variant: 'ghost' },
];

export default function BenchTypes() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeAction, setActiveAction] = useState(null);

  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newStatus, setNewStatus] = useState('Active');
  const [newDesc, setNewDesc] = useState('');

  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');

  const [delId, setDelId] = useState('');
  const [importFile, setImportFile] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await benchTypeLogic.list();
    if (Array.isArray(res)) setItems(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setActiveAction(null);
    setNewName(''); setNewCode(''); setNewStatus('Active'); setNewDesc('');
    setEditId(''); setEditName(''); setEditCode('');
    setDelId(''); setImportFile(null);
  };

  const doAdd = async () => {
    if (!newName.trim() || !newCode.trim()) { toast.push('Name and code are required.', 'error'); return; }
    const res = await benchTypeLogic.create({ name: newName, short_code: newCode, status: newStatus, description: newDesc });
    if (res.ok) { reset(); toast.push('Bench type added.', 'success'); load(); }
    else toast.push(res.error, 'error');
  };

  const doEdit = async () => {
    if (!editId) { toast.push('Select a bench type to edit.', 'error'); return; }
    if (!editName.trim() || !editCode.trim()) { toast.push('Name and code cannot be empty.', 'error'); return; }
    const item = items.find(x => x.id === editId);
    const res = await benchTypeLogic.update(editId, { name: editName, short_code: editCode, description: item?.description, display_order: item?.display_order, status: item?.status });
    if (res.ok) { reset(); toast.push('Bench type updated.', 'success'); load(); }
    else toast.push(res.error, 'error');
  };

  const doDelete = async () => {
    if (!delId) { toast.push('Select a bench type to delete.', 'error'); return; }
    const item = items.find(x => x.id === delId);
    if (!window.confirm(`Delete bench type "${item?.name}"?`)) return;
    const res = await benchTypeLogic.remove(delId);
    if (res.ok || !res.error) { reset(); toast.push('Bench type deleted.', 'success'); load(); }
    else toast.push(res.error, 'error');
  };

  const doImport = async () => {
    if (!importFile) { toast.push('Select a CSV file.', 'error'); return; }
    toast.push('CSV import coming soon.', 'info');
  };

  const filtered = items.filter(i =>
    !search || i.name.toLowerCase().includes(search.toLowerCase()) || (i.short_code || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="fade-in bench-types__loading"><div className="spinner" /></div>;

  return (
    <div className="fade-in bench-types">
      <PageHeader icon="users" title="Bench Types" subtitle="Manage bench compositions (Single Bench, Division Bench, Full Bench, etc.)." />

      <div className="bench-types__toolbar">
        {ACTIONS.map(a => (
          <Button
            key={a.key}
            icon={a.icon}
            variant={activeAction === a.key ? a.variant : 'ghost'}
            onClick={() => setActiveAction(activeAction === a.key ? null : a.key)}
          >
            {a.label}
          </Button>
        ))}
      </div>

      {activeAction && (
        <Card className="bench-types__form">
          <div className="bench-types__form-header">
            <span className="bench-types__form-header-icon"><Icon name={ACTIONS.find(a => a.key === activeAction)?.icon || 'file'} size={18} /></span>
            <span className="bench-types__form-header-title">{ACTIONS.find(a => a.key === activeAction)?.label} Bench Type</span>
            <button className="iconbtn bench-types__form-close" onClick={reset} title="Close"><Icon name="close" size={18} /></button>
          </div>
          <div className="bench-types__form-body">
            {activeAction === 'add' && (
              <div className="bench-types__form-grid">
                <div className="bench-types__field">
                  <label className="bench-types__label">Name <span className="bench-types__required">*</span></label>
                  <Input value={newName} placeholder="e.g., Single Bench" onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && doAdd()} />
                </div>
                <div className="bench-types__field">
                  <label className="bench-types__label">Short Code <span className="bench-types__required">*</span></label>
                  <Input value={newCode} placeholder="e.g., SB" onChange={e => setNewCode(e.target.value.toUpperCase().slice(0, 6))} onKeyDown={e => e.key === 'Enter' && doAdd()} />
                </div>
                <div className="bench-types__field">
                  <label className="bench-types__label">Status</label>
                  <Select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Select>
                </div>
                <div className="bench-types__field bench-types__field--full">
                  <label className="bench-types__label">Description <span className="bench-types__optional">(optional)</span></label>
                  <Textarea value={newDesc} placeholder="Brief description…" onChange={e => setNewDesc(e.target.value)} maxLength={250} />
                  <span className="bench-types__char-count">{newDesc.length} / 250</span>
                </div>
              </div>
            )}
            {activeAction === 'edit' && (
              <div className="bench-types__form-grid">
                <div className="bench-types__field bench-types__field--full">
                  <label className="bench-types__label">Select Bench Type <span className="bench-types__required">*</span></label>
                  <Select value={editId} onChange={e => { setEditId(e.target.value); const item = items.find(x => x.id === e.target.value); if (item) { setEditName(item.name); setEditCode(item.short_code || ''); } }}>
                    <option value="">— choose —</option>
                    {items.map(item => <option key={item.id} value={item.id}>{item.name} ({item.short_code})</option>)}
                  </Select>
                </div>
                {editId && (
                  <>
                    <div className="bench-types__field">
                      <label className="bench-types__label">Name <span className="bench-types__required">*</span></label>
                      <Input value={editName} onChange={e => setEditName(e.target.value)} />
                    </div>
                    <div className="bench-types__field">
                      <label className="bench-types__label">Short Code <span className="bench-types__required">*</span></label>
                      <Input value={editCode} onChange={e => setEditCode(e.target.value.toUpperCase().slice(0, 6))} />
                    </div>
                  </>
                )}
              </div>
            )}
            {activeAction === 'delete' && (
              <div className="bench-types__form-grid">
                <div className="bench-types__field bench-types__field--full">
                  <label className="bench-types__label">Select Bench Type <span className="bench-types__required">*</span></label>
                  <Select value={delId} onChange={e => setDelId(e.target.value)}>
                    <option value="">— choose —</option>
                    {items.map(item => <option key={item.id} value={item.id}>{item.name} ({item.short_code})</option>)}
                  </Select>
                </div>
                {delId && (
                  <div className="bench-types__warning">
                    <Icon name="alert" size={16} />
                    <span>This action cannot be undone. All associated data will be removed.</span>
                  </div>
                )}
              </div>
            )}
            {activeAction === 'import' && (
              <div className="bench-types__import">
                <div className="bench-types__import-icon"><Icon name="upload" size={28} /></div>
                <div className="bench-types__import-title">Import from CSV</div>
                <div className="bench-types__import-hint">CSV columns: name, short_code, status (optional)</div>
                <label className="bench-types__import-btn">
                  <input type="file" accept=".csv" style={{ display: 'none' }} onChange={e => setImportFile(e.target.files[0])} />
                  <span className="btn btn--ghost">{importFile ? importFile.name : 'Choose CSV file'}</span>
                </label>
                {importFile && <div className="bench-types__import-file">Selected: {importFile.name}</div>}
              </div>
            )}
          </div>
          <div className="bench-types__form-footer">
            <Button variant="ghost" onClick={reset}>Cancel</Button>
            {activeAction === 'add' && <Button icon="plus" onClick={doAdd}>Add Bench Type</Button>}
            {activeAction === 'edit' && <Button icon="check" onClick={doEdit}>Save Changes</Button>}
            {activeAction === 'delete' && <Button variant="danger" icon="trash" onClick={doDelete}>Delete</Button>}
            {activeAction === 'import' && <Button icon="upload" onClick={doImport} disabled={!importFile}>Import</Button>}
          </div>
        </Card>
      )}

      <Card className="bench-types__table-card">
        <div className="bench-types__table-toolbar">
          <div className="bench-types__search">
            <Icon name="search" size={15} />
            <input value={search} placeholder="Search bench types…" onChange={e => setSearch(e.target.value)} />
          </div>
          <span className="bench-types__count">{filtered.length} of {items.length}</span>
        </div>
        <table className="table bench-types__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td className="bench-types__empty" colSpan={5}>No bench types found.</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id}>
                <td><span className="bench-types__cell-name">{item.name}</span></td>
                <td><code className="bench-types__cell-code">{item.short_code}</code></td>
                <td><span className="bench-types__cell-desc">{item.description || '—'}</span></td>
                <td>{item.display_order ?? '—'}</td>
                <td><span className={`badge badge--${item.status === 'Active' ? 'green' : 'grey'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="bench-types__footer">{items.length} bench type(s) configured.</p>
    </div>
  );
}
