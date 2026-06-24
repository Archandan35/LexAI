import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { Input, Textarea, Select } from './Field.jsx';

export default function CrudManager({ open, onClose, entity, config }) {
  if (!open) return null;

  const [mode, setMode] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  if (!mode) {
    return (
      <Modal open={open} title={`${entity} Management`} onClose={onClose} size="lg"
        footer={<Button variant="ghost" onClick={onClose}>Close</Button>}>
        <div className="crud-dashboard">
          <CrudCard icon="plus" label="Single Add" desc={`Add one ${entity}`} color="var(--accent)" onClick={() => setMode('single-add')} />
          <CrudCard icon="edit" label="Single Edit" desc={`Edit one ${entity}`} color="var(--gold)" onClick={() => setMode('single-edit')} />
          <CrudCard icon="trash" label="Single Delete" desc={`Delete one ${entity}`} color="var(--danger)" onClick={() => setMode('single-delete')} />
          <CrudCard icon="plus" label="Bulk Add" desc={`Add multiple ${entity}s`} color="var(--accent)" onClick={() => setMode('bulk-add')} />
          <CrudCard icon="edit" label="Bulk Edit" desc={`Edit multiple ${entity}s`} color="var(--gold)" onClick={() => setMode('bulk-edit')} />
          <CrudCard icon="trash" label="Bulk Delete" desc={`Delete multiple ${entity}s`} color="var(--danger)" onClick={() => setMode('bulk-delete')} />
          <CrudCard icon="upload" label="Bulk Import" desc={`Import ${entity}s from file`} color="var(--text-soft)" onClick={() => setMode('bulk-import')} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} title={`${entity} — ${modeLabel(mode)}`} onClose={() => { setMode(null); onClose(); }} size="lg"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" onClick={() => setMode(null)}>Back</Button>
        </div>
      }>
      {message && (
        <div className={`crud-toast crud-toast--${message.type}`}>
          <Icon name={message.type === 'success' ? 'check' : 'alert'} size={16} />
          {message.text}
        </div>
      )}
      <ModeContent mode={mode} config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} onClose={() => { setMode(null); onClose(); }} />
    </Modal>
  );
}

function CrudCard({ icon, label, desc, color, onClick }) {
  return (
    <button type="button" className="crud-card" onClick={onClick}>
      <div className="crud-card__icon" style={{ background: color }}><Icon name={icon} size={22} /></div>
      <div className="crud-card__label">{label}</div>
      <div className="crud-card__desc">{desc}</div>
    </button>
  );
}

function modeLabel(mode) {
  const map = {
    'single-add': 'Single Add',
    'single-edit': 'Single Edit',
    'single-delete': 'Single Delete',
    'bulk-add': 'Bulk Add',
    'bulk-edit': 'Bulk Edit',
    'bulk-delete': 'Bulk Delete',
    'bulk-import': 'Bulk Import',
  };
  return map[mode] || mode;
}

function ModeContent({ mode, config, entity, setSaving, setMessage, onClose }) {
  switch (mode) {
    case 'single-add': return <SingleAdd config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'single-edit': return <SingleEdit config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'single-delete': return <SingleDelete config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'bulk-add': return <BulkAdd config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'bulk-edit': return <BulkEdit config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'bulk-delete': return <BulkDelete config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    case 'bulk-import': return <BulkImport config={config} entity={entity} setSaving={setSaving} setMessage={setMessage} />;
    default: return <div>Unknown mode</div>;
  }
}

