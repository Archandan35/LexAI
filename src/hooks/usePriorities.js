import { useEffect, useState, useCallback } from 'react';
import { priorityLogic } from '@/logic/priorityLogic.js';

let cached = null;

export function usePriorities() {
  const [priorities, setPriorities] = useState(cached?.priorities || []);
  const [loading, setLoading] = useState(!cached);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await priorityLogic.list();
      const names = (Array.isArray(data) ? data : []).map((p) => p.name);
      cached = { priorities: names, raw: data };
      setPriorities(names);
    } catch { setPriorities([]); }
    setLoading(false);
  }, []);

  useEffect(() => { if (!cached) refresh(); }, [refresh]);

  return { priorities, loading, refresh };
}

export default usePriorities;
