import Icon from './Icon.jsx';

export default function TableHeader({ columns, selectable, allSelected, onToggleAll, sort, onSort, className }) {
  return (
    <thead className={className}>
      <tr>
        {selectable && (
          <th className="th-checkbox">
            <input type="checkbox" checked={!!allSelected} onChange={onToggleAll} aria-label="Select all" />
          </th>
        )}
        {columns.map((col) => {
          if (col.render) {
            return <th key={col.key || col.label} className={col.className} style={col.width ? { width: col.width } : undefined}>{col.render()}</th>;
          }
          const isSortable = col.sortable && onSort;
          return (
            <th
              key={col.key || col.label}
              className={`${col.className || ''}${isSortable ? ' th--sortable' : ''}`.trim() || undefined}
              style={col.width ? { width: col.width } : undefined}
              onClick={isSortable ? () => onSort(col.key) : undefined}
            >
              {isSortable ? (
                <span className="th__sort-btn" onClick={(e) => { e.stopPropagation(); onSort(col.key); }}>
                  <span className="th__label">{col.label}</span>
                  <span className="th__sort-icon">
                    {sort?.key === col.key ? (sort.dir === 'asc' ? ' \u25B2' : ' \u25BC') : ''}
                  </span>
                </span>
              ) : col.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
