import { useState } from 'react';
import { useAuth } from '@/data-layer/AuthContext.jsx';
import { useToast } from '@/data-layer/ToastContext.jsx';
import { backupLogic } from '@/logic/backupLogic.js';
import { databaseAdminService } from '@/services/databaseAdminService.js';
import { downloadFile } from '@/utils/exportData.js';
import { bytes } from '@/utils/format.js';
import PageHeader from '@/components/PageHeader.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';

const FORMATS = [
  { value: 'udb', label: '.udb (Universal Database)' },
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
  { value: 'sql', label: 'SQL' },
];

export default function DmcExportCenter() {
  const toast = useToast();
  const { user } = useAuth();
  const [format, setFormat] = useState('udb');
  const [scope, setScope] = useState('full');
  const [includeAttachments, setIncludeAttachments] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [compress, setCompress] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [done, setDone] = useState(false);

  const estimateSize = async () => {
    try {
      const udb = await databaseAdminService.exportUdb();
      const size = new Blob([JSON.stringify(udb)]).size;
      setEstimate({ size, collections: Object.keys(udb.data || {}).length });
      toast.push(`Estimated size: ${bytes(size)}`, 'info');
    } catch { toast.push('Could not estimate size.', 'error'); }
  };

  const generate = async () => {
    setGenerating(true);
    try {
      if (format === 'udb') {
        const res = await backupLogic.create({ type: 'export' }, user);
        if (res.ok) {
          backupLogic.export(res.value.backup.id);
          setDone(true);
          toast.push('Export generated.', 'success');
        } else {
          toast.push(res.error, 'error');
        }
      } else if (format === 'json') {
        const udb = await databaseAdminService.exportUdb();
        const payload = includeAttachments ? udb : { ...udb, attachments: undefined };
        downloadFile(`export_${Date.now()}.json`, JSON.stringify(payload, null, 2), 'application/json');
        setDone(true);
      } else {
        toast.push('Format not implemented.', 'error');
      }
    } catch (e) {
      toast.push(e?.message || 'Export failed.', 'error');
    }
    setGenerating(false);
  };

  const reset = () => { setDone(false); setEstimate(null); };

  return (
    <>
      <PageHeader icon="upload" title="Export Center" subtitle="Export database data in multiple formats with advanced options." />

      <div className="dmc-section">
        <div className="dmc-section__title"><Icon name="layers" size={17} /> Export Options</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-soft)', marginBottom: 4 }}>Format</label>
            <select className="dmc-select" value={format} onChange={(e) => setFormat(e.target.value)} style={{ width: '100%' }}>
              {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-soft)', marginBottom: 4 }}>Scope</label>
            <select className="dmc-select" value={scope} onChange={(e) => setScope(e.target.value)} style={{ width: '100%' }}>
              <option value="full">Full Database</option>
              <option value="schema">Schema Only</option>
              <option value="data">Data Only</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={includeAttachments} onChange={() => setIncludeAttachments(!includeAttachments)} /> Include file metadata
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={includeMetadata} onChange={() => setIncludeMetadata(!includeMetadata)} /> Include audit logs
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={compress} onChange={() => setCompress(!compress)} /> Compress archive
          </label>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <Button variant="ghost" size="sm" onClick={estimateSize}>Estimate Size</Button>
          <Button variant="primary" onClick={generate} disabled={generating}>{generating ? 'Generating…' : 'Generate Export'}</Button>
          {done && <Button variant="ghost" onClick={reset}>New Export</Button>}
        </div>

        {estimate && (
          <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-soft)' }}>
            Estimated: {bytes(estimate.size)} · {estimate.collections} collections
          </div>
        )}

        {done && (
          <div style={{ marginTop: 16, padding: 14, background: 'var(--green-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--green)', fontSize: 13 }}>
            <Icon name="check" size={15} /> Export complete. File download started.
          </div>
        )}
      </div>
    </>
  );
}
