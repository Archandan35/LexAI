import { useEffect, useState, useCallback } from 'react';
import { folderTemplateLogic } from '@/logic/folderTemplateLogic.js';

export function useFolderTemplates(kind) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await folderTemplateLogic.list(kind);
      setTemplates(Array.isArray(result) ? result : []);
    } catch { setTemplates([]); }
    setLoading(false);
  }, [kind]);

  useEffect(() => { refresh(); }, [refresh]);

  return { templates, loading, refresh };
}

export default useFolderTemplates;
