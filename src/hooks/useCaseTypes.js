import { useEffect, useState, useCallback } from 'react';
import { caseTypeLogic } from '@/logic/caseTypeLogic.js';

export function useCaseTypes() {
  const [caseTypes, setCaseTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setCaseTypes(await caseTypeLogic.list());
    } catch {
      setCaseTypes([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { caseTypes, loading, refresh };
}

export default useCaseTypes;
