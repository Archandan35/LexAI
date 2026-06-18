import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogic } from '@/logic/authLogic.js';
import { userService } from '@/services/userService.js';
import { roleService } from '@/services/roleService.js';
import Icon from '@/components/Icon.jsx';
import Button from '@/components/Button.jsx';
import Spinner from '@/components/Spinner.jsx';
import { Field, Input } from '@/components/Field.jsx';

const TIMEOUT_MS = 10000;

export default function BootstrapAdmin() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timedOut, setTimedOut] = useState(false);
  const [status, setStatus] = useState('Loading...');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const initialize = useCallback(async () => {
    console.log('[Bootstrap] mount');
    setStatus('Loading...');
    setTimedOut(false);
    setLoading(true);

    const timer = setTimeout(() => {
      if (mountedRef.current) {
        console.warn('[Bootstrap] TIMEOUT — 10s elapsed');
        setTimedOut(true);
        setLoading(false);
        setError('Request timed out after 10 seconds. Check that the database provider is reachable and VITE_SUPABASE_ANON_KEY is correct.');
      }
    }, TIMEOUT_MS);

    try {
      console.log('[Bootstrap] initialize start');

      // 1. Check users
      console.log('[Bootstrap] loading users');
      let users = [];
      try {
        users = await userService.list();
      } catch (e) {
        console.warn('[Bootstrap] users list error:', e.message);
        setError(`Failed to load users: ${e.message}`);
        setLoading(false);
        clearTimeout(timer);
        return;
      }
      console.log('[Bootstrap] users count:', users.length);

      if (users.length > 0) {
        console.log('[Bootstrap] users exist — redirecting to login');
        nav('/login', { replace: true });
        clearTimeout(timer);
        return;
      }

      // 2. Check roles
      console.log('[Bootstrap] loading roles');
      let roles = [];
      try {
        roles = await roleService.list();
      } catch (e) {
        console.warn('[Bootstrap] roles list error:', e.message);
        setError(`Failed to load roles: ${e.message}`);
        setLoading(false);
        clearTimeout(timer);
        return;
      }
      console.log('[Bootstrap] roles count:', roles.length);

      if (!roles || roles.length === 0) {
        console.warn('[Bootstrap] NO ROLES FOUND');
        setError('No roles found. Installation incomplete. Run "Complete Installation" in the Setup Wizard.');
        setLoading(false);
        clearTimeout(timer);
        return;
      }

      // 3. Check super_admin role exists
      console.log('[Bootstrap] checking super_admin role');
      const hasSuperAdmin = roles.some((r) => r.code === 'super_admin');
      console.log('[Bootstrap] super_admin role found:', hasSuperAdmin);

      if (!hasSuperAdmin) {
        console.warn('[Bootstrap] super_admin role missing');
        setError('super_admin role not found. Installation incomplete. Run "Complete Installation" in the Setup Wizard.');
        setLoading(false);
        clearTimeout(timer);
        return;
      }

      // Everything ready — show form
      console.log('[Bootstrap] rendering form');
      setLoading(false);
      clearTimeout(timer);
    } catch (e) {
      console.error('[Bootstrap] initialize error:', e);
      if (mountedRef.current) {
        setError(e.message || 'Failed to initialize.');
        setLoading(false);
      }
      clearTimeout(timer);
    }
  }, [nav]);

  useEffect(() => { initialize(); }, [initialize]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Name is required.');
    if (!email.trim()) return setError('Email is required.');
    if (!password) return setError('Password is required.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    setBusy(true);
    let res;
    try {
      res = await authLogic.bootstrapAdmin({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (e) {
      setBusy(false);
      setError(e.message || 'Failed to bootstrap super admin.');
      return;
    }
    setBusy(false);

    if (res.ok) {
      console.log('[Bootstrap] redirect login');
      nav('/login', { replace: true });
    } else {
      setError(res.error || 'Failed to bootstrap super admin.');
    }
  };

  // Loading state with timeout
  if (loading) {
    return (
      <div className="auth-shell">
        <div className="auth-card fade-in">
          <div className="auth-brand">
            <div className="sidebar__logo">&#x2696;</div>
            <div>
              <div className="auth-brand-title">Lex<span>AI</span></div>
              <div className="sidebar__sub">Indian Litigation Assistant</div>
            </div>
          </div>
          <h1 className="auth-title">Preparing Setup</h1>
          <p className="auth-sub">{timedOut ? status : 'Verifying database state...'}</p>
          {!timedOut && <Spinner />}
          {timedOut && (
            <div className="alert alert--warn dm-mt">
              <Icon name="alert" size={16} />
              <span>{error}</span>
            </div>
          )}
          {timeout && (
            <div className="dm-toolbar-mt">
              <Button variant="primary" className="btn--block" icon="refresh" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <div className="auth-card fade-in">
        <div className="auth-brand">
          <div className="sidebar__logo">&#x2696;</div>
          <div>
            <div className="auth-brand-title">Lex<span>AI</span></div>
            <div className="sidebar__sub">Indian Litigation Assistant</div>
          </div>
        </div>

        <h1 className="auth-title">Bootstrap System</h1>
        <p className="auth-sub">Create the first Super Administrator account to begin setup.</p>

        {error && (
          <div className="alert alert--danger alert--mb">
            <Icon name="alert" size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Field label="Full Name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. System Administrator"
              autoFocus
              required
            />
          </Field>
          <Field label="Email Address">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@company.com"
              required
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>
          <Field label="Confirm Password">
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>
          <Button
            type="submit"
            variant="primary"
            className="btn--block"
            loading={busy}
            icon="shield"
          >
            Create Super Admin
          </Button>
        </form>

        <div className="auth-note">
          Once created, this account will have full access. Keep these credentials secure.
        </div>
      </div>
    </div>
  );
}
