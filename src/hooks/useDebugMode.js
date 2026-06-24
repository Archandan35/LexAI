import { useState, useEffect } from 'react';
import { settingsLogic } from '@/logic/settingsLogic.js';

export function useDebugMode() {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await settingsLogic.loadSettings();
      if (!cancelled && res.ok && res.data?.devTools === true) {
        setDebugMode(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return debugMode;
}

export default useDebugMode;
