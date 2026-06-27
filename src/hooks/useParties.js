import { useEffect, useState, useCallback } from 'react';
import { partyLogic } from '@/logic/partyLogic.js';

let cached = null;

export function useParties() {
  const [parties, setParties] = useState(cached?.parties || []);
  const [loading, setLoading] = useState(!cached);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await partyLogic.list();
      const names = (Array.isArray(data) ? data : []).map((p) => p.name);
      cached = { parties: names, raw: data };
      setParties(names);
    } catch { setParties([]); }
    setLoading(false);
  }, []);

  useEffect(() => { if (!cached) refresh(); }, [refresh]);

  return { parties, loading, refresh };
}

export default useParties;
