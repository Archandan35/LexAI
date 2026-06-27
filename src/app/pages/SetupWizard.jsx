import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon.jsx';
import Button from '@/components/Button.jsx';
import Spinner from '@/components/Spinner.jsx';
import { Field, Input } from '@/components/Field.jsx';
import { databaseManagerLogic } from '@/logic/databaseManagerLogic.js';
import { InstallationPlanner } from '@/installer-engine/InstallationPlanner.js';
import { InstallationExecutor } from '@/installer-engine/InstallationExecutor.js';
import { ConnectionTester } from '@/installer-engine/ConnectionTester.js';
import { ValidationEngine } from '@/installer-engine/ValidationEngine.js';
import { UploadAnalyzer } from '@/installer-engine/UploadAnalyzer.js';
import { databaseScannerService } from '@/services/databaseScannerService.js';
import { blueprintComparatorService } from '@/services/blueprintComparatorService.js';
import { recommendationService } from '@/services/recommendationService.js';
import BackendStatusPanel from '@/components/BackendStatusPanel.jsx';
import { backendConfig } from '@/config/backend.js';
import { getDatabaseProvider } from '@/providers/database/index.js';
import DebugPanel, { useLogCapture } from '@/components/DebugPanel.jsx';

const METHODS = [
  { id: 'simple', icon: 'bolt', label: 'Simple Setup', desc: 'Project URL + API key — ideal for Supabase' },
  { id: 'advanced', icon: 'gear', label: 'Advanced Setup', desc: 'Direct database credentials — power users' },
  { id: 'copy', icon: 'copy', label: 'Copy-Paste Setup', desc: 'Generate SQL for manual execution' },
  { id: 'upload', icon: 'upload', label: 'Database Upload', desc: 'Restore from .udb, SQL, or JSON file' },
];

const STEPS_SIMPLE = ['Connect', 'Detect', 'Scan', 'Review', 'Preview & Execute', 'Verify', 'Ready'];
const STEPS_ADVANCED = ['Connect', 'Test Connection', 'Detect Engine', 'Install', 'Seed', 'Verify', 'Ready'];
const STEPS_COPY = ['Analyze', 'Generate SQL', 'Review SQL', 'Execute SQL', 'Verify', 'Ready'];
const STEPS_UPLOAD = ['Upload', 'Analyze', 'Compare Schema', 'Import', 'Restore', 'Verify', 'Ready'];

