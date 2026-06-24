import { useEffect, useState, useCallback } from 'react';
import { jurisdictionLogic } from '@/logic/jurisdictionLogic.js';

let cached = null;

export function useJurisdictions() {
  const [jurisdictions, setJurisdictions] = useState(cached?.jurisdictions || []);
  const [loading, setLoading] = useState(!cached);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await jurisdictionLogic.list();
      const names = (Array.isArray(data) ? data : []).filter((j) => j.status !== 'Inactive').map((j) => j.name);
      cached = { jurisdictions: names, raw: data };
      setJurisdictions(names);
    } catch { setJurisdictions([]); }
    setLoading(false);
  }, []);

  useEffect(() => { if (!cached) refresh(); }, [refresh]);

  return { jurisdictions, loading, refresh };
}

export default useJurisdictions;
