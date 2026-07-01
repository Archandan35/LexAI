import { useEffect, useState, useCallback } from 'react';
import { priorityLogic } from '@/logic/priorityLogic.js';

export function usePriorities() {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await priorityLogic.list();
      const list = Array.isArray(data) ? data : [];
      setPriorities(list);
    } catch {
      // keep existing data
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { priorities, loading, refresh };
}

export default usePriorities;