function StepIndicator({ steps, current, progress }) {
  return (
    <div className="wizard-steps">
      {steps.map((label, i) => {
        const idx = i + 1;
        let cls = 'wizard-step';
        let icon = null;
        if (progress && progress.step > idx) { cls += ' wizard-step--done'; icon = <Icon name="check" size={13} />; }
        else if (progress && progress.step === idx) { cls += ' wizard-step--active'; icon = <Spinner />; }
        else if (current > idx) { cls += ' wizard-step--done'; icon = <Icon name="check" size={13} />; }
        else if (current === idx) { cls += ' wizard-step--current'; }
        else { cls += ' wizard-step--pending'; }
        return (
          <div key={label} className={cls}>
            <span className="wizard-step__icon">{icon || <span className="wizard-step__num">{idx}</span>}</span>
            <span className="wizard-step__label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MethodCard({ method, selected, onSelect }) {
  const cls = `wizard-method${selected ? ' wizard-method--selected' : ''}`;
  return (
    <button className={cls} onClick={() => onSelect(method.id)}>
      <span className="wizard-method__icon"><Icon name={method.icon} size={22} /></span>
      <div>
        <div className="wizard-method__title">{method.label}</div>
        <div className="wizard-method__desc">{method.desc}</div>
      </div>
      <span className="wizard-method__radio">{selected ? <Icon name="check" size={16} /> : null}</span>
    </button>
  );
}

function SummaryBadge({ count, label, kind }) {
  const color = kind === 'healthy' ? 'var(--success)' : kind === 'critical' ? 'var(--error)' : kind === 'warning' ? 'var(--warning)' : 'var(--text-muted)';
  return (
    <div className="wizard-badge" style={{ borderLeftColor: color }}>
      <div className="wizard-badge__count" style={{ color }}>{count}</div>
      <div className="wizard-badge__label">{label}</div>
    </div>
  );
}

function HealthReport({ comparison }) {
  if (!comparison?.ok) return null;
  const s = comparison.summary;
  return (
    <div className="dm-mt">
      <h3 className="wizard-section-title">Database Health Summary</h3>
      <div className="wizard-badges">
        <SummaryBadge count={s.healthyTables} label="Healthy Tables" kind="healthy" />
        <SummaryBadge count={s.missingTables} label="Missing Tables" kind={s.missingTables > 0 ? 'critical' : 'healthy'} />
        <SummaryBadge count={s.extraTables} label="Unknown Tables" kind={s.extraTables > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.missingIndexes} label="Missing Indexes" kind={s.missingIndexes > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.missingPolicies} label="Missing Policies" kind={s.missingPolicies > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.missingFunctions} label="Missing Functions" kind={s.missingFunctions > 0 ? 'critical' : 'healthy'} />
        <SummaryBadge count={s.missingTriggers} label="Missing Triggers" kind={s.missingTriggers > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.missingFks} label="Missing FKs" kind={s.missingFks > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.brokenFks} label="Broken FKs" kind={s.brokenFks > 0 ? 'critical' : 'healthy'} />
        <SummaryBadge count={s.missingExtensions} label="Missing Extensions" kind={s.missingExtensions > 0 ? 'warning' : 'healthy'} />
        <SummaryBadge count={s.missingRoles} label="Missing Roles" kind={s.missingRoles > 0 ? 'critical' : 'healthy'} />
        <SummaryBadge count={s.extraPolicies} label="Unknown Policies" kind={s.extraPolicies > 0 ? 'info' : 'healthy'} />
        <SummaryBadge count={s.extraIndexes} label="Unknown Indexes" kind={s.extraIndexes > 0 ? 'info' : 'healthy'} />
      </div>
    </div>
  );
}

function FindingRow({ finding, selected, onToggle, expanded, onExpand }) {
  const severityColor = finding.severity === 'critical' ? 'var(--error)' : finding.severity === 'warning' ? 'var(--warning)' : 'var(--text-muted)';
  return (
      <div className={`wizard-finding ${expanded ? 'wizard-finding--expanded' : ''}`}>
        <div className="wizard-finding__row" onClick={onExpand}>
          <span className="wizard-finding__severity" style={{ color: severityColor }}>
            <Icon name={finding.severity === 'critical' || finding.severity === 'warning' ? 'alert' : 'info'} size={14} />
          </span>
        <span className="wizard-finding__label">{finding.label}</span>
        <span className="wizard-finding__action">{finding.action}</span>
        <span className="wizard-finding__target">{finding.target}</span>
        <label className="wizard-finding__checkbox" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={selected} onChange={() => onToggle(finding.id)} />
        </label>
      </div>
      {expanded && (
        <div className="wizard-finding__detail">
          {finding.description}
          {finding.sql && <pre className="code-block code-block--sm dm-mt">{finding.sql}</pre>}
        </div>
      )}
    </div>
  );
}

function FindingCategory({ title, findings, selectedIds, onToggle, kind }) {
  if (!findings || findings.length === 0) return null;
  const [expandedId, setExpandedId] = useState(null);
  const allSelected = findings.every((f) => selectedIds.has(f.id));
  const someSelected = findings.some((f) => selectedIds.has(f.id));
  return (
    <div className="dm-mt">
      <div className="flex-row gap-8" style={{ alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, flex: 1 }}>{title} ({findings.length})</h4>
        <label className="flex-row gap-4" style={{ fontSize: 13, cursor: 'pointer', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
            onChange={() => {
              for (const f of findings) {
                if (allSelected) {
                  if (selectedIds.has(f.id)) onToggle(f.id);
                } else {
                  if (!selectedIds.has(f.id)) onToggle(f.id);
                }
              }
            }}
          />
          Select all
        </label>
      </div>
      {findings.map((f) => (
        <FindingRow
          key={f.id}
          finding={f}
          selected={selectedIds.has(f.id)}
          onToggle={onToggle}
          expanded={expandedId === f.id}
          onExpand={() => setExpandedId(expandedId === f.id ? null : f.id)}
        />
      ))}
    </div>
  );
}

function ChangePreview({ recommendations, selectedIds }) {
  const selected = recommendations.filter((r) => selectedIds.has(r.id));
  if (selected.length === 0) {
    return <div className="alert alert--info dm-mt"><Icon name="info" size={16} /><span>No changes selected for preview.</span></div>;
  }
  const categorized = {};
  for (const r of selected) {
    if (!categorized[r.category]) categorized[r.category] = [];
    categorized[r.category].push(r);
  }
  return (
    <div className="dm-mt">
      <h3 className="wizard-section-title">Change Preview — {selected.length} action{selected.length !== 1 ? 's' : ''}</h3>
      {Object.entries(categorized).map(([cat, items]) => (
        <div key={cat} className="dm-mt">
          <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, marginBottom: 6, textTransform: 'capitalize' }}>{cat} ({items.length})</h4>
          {items.map((r) => (
            <div key={r.id} className="wizard-preview-item">
              <div className="flex-row gap-8" style={{ alignItems: 'center' }}>
                <span className="wizard-preview-item__action">{r.action}</span>
                <span className="wizard-preview-item__target">{r.target}</span>
              </div>
              {r.sql && <pre className="code-block code-block--sm dm-mt">{r.sql}</pre>}
              {!r.sql && r.label && <div className="wizard-preview-item__note">Requires SQL generation (approved for creation).</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CertificationReport({ preScan, postScan }) {
  if (!preScan || !postScan) return null;
  const pre = preScan.comparison;
  const post = postScan.comparison;
  const fixed = {
    tables: (pre?.summary?.missingTables || 0) - (post?.summary?.missingTables || 0),
    indexes: (pre?.summary?.missingIndexes || 0) - (post?.summary?.missingIndexes || 0),
    policies: (pre?.summary?.missingPolicies || 0) - (post?.summary?.missingPolicies || 0),
    functions: (pre?.summary?.missingFunctions || 0) - (post?.summary?.missingFunctions || 0),
    triggers: (pre?.summary?.missingTriggers || 0) - (post?.summary?.missingTriggers || 0),
    fks: (pre?.summary?.missingFks || 0) - (post?.summary?.missingFks || 0),
  };
  const remainingIssues = (post?.summary?.missingTables || 0) + (post?.summary?.missingFunctions || 0) + (post?.summary?.missingPolicies || 0);
  const passed = remainingIssues === 0;
  return (
    <div className="dm-mt">
      <h3 className="wizard-section-title">Certification Report</h3>
      <div className={`alert ${passed ? 'alert--success' : 'alert--warn'}`} style={{ marginBottom: 16 }}>
        <Icon name={passed ? 'check' : 'alert'} size={16} />
        <span>{passed ? 'All blueprint items verified — database is healthy.' : `${remainingIssues} issue${remainingIssues !== 1 ? 's' : ''} remaining.`}</span>
      </div>
      <div className="wizard-cert-grid">
        <div className="wizard-cert-item">
          <span>Tables</span>
          <span className="wizard-cert-item__fixed">{fixed.tables > 0 ? `+${fixed.tables}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingTables || 0} missing</span>
        </div>
        <div className="wizard-cert-item">
          <span>Indexes</span>
          <span className="wizard-cert-item__fixed">{fixed.indexes > 0 ? `+${fixed.indexes}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingIndexes || 0} missing</span>
        </div>
        <div className="wizard-cert-item">
          <span>Policies</span>
          <span className="wizard-cert-item__fixed">{fixed.policies > 0 ? `+${fixed.policies}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingPolicies || 0} missing</span>
        </div>
        <div className="wizard-cert-item">
          <span>Functions</span>
          <span className="wizard-cert-item__fixed">{fixed.functions > 0 ? `+${fixed.functions}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingFunctions || 0} missing</span>
        </div>
        <div className="wizard-cert-item">
          <span>Triggers</span>
          <span className="wizard-cert-item__fixed">{fixed.triggers > 0 ? `+${fixed.triggers}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingTriggers || 0} missing</span>
        </div>
        <div className="wizard-cert-item">
          <span>Foreign Keys</span>
          <span className="wizard-cert-item__fixed">{fixed.fks > 0 ? `+${fixed.fks}` : '—'}</span>
          <span className="wizard-cert-item__remaining">{post?.summary?.missingFks || 0} missing</span>
        </div>
      </div>
    </div>
  );
}

export default function SetupWizard({ detectError: propDetectError }) {
  const { logs, clearLogs, copyLogs } = useLogCapture();
  const [method, setMethod] = useState(null);
  const [step, setStep] = useState(1);
  const [detect, setDetect] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(null);
  const [sql, setSql] = useState('');
  const [plan, setPlan] = useState(null);
  const [installResult, setInstallResult] = useState(null);
  const [validateResult, setValidateResult] = useState(null);
  const [execSqlSupported, setExecSqlSupported] = useState(false);
  const [execSqlBusy, setExecSqlBusy] = useState(false);
  const [execSqlError, setExecSqlError] = useState('');
  const [execSqlDone, setExecSqlDone] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sqlCopied, setSqlCopied] = useState(false);
  const [copySql, setCopySql] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadAnalysis, setUploadAnalysis] = useState(null);
  const [execPhase, setExecPhase] = useState(null);
  const [preScan, setPreScan] = useState(null);
  const [postScan, setPostScan] = useState(null);
  const fileRef = useRef(null);

  // Simple Setup
  const [projectUrl, setProjectUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');

  // Advanced Setup
  const [advHost, setAdvHost] = useState('');
  const [advPort, setAdvPort] = useState('5432');
  const [advDb, setAdvDb] = useState('');
  const [advUser, setAdvUser] = useState('');
  const [advPassword, setAdvPassword] = useState('');

  const currentSteps = method === 'simple' ? STEPS_SIMPLE
    : method === 'advanced' ? STEPS_ADVANCED
    : method === 'copy' ? STEPS_COPY
    : method === 'upload' ? STEPS_UPLOAD
    : [];

  const refresh = useCallback(async () => {
    setError('');
    setProgress({ step: 2, total: 7, label: 'Detecting schema...', status: 'working' });
    const res = await databaseManagerLogic.detect((p) => {
      setProgress({ step: 2 + (p.step / p.total) * 0.9, total: 7, label: p.label, status: 'working' });
    });
    if (res.ok) {
      const d = res.data;
      setDetect(d);
      if (d.authError) setError(`Auth error: ${d.authError}.`);
      if (d.partialInstall) setSql('');
      setProgress({ step: 3, total: 7, label: 'Schema detected', status: 'done' });
    } else {
      setError(res.error || 'Detection failed.');
      setProgress(null);
    }
    return res;
  }, []);

  const goToStep = (s) => { setStep(Math.min(s, currentSteps.length)); setError(''); };

  const handleMethodSelect = (m) => {
    setMethod(m);
    setStep(1);
    setError('');
    setResult(null);
    setSql('');
    setPlan(null);
    setInstallResult(null);
    setValidateResult(null);
    setCopySql('');
    setUploadAnalysis(null);
    setUploadFile(null);
    setScanResult(null);
    setComparison(null);
    setRecommendations([]);
    setSelectedIds(new Set());
    setExecPhase(null);
    setPreScan(null);
    setPostScan(null);
  };

  const runScanAndCompare = async () => {
    const scan = await databaseScannerService.scanAll();
    if (!scan.ok) { throw new Error(scan.error || 'Database scan failed.'); }
    setScanResult(scan);
    const cmp = blueprintComparatorService.compare(scan);
    setComparison(cmp);
    const recs = recommendationService.generate(cmp.findings || {});
    setRecommendations(recs);
    setSelectedIds(new Set(recs.filter((r) => r.severity !== 'improvement').map((r) => r.id)));
    return { scan, comparison: cmp, recommendations: recs };
  };

  const findGetSql = (recommendation) => {
    if (recommendation.sql) return recommendation.sql;
    return null;
  };

  const getApprovedSql = () => {
    const approved = recommendations.filter((r) => selectedIds.has(r.id));
    return approved.map((r) => findGetSql(r)).filter(Boolean).join('\n\n');
  };

  // --- SIMPLE SETUP ---
  const handleSimpleConnect = async () => {
    if (!projectUrl || !anonKey) { setError('Project URL and Anon Key are required.'); return; }
    setBusy(true); setError(''); setProgress(null);
    try {
      const res = await ConnectionTester.testBackend(projectUrl, anonKey);
      if (!res.ok) { setError(res.error || 'Connection failed.'); setBusy(false); return; }
      goToStep(2);

      setProgress({ step: 2, total: 7, label: 'Detecting schema...', status: 'working' });
      const detectRes = await databaseManagerLogic.detect((p) => {
        setProgress({ step: 2 + (p.step / p.total) * 0.9, total: 7, label: p.label, status: 'working' });
      });
      if (detectRes.ok) {
        const d = detectRes.data;
        setDetect(d);
        setProgress({ step: 3, total: 7, label: 'Schema detected', status: 'done' });
        goToStep(3);
        setProgress({ step: 3, total: 7, label: 'Generating installation plan & scanning database...', status: 'working' });
        const planPromise = InstallationPlanner.plan(d);
        const timeout = new Promise((_, r) => setTimeout(() => r(new Error('Plan generation timed out')), 15000));
        const p = await Promise.race([planPromise, timeout]);
        setPlan(p);
        if (p?.sql) setSql(p.sql);
        setProgress({ step: 3, total: 7, label: 'Running comprehensive database scan...', status: 'working' });
        const sc = await runScanAndCompare();
        setPreScan({ comparison: sc.comparison });
        setProgress(null);
        goToStep(4);
      } else {
        setError(detectRes.error || 'Detection failed.');
        setProgress(null);
      }
    } catch (e) {
      setError(e?.message || 'Simple Setup failed unexpectedly.');
      setProgress(null);
    }
    setBusy(false);
  };

  const handleReviewDone = () => {
    if (selectedIds.size === 0) {
      setError('Select at least one item to proceed, or go back.');
      return;
    }
    goToStep(5);
  };

  const handleExecuteApproved = async () => {
    setBusy(true); setError(''); setExecPhase('executing');
    try {
      const approved = recommendations.filter((r) => selectedIds.has(r.id));
      const createSql = getApprovedSql();
      let executed = [];
      for (const r of approved) {
        if (r.sql) {
          const res = await InstallationExecutor.executeSql(r.sql);
          if (res.ok) {
            executed.push({ id: r.id, status: 'ok' });
          } else {
            executed.push({ id: r.id, status: 'error', error: res.error });
          }
        } else {
          executed.push({ id: r.id, status: 'skipped', reason: 'No SQL available — requires schema generation' });
        }
      }
      setExecPhase('done');
      setInstallResult({ success: executed.every((e) => e.status === 'ok'), steps: executed });
      setBusy(false);
      if (executed.every((e) => e.status === 'ok' || e.status === 'skipped')) {
        goToStep(6);
        await handlePostVerify();
      } else {
        const errors = executed.filter((e) => e.status === 'error');
        setError(`${errors.length} operation${errors.length !== 1 ? 's' : ''} failed.`);
      }
    } catch (e) {
      setError(e?.message || 'Execution failed.');
      setBusy(false);
    }
  };

  const handlePostVerify = async () => {
    setBusy(true); setExecPhase('verifying');
    try {
      const scan = await databaseScannerService.scanAll();
      if (!scan.ok) { setBusy(false); return; }
      const cmp = blueprintComparatorService.compare(scan);
      setPostScan({ comparison: cmp });
      const v = await ValidationEngine.validateInstallation();
      setValidateResult(v);
      setBusy(false);
      goToStep(7);
    } catch (e) {
      setError(e?.message || 'Verification failed.');
      setBusy(false);
    }
  };

  // --- ADVANCED SETUP ---
  const handleAdvancedConnect = async () => {
    if (!advHost || !advPort || !advDb || !advUser) { setError('All fields except password are required.'); return; }
    setBusy(true); setError('');
    try {
      const res = await ConnectionTester.testDirect(advHost, advPort, advDb, advUser, advPassword);
      if (!res.ok) { setError(res.error || 'Connection failed. Backend API may be unavailable.'); setBusy(false); return; }
      goToStep(3);
      setBusy(true);
      const p = await InstallationPlanner.plan({ needsSetup: true });
      setPlan(p);
      setBusy(false);
      goToStep(4);
      handleAutoInstall(p);
    } catch (e) {
      setError(e?.message || 'Advanced Setup failed unexpectedly.');
      setBusy(false);
    }
  };

  const handleAutoInstall = async (p) => {
    setBusy(true); setError(''); setResult(null);
    try {
      const planToRun = p || plan;
      if (!planToRun) { setError('No installation plan.'); setBusy(false); return; }
      const res = await InstallationExecutor.executePlan(planToRun, setProgress);
      if (res.success) {
        setInstallResult(res);
        goToStep(6);
        const v = await ValidationEngine.validateInstallation();
        setValidateResult(v);
        if (v.valid) goToStep(7);
        else { setError(`${v.issueCount} issue${v.issueCount !== 1 ? 's' : ''} found.`); goToStep(6); }
      } else {
        setError(res.error || 'Installation failed.');
        setInstallResult(res);
      }
    } catch (e) {
      setError(e?.message || 'Auto-install failed unexpectedly.');
    }
    setBusy(false);
  };

  // --- COPY-PASTE SETUP ---
  const handleGenerateSql = async () => {
    setBusy(true); setError(''); setExecSqlSupported(false); setExecSqlDone(false); setExecSqlError('');
    try {
      const res = await databaseManagerLogic.detect();
      if (!res.ok) { setError(res.error || 'Detection failed.'); setBusy(false); return; }
      const p = await InstallationPlanner.plan(res.data);
      setPlan(p);
      const sqlText = p.sql || '-- No SQL generated for this provider.\n-- Your provider creates collections automatically.';
      setCopySql(sqlText);
      if (p.present?.length > 0 && p.missing?.length === 0) {
        setError('All tables already exist. Only system SQL will run.');
      }
      const provider = getDatabaseProvider();
      setExecSqlSupported(typeof provider.execSql === 'function' && sqlText.length > 0);
      const sc = await runScanAndCompare();
      setPreScan({ comparison: sc.comparison });
      setRecommendations(sc.recommendations);
      goToStep(3);
    } catch (e) {
      setError(e?.message || 'Generation failed.');
    }
    setBusy(false);
  };

  const handleExecuteSql = async () => {
    setExecSqlBusy(true); setExecSqlError(''); setError('');
    try {
      const text = copySql || sql;
      if (!text) { setExecSqlError('No SQL to execute.'); setExecSqlBusy(false); return; }
      const pre = await InstallationExecutor.preValidateSql(text);
      if (pre.conflicts?.length > 0) {
        setExecSqlError(`${pre.conflicts.length} duplicate object${pre.conflicts.length !== 1 ? 's' : ''} found. Remove from source or use filtered SQL.`);
        setExecSqlBusy(false);
        return;
      }
      const sqlToRun = pre.filteredSql || text;
      const res = await InstallationExecutor.executeSql(sqlToRun);
      if (!res.ok) {
        setExecSqlError(res.error || 'SQL execution failed.');
        setExecSqlBusy(false);
        return;
      }
      setExecSqlDone(true);
      setExecSqlBusy(false);
      goToStep(5);
      handleVerifySql();
    } catch (e) {
      setExecSqlError(e?.message || 'Execution failed unexpectedly.');
      setExecSqlBusy(false);
    }
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(copySql || sql);
      setSqlCopied(true);
      setTimeout(() => setSqlCopied(false), 2000);
    } catch {
      setError('Could not copy — select and copy manually.');
    }
  };

  const handleDownloadSql = () => {
    const text = copySql || sql;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lexai_schema.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVerifySql = async () => {
    setBusy(true);
    await refresh();
    const res = await databaseManagerLogic.detect();
    setBusy(false);
    if (res.ok && res.data.installed) {
      goToStep(6);
      const v = await ValidationEngine.validateInstallation();
      setValidateResult(v);
      if (v.valid) goToStep(6);
    } else {
      setError('Installation not detected. Run the SQL and click Verify again.');
    }
  };

  // --- UPLOAD SETUP ---
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadAnalysis(null);
    setError('');
  };

  const handleAnalyzeUpload = async () => {
    if (!uploadFile) { setError('Select a file first.'); return; }
    setBusy(true); setError('');
    try {
      const text = await uploadFile.text();
      const analysis = await UploadAnalyzer.analyze(text);
      setUploadAnalysis(analysis);
      goToStep(3);
      if (analysis.error) { setError(analysis.error); } else { goToStep(4); }
    } catch (e) {
      setError(`Failed to read file: ${e?.message}`);
    }
    setBusy(false);
  };

  const handleImportUpload = async () => {
    if (!uploadAnalysis?.udb) { setError('No valid UDB data to import.'); return; }
    setBusy(true); setError('');
    try {
      const res = await InstallationExecutor.uploadAndImport(uploadAnalysis.udb, setProgress);
      setBusy(false);
      if (res.success) {
        setInstallResult(res);
        goToStep(6);
        const v = await ValidationEngine.validateInstallation();
        setValidateResult(v);
        if (v.valid) goToStep(7);
      } else {
        setError(res.error || 'Import failed.');
      }
    } catch (e) {
      setBusy(false);
      setError(`Import error: ${e?.message}`);
    }
  };

  const handleRetry = () => {
    if (method === 'simple') handleSimpleConnect();
    else if (method === 'advanced') handleAdvancedConnect();
    else if (method === 'copy') handleGenerateSql();
  };

  const handleFinish = () => {
    window.location.href = '/bootstrap-admin';
  };

  const toggleFinding = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progressPct = progress && progress.total > 0 ? Math.round((progress.step / progress.total) * 100) : 0;

  return (
    <div className="auth-shell">
      <div className={`auth-card${method ? '' : ''}`} style={{ maxWidth: method ? '680px' : '520px' }}>
        <div className="auth-brand">
          <div className="sidebar__logo">{'\u2696'}</div>
          <div>
            <div className="auth-brand-title">LexAI</div>
            <div className="sidebar__sub">Installation Wizard</div>
          </div>
        </div>

        {!method ? (
          <>
            <h1 className="auth-title">Install Database</h1>
            <p className="auth-sub">Choose your installation method</p>
            <BackendStatusPanel />
            <div className="wizard-methods">
              {METHODS.map((m) => (
                <MethodCard key={m.id} method={m} selected={method === m.id} onSelect={handleMethodSelect} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="wizard-method-bar">
              <button className="wizard-method-bar__back" onClick={() => { handleMethodSelect(null); }}>
                <Icon name="chevronLeft" size={16} />
              </button>
              <span className="wizard-method-bar__label">{METHODS.find((m) => m.id === method)?.label}</span>
              <span className="wizard-method-bar__step">Step {Math.min(step, currentSteps.length)}/{currentSteps.length}</span>
            </div>

            <StepIndicator steps={currentSteps} current={step} progress={progress} />

            {error && (
              <div className="alert alert--warn dm-mt">
                <Icon name="alert" size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* --- SIMPLE SETUP FORM --- */}
            {method === 'simple' && step === 1 && (
              <div className="dm-mt">
                <p className="auth-sub--sm">Enter your Supabase project credentials</p>
                <Field label="Project URL">
                  <Input type="text" placeholder="https://xxxxx.supabase.co" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
                </Field>
                <Field label="Anon Key" hint="Found in Project Settings → API">
                  <Input type="text" placeholder="eyJhbGciOiJIUzI1NiIs..." value={anonKey} onChange={(e) => setAnonKey(e.target.value)} />
                </Field>
                <div className="dm-toolbar-mt">
                  <Button variant="primary" className="btn--block" icon="bolt" loading={busy} onClick={handleSimpleConnect}>
                    Connect & Install
                  </Button>
                </div>
              </div>
            )}

            {/* --- ADVANCED SETUP FORM --- */}
            {method === 'advanced' && step === 1 && (
              <div className="dm-mt">
                <BackendStatusPanel />
                {!backendConfig.configured && (
                  <div className="alert alert--info dm-mt mb-16">
                    <Icon name="info" size={16} />
                    <span>Advanced Setup requires a backend API server. Set <b>VITE_BACKEND_URL</b> in your environment to connect, or use <b>Simple Setup</b> or <b>Copy-Paste Setup</b> instead.</span>
                  </div>
                )}
                <p className="auth-sub--sm">Enter direct database connection details</p>
                <div className="setup-wizard__host-grid">
                  <Field label="Host">
                    <Input type="text" placeholder="db.example.com" value={advHost} onChange={(e) => setAdvHost(e.target.value)} />
                  </Field>
                  <Field label="Port">
                    <Input type="text" placeholder="5432" value={advPort} onChange={(e) => setAdvPort(e.target.value)} />
                  </Field>
                </div>
                <Field label="Database">
                  <Input type="text" placeholder="postgres" value={advDb} onChange={(e) => setAdvDb(e.target.value)} />
                </Field>
                <Field label="Username">
                  <Input type="text" placeholder="postgres" value={advUser} onChange={(e) => setAdvUser(e.target.value)} />
                </Field>
                <Field label="Password">
                  <Input type="password" placeholder="Enter password" value={advPassword} onChange={(e) => setAdvPassword(e.target.value)} />
                </Field>
                <div className="dm-toolbar-mt">
                  <Button variant="primary" className="btn--block" icon="gear" loading={busy} onClick={handleAdvancedConnect}>
                    Connect & Install
                  </Button>
                </div>
              </div>
            )}

            {/* --- SIMPLE SETUP — SCAN IN PROGRESS (step 3) --- */}
            {method === 'simple' && (step === 3 || step === 2) && !scanResult && (
              <div className="wizard-progress dm-mt">
                <div className="wizard-progress__bar">
                  <div className="wizard-progress__fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="wizard-progress__label">
                  {busy ? <Spinner /> : null}
                  <span>{progress?.label || (busy ? 'Scanning database...' : '')}</span>
                </div>
              </div>
            )}

            {/* --- REVIEW STEP (step 4 for simple, step 3 for copy) --- */}
            {(method === 'simple' && step === 4) || (method === 'copy' && step === 3) ? (
              <div className="dm-mt">
                {comparison && <HealthReport comparison={comparison} />}

                {comparison && !comparison.ok && (
                  <div className="alert alert--warn dm-mt">
                    <Icon name="alert" size={16} />
                    <span>Comparison failed: {comparison.error}</span>
                  </div>
                )}

                {recommendations.length > 0 ? (
                  <>
                    <h3 className="wizard-section-title">Select Items to Create/Repair</h3>
                    <p className="auth-sub--sm" style={{ fontSize: 13 }}>
                      Review each finding below. Check the items you want to create or repair. Unchecked items will be skipped.
                    </p>

                    <FindingCategory
                      title="Missing Tables"
                      findings={recommendations.filter((r) => r.category === 'table' && r.action === 'create')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Indexes"
                      findings={recommendations.filter((r) => r.category === 'index')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Policies"
                      findings={recommendations.filter((r) => r.category === 'policy')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Functions"
                      findings={recommendations.filter((r) => r.category === 'function')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Foreign Keys"
                      findings={recommendations.filter((r) => r.category === 'foreignKey' && r.action === 'create')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Broken Foreign Keys"
                      findings={recommendations.filter((r) => r.category === 'foreignKey' && r.action === 'repair')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Triggers"
                      findings={recommendations.filter((r) => r.category === 'trigger')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Extensions"
                      findings={recommendations.filter((r) => r.category === 'extension')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />
                    <FindingCategory
                      title="Missing Roles"
                      findings={recommendations.filter((r) => r.category === 'role')}
                      selectedIds={selectedIds}
                      onToggle={toggleFinding}
                    />

                    <div className="dm-toolbar-mt">
                      <Button variant="primary" className="btn--block" icon="arrow" onClick={handleReviewDone}>
                        Continue with {selectedIds.size} Selected
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="alert alert--success dm-mt">
                      <Icon name="check" size={16} />
                      <span>All blueprint items are present and healthy. No changes needed.</span>
                    </div>
                    {method === 'simple' && (
                      <div className="dm-toolbar-mt">
                        <Button variant="primary" className="btn--block" icon="refresh" loading={busy} onClick={handlePostVerify}>
                          Run Final Verification
                        </Button>
                      </div>
                    )}
                    {method === 'copy' && (
                      <div className="dm-toolbar-mt">
                        <Button variant="primary" className="btn--block" onClick={() => goToStep(4)}>
                          Continue
                        </Button>
                      </div>
                    )}
                  </>
                )}

                <div className="dm-mt">
                  <h4 style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Extra Items (Database-only — for awareness)</h4>
                  {comparison?.findings?.extraTables?.length > 0 && (
                    <div style={{ fontSize: 13, marginTop: 6, color: 'var(--text-muted)' }}>
                      {comparison.findings.extraTables.map((t) => (
                        <div key={t.name} className="flex-row gap-4" style={{ alignItems: 'center' }}>
                          <Icon name="info" size={12} /> <span>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {comparison?.findings?.extraPolicies?.length > 0 && (
                    <div style={{ fontSize: 13, marginTop: 6, color: 'var(--text-muted)' }}>
                      {comparison.findings.extraPolicies.map((p) => (
                        <div key={p.name} className="flex-row gap-4" style={{ alignItems: 'center' }}>
                          <Icon name="info" size={12} /> <span>Policy: {p.name} on {p.table}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {comparison?.findings?.extraIndexes?.length > 0 && (
                    <div style={{ fontSize: 13, marginTop: 6, color: 'var(--text-muted)' }}>
                      {comparison.findings.extraIndexes.map((i) => (
                        <div key={i} className="flex-row gap-4" style={{ alignItems: 'center' }}>
                          <Icon name="info" size={12} /> <span>Index: {i}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(!comparison?.findings?.extraTables?.length && !comparison?.findings?.extraPolicies?.length && !comparison?.findings?.extraIndexes?.length) && (
                    <div style={{ fontSize: 13, marginTop: 6, color: 'var(--text-muted)' }}>No unknown items detected.</div>
                  )}
                </div>
              </div>
            ) : null}

            {/* --- PREVIEW & EXECUTE (step 5 for simple) --- */}
            {method === 'simple' && step === 5 && (
              <div className="dm-mt">
                {comparison && <HealthReport comparison={comparison} />}
                <ChangePreview recommendations={recommendations} selectedIds={selectedIds} />

                {execPhase === 'executing' && (
                  <div className="alert alert--info dm-mt">
                    <Icon name="info" size={16} /> <span>Executing approved changes...</span>
                  </div>
                )}

                {installResult && execPhase === 'done' && (
                  <>
                    {installResult.steps?.filter((s) => s.status === 'error').length > 0 && (
                      <div className="alert alert--warn dm-mt">
                        <Icon name="alert" size={16} />
                        <div>
                          <strong>Some operations had errors:</strong>
                          <ul style={{ margin: '6px 0 0 16px', fontSize: 13 }}>
                            {installResult.steps.filter((s) => s.status === 'error').map((s) => (
                              <li key={s.id}>{s.id}: {s.error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {installResult.steps?.filter((s) => s.status === 'ok').length > 0 && (
                      <div className="alert alert--success dm-mt">
                        <Icon name="check" size={16} />
                        <span>{installResult.steps.filter((s) => s.status === 'ok').length} operation{installResult.steps.filter((s) => s.status === 'ok').length !== 1 ? 's' : ''} completed successfully.</span>
                      </div>
                    )}
                  </>
                )}

                {execPhase !== 'executing' && execPhase !== 'done' && (
                  <div className="dm-toolbar-mt">
                    <Button variant="primary" className="btn--block" icon="bolt" loading={busy} onClick={handleExecuteApproved}>
                      Execute {selectedIds.size} Selected Change{selectedIds.size !== 1 ? 's' : ''}
                    </Button>
                  </div>
                )}

                {method === 'simple' && step === 5 && !busy && execPhase === null && (
                  <div className="dm-toolbar-mt" style={{ marginTop: 8 }}>
                    <Button variant="ghost" className="btn--block" onClick={() => goToStep(4)}>
                      Back to Review
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* --- VERIFICATION (step 6 for simple) --- */}
            {method === 'simple' && step === 6 && (
              <div className="dm-mt">
                {execPhase === 'verifying' && (
                  <div className="wizard-progress dm-mt">
                    <div className="wizard-progress__label">
                      <Spinner /> <span>Running verification scan...</span>
                    </div>
                  </div>
                )}
                {postScan && <CertificationReport preScan={preScan} postScan={postScan} />}
                {postScan && (
                  <div className="dm-toolbar-mt">
                    <Button variant="primary" className="btn--block" icon="refresh" loading={busy} onClick={handlePostVerify}>
                      Re-verify
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* --- COPY-PASTE FORM --- */}
            {method === 'copy' && step === 1 && (
              <div className="dm-mt">
                <p className="auth-sub--sm">Generate complete installation SQL for manual execution</p>
                <div className="wizard-info">
                  <Icon name="info" size={15} /> This generates CREATE TABLE, CREATE INDEX, and seed SQL for your provider.
                  Run it in your database's SQL editor, then return to verify.
                </div>
                <div className="dm-toolbar-mt">
                  <Button variant="primary" className="btn--block" icon="copy" loading={busy} onClick={handleGenerateSql}>
                    Generate Installation SQL
                  </Button>
                </div>
              </div>
            )}

            {/* --- COPY-PASTE SQL DISPLAY --- */}
            {method === 'copy' && step >= 2 && copySql && (
              <div className="dm-mt">
                <p className="auth-sub--sm">
                  {step === 5 ? 'After running the SQL, click Verify' : 'Copy this SQL and run it in your database SQL editor'}
                </p>
                {plan?.present?.length > 0 && (
                  <div className="alert alert--info" style={{ marginBottom: 12 }}>
                    <Icon name="info" size={16} />
                    <span><b>{plan.present.length}</b> table{plan.present.length !== 1 ? 's' : ''} already exist{plan.present.length === 1 ? 's' : ''} ({plan.present.join(', ')}). Generating SQL for <b>{plan.missing.length}</b> missing table{plan.missing.length !== 1 ? 's' : ''} only.</span>
                  </div>
                )}
                {plan?.allPresent && (
                  <div className="alert alert--success" style={{ marginBottom: 12 }}>
                    <Icon name="check" size={16} />
                    <span>All required tables already exist. System SQL (registry, functions, policies) will still run to ensure everything is up to date.</span>
                  </div>
                )}
                <pre className="code-block wizard-sql">{copySql}</pre>
                <div className="toolbar-row dm-mt">
                  <Button variant="ghost" icon="copy" size="sm" onClick={handleCopySql}>
                    {sqlCopied ? 'Copied!' : 'Copy SQL'}
                  </Button>
                  <Button variant="ghost" icon="download" size="sm" onClick={handleDownloadSql}>
                    Download schema.sql
                  </Button>
                  {backendConfig.sqlEditorUrl(detect?.provider) && (
                    <Button variant="ghost" icon="link" size="sm"
                      onClick={() => window.open(backendConfig.sqlEditorUrl(detect?.provider), '_blank', 'noopener')}>
                      Open SQL Editor
                    </Button>
                  )}
                </div>

                {execSqlSupported && step < 5 && (
                  <div className="dm-toolbar-mt">
                    {execSqlError && (
                      <div className="alert alert--warn" style={{ marginBottom: 10 }}>
                        <Icon name="alert" size={16} />
                        <span>{execSqlError}. You can still run the SQL manually.</span>
                      </div>
                    )}
                    {execSqlDone ? (
                      <div className="alert alert--success" style={{ marginBottom: 10 }}>
                        <Icon name="check" size={16} />
                        <span>SQL executed successfully via exec_sql RPC.</span>
                      </div>
                    ) : (
                      <Button variant="primary" className="btn--block" icon="bolt" loading={execSqlBusy} onClick={handleExecuteSql}>
                        Execute SQL Directly
                      </Button>
                    )}
                  </div>
                )}

                {step >= 4 && !execSqlBusy && (
                  <div className="dm-toolbar-mt">
                    <Button variant="primary" className="btn--block" icon="refresh" loading={busy} onClick={handleVerifySql}>
                      I've run it — Verify
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* --- UPLOAD FORM --- */}
            {method === 'upload' && step === 1 && (
              <div className="dm-mt">
                <p className="auth-sub--sm">Upload a database file (.udb, .sql, .json)</p>
                <div
                  className="wizard-dropzone"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { setUploadFile(f); setUploadAnalysis(null); } }}
                >
                  <Icon name="upload" size={28} />
                  <div className="wizard-dropzone__text">
                    {uploadFile ? uploadFile.name : 'Click or drop a file here'}
                  </div>
                  {uploadFile && (
                    <div className="wizard-dropzone__size">
                      {(uploadFile.size / 1024).toFixed(1)} KB
                    </div>
                  )}
                  <input ref={fileRef} type="file" style={{ display: 'none' }}
                    accept=".udb,.sql,.json,.dump,.txt" onChange={handleFileSelect} />
                </div>
                <div className="dm-toolbar-mt">
                  <Button variant="primary" className="btn--block" icon="scan" loading={busy} onClick={handleAnalyzeUpload}
                    disabled={!uploadFile}>
                    Analyze File
                  </Button>
                </div>
              </div>
            )}

            {/* --- UPLOAD ANALYSIS --- */}
            {method === 'upload' && uploadAnalysis && step >= 2 && (
              <div className="dm-mt">
                <div className="wizard-analysis">
                  <div className="wizard-analysis__item">
                    <span>Format</span><b>{uploadAnalysis.format}</b>
                  </div>
                  {uploadAnalysis.totalRows !== undefined && (
                    <div className="wizard-analysis__item">
                      <span>Records</span><b>{uploadAnalysis.totalRows.toLocaleString()}</b>
                    </div>
                  )}
                  {uploadAnalysis.collectionsFound !== undefined && (
                    <div className="wizard-analysis__item">
                      <span>Collections</span><b>{uploadAnalysis.collectionsMatched}/{uploadAnalysis.collectionsFound}</b>
                    </div>
                  )}
                  {uploadAnalysis.schemaVersion && (
                    <div className="wizard-analysis__item">
                      <span>Schema Version</span><b>{uploadAnalysis.schemaVersion}</b>
                    </div>
                  )}
                  {uploadAnalysis.sourceProvider && (
                    <div className="wizard-analysis__item">
                      <span>Source</span><b>{uploadAnalysis.sourceProvider}</b>
                    </div>
                  )}
                  {uploadAnalysis.tablesFound !== undefined && (
                    <div className="wizard-analysis__item">
                      <span>Tables</span><b>{uploadAnalysis.tablesMatched}/{uploadAnalysis.tablesFound}</b>
                    </div>
                  )}
                  {uploadAnalysis.missingTables?.length > 0 && (
                    <div className="wizard-analysis__item wizard-analysis__item--warn">
                      <span>Missing tables</span><b>{uploadAnalysis.missingTables.length}</b>
                    </div>
                  )}
                </div>
                {uploadAnalysis.udb && (
                  <div className="dm-toolbar-mt">
                    <Button variant="primary" className="btn--block" icon="upload" loading={busy} onClick={handleImportUpload}>
                      Import Data
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* --- PROGRESS --- */}
            {(progress || busy) && (
              <div className="wizard-progress dm-mt">
                <div className="wizard-progress__bar">
                  <div className="wizard-progress__fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="wizard-progress__label">
                  {progress?.status === 'done' ? <Icon name="check" size={14} /> : busy ? <Spinner /> : null}
                  <span>{progress?.label || (busy ? 'Working...' : '')}</span>
                  {progress && <span className="wizard-progress__pct"> ({progressPct}%)</span>}
                </div>
              </div>
            )}

            {/* --- VALIDATION RESULT (used by advanced, copy, upload) --- */}
            {validateResult && step >= 6 && method !== 'simple' && (
              <>
                <div className={`alert ${validateResult.valid ? 'alert--success' : 'alert--warn'} dm-mt`}>
                  <Icon name={validateResult.valid ? 'check' : 'alert'} size={16} />
                  <span>
                    {validateResult.valid
                      ? `Installation verified (v${validateResult.version}). Ready to proceed.`
                      : `${validateResult.issueCount} issue${validateResult.issueCount !== 1 ? 's' : ''} found.`}
                  </span>
                </div>
                {validateResult.checks && (
                  <div className="dm-mt setup-wizard__checks">
                    {validateResult.checks.map((c) => (
                      <div key={c.name} className="flex-row gap-8">
                        <span className="setup-wizard__check-status" style={{ color: c.status === 'ok' ? 'var(--success)' : c.status === 'warn' ? 'var(--warning)' : 'var(--error)' }}>
                          {c.status === 'ok' ? 'OK' : c.status === 'warn' ? 'WARN' : 'FAIL'}
                        </span>
                        <span className="setup-wizard__check-name">{c.name}</span>
                        <span>{c.details || ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* --- READY / FINISH --- */}
            {step === currentSteps.length && (
              <>
                {method === 'simple' && postScan ? (
                  <>
                    <CertificationReport preScan={preScan} postScan={postScan} />
                    <div className="dm-toolbar-mt">
                      <Button variant="primary" className="btn--block" icon="arrow" onClick={handleFinish}>
                        Continue to Setup
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {validateResult?.valid && (
                      <div className="dm-toolbar-mt">
                        <Button variant="primary" className="btn--block" icon="arrow" onClick={handleFinish}>
                          Continue to Setup
                        </Button>
                      </div>
                    )}
                    {!validateResult && (
                      <div className="dm-toolbar-mt">
                        <Button variant="primary" className="btn--block" icon="refresh" loading={busy} onClick={handlePostVerify}>
                          Run Verification
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* --- FAILED / RETRY --- */}
            {installResult && !installResult.success && step < currentSteps.length && (
              <div className="dm-toolbar-mt">
                <Button variant="primary" className="btn--block" icon="refresh" onClick={handleRetry}>
                  Retry
                </Button>
              </div>
            )}

            {/* --- SIMPLE SETUP SQL DISPLAY (legacy — for manual SQL when needed) --- */}
            {method === 'simple' && sql && step === 5 && execPhase === null && (
              <div className="dm-mt">
                <p className="auth-sub--sm">Run this SQL in your provider's SQL editor</p>
                {plan?.present?.length > 0 && (
                  <div className="alert alert--info" style={{ marginBottom: 12 }}>
                    <Icon name="info" size={16} />
                    <span><b>{plan.present.length}</b> table{plan.present.length !== 1 ? 's' : ''} already exist{plan.present.length === 1 ? 's' : ''} ({plan.present.join(', ')}). Generating SQL for <b>{plan.missing.length}</b> missing table{plan.missing.length !== 1 ? 's' : ''} only.</span>
                  </div>
                )}
                <pre className="code-block wizard-sql">{sql}</pre>
                <div className="toolbar-row dm-mt">
                  <Button variant="ghost" icon="copy" size="sm" onClick={handleCopySql}>
                    {sqlCopied ? 'Copied!' : 'Copy SQL'}
                  </Button>
                  <Button variant="ghost" icon="download" size="sm" onClick={handleDownloadSql}>
                    Download
                  </Button>
                </div>
              </div>
            )}

            {/* --- PROP DETECT ERROR --- */}
            {propDetectError && !error && (
              <div className="alert alert--warn dm-mt">
                <Icon name="alert" size={16} />
                <span>{propDetectError}</span>
              </div>
            )}

            {/* --- CURRENT DETECT STATUS --- */}
            {detect && !method && (
              <div className="db-setup__meta dm-mt">
                <div className="kv"><span>Provider</span><b className="dm-capitalize">{detect.provider}</b></div>
                <div className="kv"><span>Status</span><span>{detect.installed ? `Installed (v${detect.version})` : 'Not installed'}</span></div>
              </div>
            )}

            <DebugPanel logs={logs} error={error || execSqlError} result={validateResult || installResult || comparison} onClear={clearLogs} onCopy={copyLogs} />
          </>
        )}

        {!method && (
          <div className="auth-note">
            All methods are provider-independent. Your data remains compatible across providers.
          </div>
        )}
      </div>
    </div>
  );
}
