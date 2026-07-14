export const COLOR_OPTIONS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'];

export const DEFAULT_COLOR = '#6b7280';

// ColorPicker — shared swatch picker used by every master-data page.
// Renders the preset palette as circular swatch buttons plus a native
// color input for custom values. Fully controlled: pass `value` + `onChange`.
export default function ColorPicker({ value = DEFAULT_COLOR, onChange }) {
  return (
    <div className="cmp-color-picker-wrap">
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c}
          type="button"
          aria-label={`Select colour ${c}`}
          className={`cmp-color-btn${value === c ? ' cmp-color-btn--active' : ''}`}
          style={{ '--btn-color': c }}
          onClick={() => onChange?.(c)}
        />
      ))}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="cmp-color-picker__custom"
        aria-label="Custom colour"
      />
    </div>
  );
}
