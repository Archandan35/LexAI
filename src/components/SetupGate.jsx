import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AdminSetup from '@/app/pages/AdminSetup.jsx';
import Spinner from './Spinner.jsx';
import { databaseManagerLogic } from '@/logic/databaseManagerLogic.js';
import { databaseAdminService } from '@/services/databaseAdminService.js';
import { userService } from '@/services/userService.js';

export default function SetupGate({ children }) {
  const [state, setState] = useState('checking');
  const [detectError, setDetectError] = useState('');
  const location = useLocation();

  const check = async () => {
    try {
      const res = await databaseManagerLogic.detect();
      if (res.data?.authError) {
        setDetectError(`Auth error: ${res.data.authError}. Check the provider API key and ensure it has access to the project.`);
      }
      const users = await userService.list().catch(() => []);
      if (!users || users.length === 0 || !res.ok) {
        setState('setup');
        return;
      }
      setState('ready');
    } catch (e) {
      setState('setup');
    }
  };

  useEffect(() => { check(); }, []);
  useEffect(() => { if (state === 'ready') databaseAdminService.grantAllCollections(); }, [state]);

  if (state === 'checking') return <div className="auth-shell"><Spinner /></div>;
  if (state === 'setup') {
    return <AdminSetup />;
  }
  if (state === 'bootstrap') {
    if (location.pathname === '/admin/setup') return children;
    return <Navigate to="/admin/setup" replace />;
  }
  return children;
}

