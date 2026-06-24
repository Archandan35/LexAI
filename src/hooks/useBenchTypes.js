import { useEffect, useState, useCallback } from 'react';
import { benchTypeLogic } from '@/logic/benchTypeLogic.js';

let cached = null;

export function useBenchTypes() {
  const [benchTypes, setBenchTypes] = useState(cached?.benchTypes || []);
  const [loading, setLoading] = useState(!cached);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await benchTypeLogic.list();
      const names = (Array.isArray(data) ? data : []).filter((b) => b.status !== 'Inactive').map((b) => b.name);
      cached = { benchTypes: names, raw: data };
      setBenchTypes(names);
    } catch { setBenchTypes([]); }
    setLoading(false);
  }, []);

  useEffect(() => { if (!cached) refresh(); }, [refresh]);

  return { benchTypes, loading, refresh };
}

export default useBenchTypes;
