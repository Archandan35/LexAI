import { useEffect, useState, useCallback } from 'react';
import { caseTypeLogic } from '@/logic/caseTypeLogic.js';

export function useCaseTypes() {
  const [caseTypes, setCaseTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await caseTypeLogic.list();
      const list = Array.isArray(data) ? data : [];
      setCaseTypes(list);
    } catch {
      // keep existing data
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { caseTypes, loading, refresh };
}

export default useCaseTypes;
