const isHex = (c) => typeof c === 'string' && /^#[0-9a-f]{6}$/i.test(c);

function contrastText(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? '#ffffff' : '#1a2236';
}

const NAMED = {
  green: '#16a34a', red: '#dc2626', amber: '#d97706', navy: '#1e40af',
  grey: '#6b7280', blue: '#1e40af', orange: '#ea580c',
};

export default function Badge({ children, tone, dot, style: externalStyle }) {
  const hex = isHex(tone) ? tone : NAMED[tone] || '#6b7280';
  const textColor = contrastText(hex);
  return (
    <span
      className="badge badge--dyn"
      style={{
        '--bd-bg': `${hex}18`,
        '--bd-color': textColor,
        '--bd-border': `${hex}40`,
        ...externalStyle,
      }}
    >
      {dot && <span className="dot sync__dot--dyn" style={{ '--dot-bg': hex }} />}
      {children}
    </span>
  );
}
