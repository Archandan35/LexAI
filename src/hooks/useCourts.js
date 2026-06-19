import { useEffect, useState, useCallback } from 'react';
import { courtLogic } from '@/logic/courtLogic.js';

export function useCourts() {
  const [courts, setCourts] = useState([]);
  const [courtNames, setCourtNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const list = await courtLogic.list();
      setCourts(list);
      setCourtNames(list.map((c) => c.name));
    } catch {
      setCourts([]);
      setCourtNames([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { courts, courtNames, loading, refresh };
}

export default useCourts;
