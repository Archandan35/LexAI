import { useState, useCallback } from 'react';

// Minimal toast system (no external dep). Returned API is shared via context.
export function useToastState() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const error = useCallback((msg) => push(msg, 'error'), [push]);
  const success = useCallback((msg) => push(msg, 'success'), [push]);
  const warning = useCallback((msg) => push(msg, 'warning'), [push]);
  return { toasts, push, remove, error, success, warning };
}

export default useToastState;
