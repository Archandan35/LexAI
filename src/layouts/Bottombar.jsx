import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/data-layer/AuthContext.jsx';
import Icon from '@/components/Icon.jsx';
import { FabActionContext } from '@/data-layer/FABContext.jsx';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home', to: '/dashboard', module: 'dashboard' },
  { key: 'matters', label: 'Matters', icon: 'briefcase-duo', to: '/cases', module: 'manageCase' },
  { key: 'add', label: 'Add', icon: 'plus', to: '/cases/create', module: 'manageCase', fab: true },
  { key: 'order-sheet', label: 'Order Sheet', icon: 'file', to: '/cases/order-sheet', module: 'orderSheet' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar', to: '/calendar', module: 'calendar' },
];

export default function Bottombar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { canViewModule } = useAuth();
  const fabActionRef = useContext(FabActionContext);

  const allowed = NAV_ITEMS.filter((item) => canViewModule(item.module));

  if (allowed.length === 0) return null;

  const bar = (
    <div className="bottombar-wrap">
      <div className="bottombar">
        <svg className="bottombar__bg" viewBox="0 0 400 78" preserveAspectRatio="none">
          <path
            d="M10 0 H140 C168 0 168 34 200 34 C230 34 232 0 260 0 H390 Q400 0 400 10 V78 H0 V10 Q0 0 10 0 Z"
            fill="currentColor"
          />
        </svg>
        <div className="bottombar__items">
          {allowed.map((item) => {
            const isActive = item.key === 'dashboard'
              ? pathname === '/dashboard' || pathname === '/'
              : item.to && pathname.startsWith(item.to);
            if (item.fab) {
              return (
                <button
                  key={item.key}
                  className="bottombar__item bottombar__item--fab"
                  onClick={() => {
                    if (fabActionRef?.current) {
                      fabActionRef.current();
                    } else {
                      nav(item.to);
                    }
                  }}
                  aria-label={item.label}
                >
                  <span className="bottombar__fab">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <span className="bottombar__label">{item.label}</span>
                </button>
              );
            }
            return (
              <button
                key={item.key}
                className={`bottombar__item ${isActive ? 'is-active' : ''}`}
                onClick={() => item.to && nav(item.to)}
                aria-label={item.label}
              >
                <Icon name={item.icon} size={21} />
                <span className="bottombar__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return createPortal(bar, document.body);
}
