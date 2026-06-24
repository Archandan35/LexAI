import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

export default function SearchableSelect({ value, onChange, options = [], placeholder = 'Select...', style }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const selectedLabel = useMemo(() => {
    const match = options.find((o) => o.value === value);
    return match ? match.label : '';
  }, [value, options]);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [query, options]);

  useEffect(() => {
    if (!open) { setQuery(''); setFocusedIdx(-1); }
  }, [open]);

  useEffect(() => {
    function handle(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const select = useCallback((opt) => {
    onChange({ target: { value: opt.value } });
    setOpen(false);
    inputRef.current?.blur();
  }, [onChange]);

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && focusedIdx >= 0 && filtered[focusedIdx]) { e.preventDefault(); select(filtered[focusedIdx]); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
  }, [filtered, focusedIdx, select]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', ...style }} className="searchable-select">
      <input
        ref={inputRef}
        className="input"
        value={open ? query : selectedLabel}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setFocusedIdx(-1); }}
        onKeyDown={handleKey}
        style={{ cursor: 'text', caretColor: open ? 'auto' : 'transparent' }}
        readOnly={!open}
      />
      {open && filtered.length > 0 && (
        <div className="searchable-select__dropdown">
          {filtered.map((opt, i) => (
            <div
              key={opt.value}
              className={`searchable-select__option${i === focusedIdx ? ' searchable-select__option--focused' : ''}${opt.value === value ? ' searchable-select__option--selected' : ''}`}
              onMouseDown={() => select(opt)}
              onMouseEnter={() => setFocusedIdx(i)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {open && filtered.length === 0 && (
        <div className="searchable-select__dropdown">
          <div className="searchable-select__option searchable-select__option--empty">No results</div>
        </div>
      )}
    </div>
  );
}
