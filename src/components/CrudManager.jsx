import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { Input, Textarea, Select } from './Field.jsx';

const TABS = [
  { id: 'single-add', label: 'Single Add', icon: 'plus' },
  { id: 'single-edit', label: 'Single Edit', icon: 'edit' },
  { id: 'single-delete', label: 'Single Delete', icon: 'trash' },
  { id: 'bulk-add', label: 'Bulk Add', icon: 'plus' },
  { id: 'bulk-edit', label: 'Bulk Edit', icon: 'edit' },
  { id: 'bulk-delete', label: 'Bulk Delete', icon: 'trash' },
  { id: 'import', label: 'Import', icon: 'upload' },
];

export default function CrudManager({ open, onClose, entity, config }) {
  const [tab, setTab] = useState('single-add');

  useEffect(() => { if (open) setTab('single-add'); }, [open]);

  return (
    <Modal open={open} title={`Manage ${entity}`} onClose={onClose} size="lg" className="crud-modal"
      footer={<Button variant="ghost" onClick={onClose}>Close</Button>}>
      <div className="crud-tabs">
        {TABS.map((t) => (
          <button key={t.id} type="button" className={`crud-tab${tab === t.id ? ' crud-tab--active' : ''}`} onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={15} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="crud-body" key={`${entity}-${tab}`}>
        <TabContent tab={tab} entity={entity} config={config} />
      </div>
    </Modal>
  );
}

function TabContent({ tab, entity, config }) {
  switch (tab) {
    case 'single-add': return <SingleAdd config={config} entity={entity} />;
    case 'single-edit': return <SingleEdit config={config} entity={entity} />;
    case 'single-delete': return <SingleDelete config={config} entity={entity} />;
    case 'bulk-add': return <BulkAdd config={config} entity={entity} />;
    case 'bulk-edit': return <BulkEdit config={config} entity={entity} />;
    case 'bulk-delete': return <BulkDelete config={config} entity={entity} />;
    case 'import': return <BulkImport config={config} entity={entity} />;
    default: return null;
  }
}

function useItems(logic) {
  const [items, setItems] = useState([]);
  const refresh = () => logic.list().then((r) => setItems(Array.isArray(r) ? r : [])).catch(() => setItems([]));
  useEffect(() => { refresh(); }, [logic]);
  return { items, refresh };
}

function ActionToast({ msg }) {
  if (!msg) return null;
  return (
    <div className={`crud-toast crud-toast--${msg.type}`}>
      <Icon name={msg.type === 'success' ? 'check' : 'alert'} size={16} />
      {msg.text}
    </div>
  );
}

function renderFields(fields, values, setValues) {
  return fields.map((f) => (
    <div key={f.key} className="field">
      <label className="field__label">{f.label}</label>
      {f.type === 'color' ? (
        <input type="color" className="input" value={values[f.key] || f.default || '#6b7280'} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
      ) : (
        <Input value={values[f.key] || ''} placeholder={f.placeholder || f.label} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
      )}
    </div>
  ));
}

function tryGet(result) {
  if (!result) return false;
  if (result.ok === true || result.ok === undefined) return true;
  if (result.id) return true;
  return false;
}

function tryError(result) {
  if (!result) return 'Unknown error';
  if (result.error) return result.error;
  if (result.message) return result.message;
  return 'Operation failed';
}

/* ============ Single Add ============ */
function SingleAdd({ config, entity }) {
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async () => {
    setSaving(true); setMsg(null);
    try {
      const result = await config.logic.create(values);
      if (tryGet(result)) {
        setMsg({ type: 'success', text: `${entity} created!` });
        setValues({});
        if (config.refresh) config.refresh();
      } else setMsg({ type: 'error', text: tryError(result) });
    } catch (e) { setMsg({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      {renderFields(config.fields, values, setValues)}
      <div className="form-actions" style={{ marginTop: 16 }}>
        <Button variant="primary" icon="plus" onClick={handleSubmit} disabled={saving}>{saving ? 'Adding...' : `Add ${entity}`}</Button>
      </div>
    </div>
  );
}

/* ============ Single Edit ============ */
function SingleEdit({ config, entity }) {
  const { items, refresh } = useItems(config.logic);
  const [selected, setSelected] = useState('');
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    const item = items.find((i) => i.id === id);
    if (item) {
      const vals = {};
      config.fields.forEach((f) => { vals[f.key] = item[f.key] ?? ''; });
      setValues(vals);
    }
  };

  const handleSubmit = async () => {
    if (!selected) { setMsg({ type: 'error', text: 'Select an item to edit.' }); return; }
    setSaving(true); setMsg(null);
    try {
      const result = await config.logic.update(selected, values);
      if (tryGet(result)) {
        setMsg({ type: 'success', text: `${entity} updated!` });
        if (config.refresh) config.refresh();
        refresh();
        const item = items.find((i) => i.id === selected);
        if (item) { const vals = {}; config.fields.forEach((f) => { vals[f.key] = item[f.key] ?? ''; }); setValues(vals); }
      } else setMsg({ type: 'error', text: tryError(result) });
    } catch (e) { setMsg({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Select {entity}</label>
        <Select value={selected} onChange={(e) => handleSelect(e.target.value)}>
          <option value="">Select...</option>
          {items.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </Select>
      </div>
      {selected && renderFields(config.fields, values, setValues)}
      {selected && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="save" onClick={handleSubmit} disabled={saving}>{saving ? 'Saving...' : `Update ${entity}`}</Button>
        </div>
      )}
    </div>
  );
}

/* ============ Single Delete ============ */
function SingleDelete({ config, entity }) {
  const { items } = useItems(config.logic);
  const [selected, setSelected] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleDelete = async () => {
    if (!selected) return;
    setSaving(true); setMsg(null);
    try {
      const result = await config.logic.remove(selected);
      if (tryGet(result)) {
        setMsg({ type: 'success', text: `${entity} deleted!` });
        setSelected(''); setConfirm(false);
        if (config.refresh) config.refresh();
      } else setMsg({ type: 'error', text: tryError(result) });
    } catch (e) { setMsg({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Select {entity} to delete</label>
        <Select value={selected} onChange={(e) => { setSelected(e.target.value); setConfirm(false); }}>
          <option value="">Select...</option>
          {items.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </Select>
      </div>
      {selected && !confirm && (
        <Button variant="danger" icon="trash" onClick={() => setConfirm(true)}>Delete Selected</Button>
      )}
      {confirm && (
        <div className="crud-confirm">
          <p>Delete this {entity}? This cannot be undone.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="danger" onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Yes, Delete'}</Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ Bulk Add ============ */
const SIMPLE_ENTITIES = ['Status', 'Stage', 'Priority', 'Court Hierarchy', 'Client'];

function BulkAdd({ config, entity }) {
  const [lines, setLines] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const isSimple = SIMPLE_ENTITIES.includes(entity);

  const handleSubmit = async () => {
    const names = lines.split('\n').map((s) => s.trim()).filter(Boolean);
    if (!names.length) { setMsg({ type: 'error', text: 'Enter at least one item.' }); return; }
    setSaving(true); setMsg(null);
    let created = 0;
    for (const name of names) {
      try {
        let result;
        if (entity === 'Stage') {
          result = await config.logic.add(name);
        } else if (entity === 'Case Type') {
          const shortCode = name.substring(0, 4).toUpperCase();
          result = await config.logic.create({ name, short_code: shortCode });
        } else {
          result = await config.logic.create({ name, ...config.defaults });
        }
        if (tryGet(result)) created++;
      } catch { /* skip */ }
    }
    setMsg({ type: 'success', text: `${created} of ${names.length} ${entity}(s) created.` });
    setLines('');
    if (config.refresh) config.refresh();
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Enter {entity} names (one per line){!isSimple ? ' — short codes auto-generated' : ''}</label>
        <Textarea value={lines} onChange={(e) => setLines(e.target.value)} rows={8} placeholder={`Item 1\nItem 2\nItem 3`} />
      </div>
      <div className="form-actions" style={{ marginTop: 16 }}>
        <Button variant="primary" icon="plus" onClick={handleSubmit} disabled={saving || !lines.trim()}>
          {saving ? 'Creating...' : `Create All (${lines.split('\n').filter(Boolean).length})`}
        </Button>
      </div>
    </div>
  );
}

/* ============ Bulk Edit ============ */
function BulkEdit({ config, entity }) {
  const { items } = useItems(config.logic);
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggleItem = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const handleSubmit = async () => {
    if (!selected.length) { setMsg({ type: 'error', text: 'Select items to edit.' }); return; }
    setSaving(true); setMsg(null);
    let updated = 0;
    for (const id of selected) {
      try {
        const result = await config.logic.update(id, values);
        if (tryGet(result)) updated++;
      } catch { /* skip */ }
    }
    setMsg({ type: 'success', text: `${updated} of ${selected.length} updated.` });
    if (config.refresh) config.refresh();
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Select {entity}s to edit ({selected.length} selected)</label>
        <div className="crud-checkbox-list">
          {items.map((i) => (
            <label key={i.id} className="crud-checkbox-row">
              <input type="checkbox" checked={selected.includes(i.id)} onChange={() => toggleItem(i.id)} />
              {i.name}
            </label>
          ))}
        </div>
      </div>
      {selected.length > 0 && renderFields(config.fields, values, setValues)}
      {selected.length > 0 && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="save" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Updating...' : `Update Selected (${selected.length})`}
          </Button>
        </div>
      )}
    </div>
  );
}

/* ============ Bulk Delete ============ */
function BulkDelete({ config, entity }) {
  const { items, refresh } = useItems(config.logic);
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggleItem = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const handleDelete = async () => {
    setSaving(true); setMsg(null);
    let deleted = 0;
    for (const id of selected) {
      try {
        const result = await config.logic.remove(id);
        if (tryGet(result)) deleted++;
      } catch { /* skip */ }
    }
    setMsg({ type: 'success', text: `${deleted} of ${selected.length} deleted.` });
    setSelected([]); setConfirm(false);
    if (config.refresh) config.refresh();
    refresh();
    setSaving(false);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Select {entity}s to delete ({selected.length} selected)</label>
        <div className="crud-checkbox-list">
          {items.map((i) => (
            <label key={i.id} className="crud-checkbox-row">
              <input type="checkbox" checked={selected.includes(i.id)} onChange={() => toggleItem(i.id)} />
              {i.name}
            </label>
          ))}
        </div>
      </div>
      {selected.length > 0 && !confirm && (
        <Button variant="danger" icon="trash" onClick={() => setConfirm(true)}>Delete Selected ({selected.length})</Button>
      )}
      {confirm && (
        <div className="crud-confirm">
          <p>Delete {selected.length} {entity}(s)? This cannot be undone.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="danger" onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Yes, Delete All'}</Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ Bulk Import ============ */
function BulkImport({ config, entity }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
      const headers = lines[0]?.split(',').map((h) => h.trim().toLowerCase()) || [];
      const data = lines.slice(1).map((line) => {
        const vals = line.split(',').map((v) => v.trim());
        const obj = {};
        headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
        return obj;
      });
      setPreview(data.slice(0, 5));
    };
    reader.readAsText(f);
  };

  const handleImport = async () => {
    if (!file) { setMsg({ type: 'error', text: 'Select a file.' }); return; }
    setSaving(true); setMsg(null);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target.result;
      const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
      const headers = lines[0]?.split(',').map((h) => h.trim().toLowerCase()) || [];
      let imported = 0;
      for (let i = 1; i < lines.length; i++) {
        const vals = lines[i].split(',').map((v) => v.trim());
        const obj = {};
        headers.forEach((h, idx) => { obj[h] = vals[idx] || ''; });
        try {
          let result;
          if (entity === 'Stage') result = await config.logic.add(obj.name);
          else result = await config.logic.create(obj);
          if (tryGet(result)) imported++;
        } catch { /* skip */ }
      }
      setMsg({ type: 'success', text: `${imported} of ${lines.length - 1} imported.` });
      setFile(null); setPreview([]);
      if (config.refresh) config.refresh();
      setSaving(false);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <ActionToast msg={msg} />
      <div className="field">
        <label className="field__label">Upload CSV file</label>
        <input type="file" accept=".csv,.txt" onChange={handleFile} className="input" />
        <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>
          CSV format: first row = headers (e.g. name{config.fields.length > 1 ? ', short_code' : ''}). Additional columns ignored.
        </div>
      </div>
      {preview.length > 0 && (
        <div className="field">
          <label className="field__label">Preview (first {preview.length})</label>
          <div className="crud-preview">
            {preview.map((row, i) => <div key={i}>{JSON.stringify(row)}</div>)}
          </div>
        </div>
      )}
      {file && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="upload" onClick={handleImport} disabled={saving}>
            {saving ? 'Importing...' : `Import from ${file.name}`}
          </Button>
        </div>
      )}
    </div>
  );
}
