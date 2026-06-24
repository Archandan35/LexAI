import { useEffect, useState, useCallback } from 'react';
import { courtHierarchyLogic } from '@/logic/courtHierarchyLogic.js';

let cached = null;

export function useCourtHierarchy() {
  const [hierarchy, setHierarchy] = useState(cached?.hierarchy || []);
  const [loading, setLoading] = useState(!cached);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courtHierarchyLogic.list();
      const names = (Array.isArray(data) ? data : []).filter((h) => h.status !== 'Inactive').map((h) => h.name);
      cached = { hierarchy: names, raw: data };
      setHierarchy(names);
    } catch { setHierarchy([]); }
    setLoading(false);
  }, []);

  useEffect(() => { if (!cached) refresh(); }, [refresh]);

  return { hierarchy, loading, refresh };
}

export default useCourtHierarchy;
