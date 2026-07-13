import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useSettings } from '@/data-layer/SettingsContext.jsx';

const DebugContext = createContext(null);

export function DebugProvider({ children }) {
  const [debugMode, setDebugMode] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    if (settings.devTools === true) {
      setDebugMode(true);
    }
  }, [settings.devTools]);

  const toggleDebug = useCallback(async (v) => {
    setDebugMode(v);
    const { settingsLogic } = await import('@/logic/settingsLogic.js');
    const res = await settingsLogic.loadSettings();
    const s = res.ok && res.data ? { ...res.data } : {};
    s.devTools = v;
    await settingsLogic.saveSettings(s);
  }, []);

  return (
    <DebugContext.Provider value={{ debugMode, toggleDebug }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  return useContext(DebugContext) || { debugMode: false, toggleDebug: () => { } };
}

export default DebugContext;
