import { NavLink, Outlet } from 'react-router-dom';
import Icon from '@/components/Icon.jsx';

const TABS = [
  { to: '/admin/database-center', label: 'Dashboard', icon: 'database', end: true },
  { to: '/admin/database-center/explorer', label: 'Data Explorer', icon: 'layers' },
  { to: '/admin/database-center/delete', label: 'Delete Manager', icon: 'trash' },
  { to: '/admin/database-center/import', label: 'Import Center', icon: 'download' },
  { to: '/admin/database-center/export', label: 'Export Center', icon: 'upload' },
  { to: '/admin/database-center/backup', label: 'Backup & Recovery', icon: 'refresh' },
  { to: '/admin/database-center/maintenance', label: 'Maintenance', icon: 'wrench' },
  { to: '/admin/database-center/migration', label: 'Migration', icon: 'migrate' },
  { to: '/admin/database-center/audit', label: 'Audit & Activity', icon: 'activity' },
];

export default function DatabaseCenter() {
  return (
    <div className="dmc">
      <nav className="dmc-header">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => `dmc-tab${isActive ? ' dmc-tab--active' : ''}`}>
            <Icon name={t.icon} size={15} />
            {t.label}
          </NavLink>
        ))}
      </nav>
      <div className="dmc-body">
        <Outlet />
      </div>
    </div>
  );
}