/* ---------- Single Add ---------- */
function SingleAdd({ config, entity, setSaving, setMessage }) {
  const [values, setValues] = useState({});

  const handleSubmit = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const result = await config.logic.create(values);
      if (result && (result.ok || result.id)) {
        setMessage({ type: 'success', text: `${entity} created successfully!` });
        setValues({});
        if (config.refresh) config.refresh();
      } else {
        setMessage({ type: 'error', text: result?.error || 'Failed to create.' });
      }
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  return (
    <div>
      {config.fields.map((f) => (
        <div key={f.key} className="field">
          <label className="field__label">{f.label}</label>
          {f.type === 'color' ? (
            <input type="color" className="input" value={values[f.key] || f.default || '#6b7280'} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          ) : (
            <Input value={values[f.key] || ''} placeholder={f.placeholder || f.label} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      <div className="form-actions" style={{ marginTop: 16 }}>
        <Button variant="primary" icon="plus" onClick={handleSubmit}>Add {entity}</Button>
      </div>
    </div>
  );
}

/* ---------- Single Edit ---------- */
function SingleEdit({ config, entity, setSaving, setMessage }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [values, setValues] = useState({});

  useEffect(() => {
    config.logic.list().then((r) => setItems(Array.isArray(r) ? r : [])).catch(() => setItems([]));
  }, [config.logic]);

  const handleSelect = (id) => {
    setSelected(id);
    const item = items.find((i) => i.id === id || i.name === id);
    if (item) {
      const vals = {};
      config.fields.forEach((f) => { vals[f.key] = item[f.key] || ''; });
      setValues(vals);
    }
  };

  const handleSubmit = async () => {
    if (!selected) { setMessage({ type: 'error', text: 'Select an item to edit.' }); return; }
    setSaving(true);
    setMessage(null);
    try {
      const item = items.find((i) => i.id === selected || i.name === selected);
      const result = await config.logic.update(item?.id || selected, values);
      if (result && (result.ok || result.id)) {
        setMessage({ type: 'success', text: `${entity} updated successfully!` });
        if (config.refresh) config.refresh();
      } else {
        setMessage({ type: 'error', text: result?.error || 'Failed to update.' });
      }
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  const selectOptions = items.map((i) => ({ value: i.id || i.name, label: i.name }));

  return (
    <div>
      <div className="field">
        <label className="field__label">Select {entity}</label>
        <Select value={selected} onChange={(e) => handleSelect(e.target.value)}>
          <option value="">Select...</option>
          {selectOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      </div>
      {selected && config.fields.map((f) => (
        <div key={f.key} className="field">
          <label className="field__label">{f.label}</label>
          {f.type === 'color' ? (
            <input type="color" className="input" value={values[f.key] || '#6b7280'} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          ) : (
            <Input value={values[f.key] || ''} placeholder={f.label} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      {selected && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="save" onClick={handleSubmit}>Update {entity}</Button>
        </div>
      )}
    </div>
  );
}

/* ---------- Single Delete ---------- */
function SingleDelete({ config, entity, setSaving, setMessage }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    config.logic.list().then((r) => setItems(Array.isArray(r) ? r : [])).catch(() => setItems([]));
  }, [config.logic]);

  const handleDelete = async () => {
    if (!selected) return;
    setSaving(true);
    setMessage(null);
    try {
      const item = items.find((i) => i.id === selected || i.name === selected);
      const result = await config.logic.remove(item?.id || selected);
      if (result && (result.ok || result.deleted)) {
        setMessage({ type: 'success', text: `${entity} deleted successfully!` });
        setSelected('');
        setConfirm(false);
        if (config.refresh) config.refresh();
        const updated = await config.logic.list();
        setItems(Array.isArray(updated) ? updated : []);
      } else {
        setMessage({ type: 'error', text: result?.error || 'Failed to delete.' });
      }
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
    setSaving(false);
  };

  const selectOptions = items.map((i) => ({ value: i.id || i.name, label: i.name }));

  return (
    <div>
      <div className="field">
        <label className="field__label">Select {entity} to delete</label>
        <Select value={selected} onChange={(e) => { setSelected(e.target.value); setConfirm(false); }}>
          <option value="">Select...</option>
          {selectOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      </div>
      {selected && !confirm && (
        <Button variant="danger" icon="trash" onClick={() => setConfirm(true)}>Delete Selected</Button>
      )}
      {confirm && (
        <div style={{ marginTop: 12, padding: 12, background: 'var(--bg-subtle)', borderRadius: 10 }}>
          <p style={{ margin: '0 0 8px' }}>Are you sure you want to delete this {entity}?</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Bulk Add ---------- */
function BulkAdd({ config, entity, setSaving, setMessage }) {
  const [lines, setLines] = useState('');

  const handleSubmit = async () => {
    const names = lines.split('\n').map((s) => s.trim()).filter(Boolean);
    if (!names.length) { setMessage({ type: 'error', text: 'Enter at least one item.' }); return; }
    setSaving(true);
    setMessage(null);
    let created = 0;
    for (const name of names) {
      try {
        const result = await config.logic.create({ name, ...config.defaults });
        if (result && (result.ok || result.id)) created++;
      } catch { /* skip */ }
    }
    setMessage({ type: 'success', text: `${created} of ${names.length} ${entity}s created.` });
    setLines('');
    if (config.refresh) config.refresh();
    setSaving(false);
  };

  return (
    <div>
      <div className="field">
        <label className="field__label">Enter {entity} names (one per line)</label>
        <Textarea value={lines} onChange={(e) => setLines(e.target.value)} rows={8} placeholder={`Item 1\nItem 2\nItem 3`} />
      </div>
      <div className="form-actions" style={{ marginTop: 16 }}>
        <Button variant="primary" icon="plus" onClick={handleSubmit}>Add All</Button>
      </div>
    </div>
  );
}

/* ---------- Bulk Edit ---------- */
function BulkEdit({ config, entity, setSaving, setMessage }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    config.logic.list().then((r) => setItems(Array.isArray(r) ? r : [])).catch(() => setItems([]));
  }, [config.logic]);

  const toggleItem = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    if (!selected.length) { setMessage({ type: 'error', text: 'Select items to edit.' }); return; }
    setSaving(true);
    setMessage(null);
    let updated = 0;
    for (const id of selected) {
      try {
        const result = await config.logic.update(id, values);
        if (result && (result.ok || result.id)) updated++;
      } catch { /* skip */ }
    }
    setMessage({ type: 'success', text: `${updated} of ${selected.length} ${entity}s updated.` });
    if (config.refresh) config.refresh();
    setSaving(false);
  };

  return (
    <div className="crud-bulk-edit">
      <div className="field">
        <label className="field__label">Select {entity}s to edit</label>
        <div className="crud-checkbox-list">
          {items.map((i) => (
            <label key={i.id || i.name} className="crud-checkbox-row">
              <input type="checkbox" checked={selected.includes(i.id || i.name)} onChange={() => toggleItem(i.id || i.name)} />
              {i.name}
            </label>
          ))}
        </div>
      </div>
      {selected.length > 0 && config.fields.map((f) => (
        <div key={f.key} className="field">
          <label className="field__label">{f.label} <span style={{ fontWeight: 400, color: 'var(--text-faint)' }}>(applied to all selected)</span></label>
          {f.type === 'color' ? (
            <input type="color" className="input" value={values[f.key] || f.default || '#6b7280'} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          ) : (
            <Input value={values[f.key] || ''} placeholder={f.placeholder || f.label} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      {selected.length > 0 && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="save" onClick={handleSubmit}>Update Selected ({selected.length})</Button>
        </div>
      )}
    </div>
  );
}

/* ---------- Bulk Delete ---------- */
function BulkDelete({ config, entity, setSaving, setMessage }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    config.logic.list().then((r) => setItems(Array.isArray(r) ? r : [])).catch(() => setItems([]));
  }, [config.logic]);

  const toggleItem = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleDelete = async () => {
    setSaving(true);
    setMessage(null);
    let deleted = 0;
    for (const id of selected) {
      try {
        const result = await config.logic.remove(id);
        if (result && (result.ok || result.deleted)) deleted++;
      } catch { /* skip */ }
    }
    setMessage({ type: 'success', text: `${deleted} of ${selected.length} ${entity}s deleted.` });
    setSelected([]);
    setConfirm(false);
    if (config.refresh) config.refresh();
    const updated = await config.logic.list();
    setItems(Array.isArray(updated) ? updated : []);
    setSaving(false);
  };

  return (
    <div>
      <div className="field">
        <label className="field__label">Select {entity}s to delete</label>
        <div className="crud-checkbox-list">
          {items.map((i) => (
            <label key={i.id || i.name} className="crud-checkbox-row">
              <input type="checkbox" checked={selected.includes(i.id || i.name)} onChange={() => toggleItem(i.id || i.name)} />
              {i.name}
            </label>
          ))}
        </div>
      </div>
      {selected.length > 0 && !confirm && (
        <Button variant="danger" icon="trash" onClick={() => setConfirm(true)}>Delete Selected ({selected.length})</Button>
      )}
      {confirm && (
        <div style={{ marginTop: 12, padding: 12, background: 'var(--bg-subtle)', borderRadius: 10 }}>
          <p style={{ margin: '0 0 8px' }}>Delete {selected.length} {entity}(s)? This cannot be undone.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="danger" onClick={handleDelete}>Yes, Delete All</Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Bulk Import ---------- */
function BulkImport({ config, entity, setSaving, setMessage }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

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
    if (!file) { setMessage({ type: 'error', text: 'Select a file to import.' }); return; }
    setSaving(true);
    setMessage(null);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target.result;
      const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
      const headers = lines[0]?.split(',').map((h) => h.trim().toLowerCase()) || [];
      let imported = 0;
      for (let i = 1; i < lines.length; i++) {
        const vals = lines[i].split(',').map((v) => v.trim());
        const obj = {};
        headers.forEach((h, idx) => { obj[h === 'name' ? 'name' : h] = vals[idx] || ''; });
        try {
          const result = await config.logic.create(obj);
          if (result && (result.ok || result.id)) imported++;
        } catch { /* skip */ }
      }
      setMessage({ type: 'success', text: `${imported} of ${lines.length - 1} ${entity}s imported.` });
      setFile(null);
      setPreview([]);
      if (config.refresh) config.refresh();
      setSaving(false);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="field">
        <label className="field__label">Upload CSV file</label>
        <input type="file" accept=".csv,.txt" onChange={handleFile} className="input" />
        <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>CSV format: first row = headers (name, display_order, etc.)</div>
      </div>
      {preview.length > 0 && (
        <div className="field">
          <label className="field__label">Preview (first {preview.length} rows)</label>
          <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: 12, fontSize: 13, fontFamily: 'monospace' }}>
            {preview.map((row, i) => <div key={i}>{JSON.stringify(row)}</div>)}
          </div>
        </div>
      )}
      {file && (
        <div className="form-actions" style={{ marginTop: 16 }}>
          <Button variant="primary" icon="upload" onClick={handleImport}>Import {entity}s</Button>
        </div>
      )}
    </div>
  );
}
