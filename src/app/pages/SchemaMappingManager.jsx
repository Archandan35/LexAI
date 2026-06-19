import React, { useEffect, useState } from 'react';
import { SchemaMappingService } from '@/services/schemaMappingService.js';
import { ProviderCapabilitiesService } from '@/services/providerCapabilitiesService.js';
import PageHeader from '@/components/PageHeader.jsx';
import Card from '@/components/Card.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';
import Spinner from '@/components/Spinner.jsx';

export default function SchemaMappingManager() {
  const [mappings, setMappings] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [unmapped, setUnmapped] = useState([]);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [exportData, setExportData] = useState(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true); setError('');
    try {
      const [m, c, u, v] = await Promise.all([
        SchemaMappingService.listMappings(),
        SchemaMappingService.detectConflicts(),
        SchemaMappingService.detectUnmapped(),
        SchemaMappingService.listVersions(),
      ]);
      setMappings(m); setConflicts(c); setUnmapped(u); setVersions(v);
    } catch (e) {
      setError(e.message || 'Failed to load mappings');
    }
    setLoading(false);
  };

  const handleSave = async (entityName) => {
    if (!editValue) return;
    await SchemaMappingService.setMapping(entityName, editValue, 'Updated via Schema Mapping Manager');
    setEditing(null); setEditValue('');
    loadAll();
  };

  const handleReset = async () => {
    if (!confirm('Reset all mappings to defaults? This cannot be undone.')) return;
    await SchemaMappingService.resetDefaults();
    loadAll();
  };

  const handleExport = async () => {
    const data = await SchemaMappingService.exportMappings();
    setExportData(JSON.stringify(data, null, 2));
  };

  const handleImport = async () => {
    const input = prompt('Paste JSON mapping data:');
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      const res = await SchemaMappingService.importMappings(parsed);
      if (res.ok) loadAll();
      else setError('Import failed: ' + (res.error || 'Unknown error'));
    } catch {
      setError('Invalid JSON');
    }
  };

  const handleSnapshot = async () => {
    const desc = prompt('Snapshot description:') || '';
    await SchemaMappingService.saveSnapshot(desc);
    loadAll();
  };

  if (loading) return <div className="page-center"><Spinner size={32} /></div>;

  return (
    <div className="fade-in">
      <PageHeader icon="database" title="Schema Mapping Manager"
        subtitle="Map LexAI entity names to provider-specific table and column names" />

      {error && <div className="alert alert--error"><Icon name="alert" size={16} /><span>{error}</span></div>}

      {/* Conflicts Banner */}
      {conflicts.length > 0 && (
        <div className="alert alert--warn dm-mb">
          <Icon name="alert" size={16} />
          <span>Mapping conflicts detected: {conflicts.map((c) => `"${c.table}" → ${c.entities.join(', ')}`).join('; ')}</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="toolbar-row dm-mb" style={{ gap: 8, flexWrap: 'wrap' }}>
        <Button variant="outline" size="sm" icon="download" onClick={handleExport}>Export Mapping</Button>
        <Button variant="outline" size="sm" icon="upload" onClick={handleImport}>Import Mapping</Button>
        <Button variant="outline" size="sm" icon="save" onClick={handleSnapshot}>Save Snapshot</Button>
        <Button variant="ghost" size="sm" icon="refresh" onClick={loadAll}>Refresh</Button>
        <Button variant="ghost" size="sm" icon="reset" onClick={handleReset}>Reset Defaults</Button>
      </div>

      {/* Mapping Table */}
      <Card>
        <table className="data-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Provider Table</th>
              <th>Fields</th>
              <th>Active</th>
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mappings.length === 0 && (
              <tr><td colSpan={6} className="text-muted" style={{ textAlign: 'center' }}>No mappings configured</td></tr>
            )}
            {mappings.map((m) => (
              <tr key={m.id || m.entity_name}>
                <td><code>{m.entity_name}</code></td>
                <td>
                  {editing === m.entity_name ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave(m.entity_name)}
                        style={{ width: 140 }} />
                      <Button size="xs" variant="primary" onClick={() => handleSave(m.entity_name)}>Save</Button>
                      <Button size="xs" variant="ghost" onClick={() => setEditing(null)}>X</Button>
                    </div>
                  ) : (
                    <code>{m.provider_table}</code>
                  )}
                </td>
                <td><span className="text-muted">{(m.fields || []).length} fields</span></td>
                <td>{m.active ? <span className="badge badge--success">Active</span> : <span className="badge badge--muted">Inactive</span>}</td>
                <td>{m.version || 1}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <Button size="xs" variant="ghost" icon="edit"
                      onClick={() => { setEditing(m.entity_name); setEditValue(m.provider_table); }}>Edit</Button>
                    {m.active && (
                      <Button size="xs" variant="ghost" icon="trash"
                        onClick={async () => { await SchemaMappingService.removeMapping(m.entity_name); loadAll(); }}>Remove</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Unmapped Entities */}
      {unmapped.length > 0 && (
        <Card className="dm-mt">
          <h3 className="card-title">Unmapped Entities ({unmapped.length})</h3>
          <p className="auth-sub--sm">These entities use their name as the default table name.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {unmapped.map((name) => (
              <span key={name} className="badge badge--muted">{name}</span>
            ))}
          </div>
        </Card>
      )}

      {/* Export Preview */}
      {exportData && (
        <Card className="dm-mt">
          <h3 className="card-title">Exported Mapping JSON</h3>
          <pre className="code-block" style={{ maxHeight: 300, overflow: 'auto' }}>{exportData}</pre>
          <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(exportData); setExportData(null); }}
            style={{ marginTop: 8 }}>Copy to Clipboard</Button>
        </Card>
      )}

      {/* Version History */}
      {versions.length > 0 && (
        <Card className="dm-mt">
          <h3 className="card-title">Mapping Versions ({versions.length})</h3>
          <table className="data-table">
            <thead>
              <tr><th>Version</th><th>Description</th><th>Created At</th></tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id}>
                  <td>{v.version}</td>
                  <td>{v.description || '-'}</td>
                  <td>{v.created_at ? new Date(v.created_at).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
