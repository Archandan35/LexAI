import { useState, useEffect } from 'react';
import Card from '@/components/Card.jsx';
import Button from '@/components/Button.jsx';
import Icon from '@/components/Icon.jsx';
import { Input } from '@/components/Field.jsx';
import { precedentLogic } from '@/logic/precedentLogic.js';
import { useToast } from '@/data-layer/ToastContext.jsx';

export default function PrecedentVault() {
  const [precedents, setPrecedents] = useState([]);
  const [stats, setStats] = useState({ totalSaved: 0, totalTags: 0, recentlyAdded: 0, favorites: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const toast = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 991px)');
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    handler(mql);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const load = () => {
    setLoading(true);
    Promise.all([precedentLogic.list(), precedentLogic.stats()]).then(([p, s]) => {
      setPrecedents(Array.isArray(p) ? p : []);
      if (s && !s.error) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const filtered = precedents.filter((p) => !search || (p.title || '').toLowerCase().includes(search.toLowerCase()) || (p.citation || '').toLowerCase().includes(search.toLowerCase()));

  const toggleFav = async (p) => {
    await precedentLogic.update(p.id, { is_favorite: !p.is_favorite }); load();
  };

  return (
    <div className="fade-in">
      {!isMobile ? (
        <>
          <div className="bench-types__hero">
            <div className="bench-types__hero-icon"><Icon name="bookmark" size={34} /></div>
            <div className="bench-types__hero-text">
              <h2>Precedent Vault</h2>
              <p>Browse and search archived judgments and legal precedents.</p>
              <div className="bench-types__hero-accent" />
            </div>
            <Icon name="bookmark" className="bench-types__hero-watermark bench-types__watermark-icon" />
          </div>

          <div className="bench-types__stats-row">
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--total"><Icon name="bookmark" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">Saved Precedents</div>
                <div className="bench-types__statcard-value">{stats.totalSaved}</div>
                <div className="bench-types__statcard-sub">All saved records</div>
              </div>
            </div>
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--active"><Icon name="tag" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">Tags</div>
                <div className="bench-types__statcard-value">{stats.totalTags}</div>
                <div className="bench-types__statcard-sub">Unique tags</div>
              </div>
            </div>
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--inactive"><Icon name="clock" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">Recently Added</div>
                <div className="bench-types__statcard-value bench-types__statcard-value--sm">{stats.recentlyAdded}</div>
                <div className="bench-types__statcard-sub">This month</div>
              </div>
            </div>
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--most-used"><Icon name="star" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">Favorites</div>
                <div className="bench-types__statcard-value bench-types__statcard-value--sm">{stats.favorites}</div>
                <div className="bench-types__statcard-sub">Marked favorites</div>
              </div>
            </div>
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--created-month"><Icon name="file" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">With Citations</div>
                <div className="bench-types__statcard-value bench-types__statcard-value--sm">{precedents.filter(p => p.citation).length}</div>
                <div className="bench-types__statcard-sub">Have citations</div>
              </div>
            </div>
            <div className="bench-types__statcard">
              <div className="bench-types__statcard-icon bench-types__statcard-icon--assignments"><Icon name="layers" size={16} /></div>
              <div className="bench-types__statcard-body">
                <div className="bench-types__statcard-label">With Courts</div>
                <div className="bench-types__statcard-value bench-types__statcard-value--sm">{precedents.filter(p => p.court).length}</div>
                <div className="bench-types__statcard-sub">Have court info</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bench-types__hero" style={{ margin: '0 0 20px' }}>
            <div className="bench-types__hero-icon"><Icon name="bookmark" size={34} /></div>
            <div className="bench-types__hero-text">
              <h2>Precedent Vault</h2>
              <p>Browse and search archived judgments and legal precedents.</p>
              <div className="bench-types__hero-accent" />
            </div>
            <Icon name="bookmark" className="bench-types__hero-watermark bench-types__watermark-icon" />
          </div>

          <div className="bench-types__stat-cards bench-types__mobile-only" style={{ margin: '0 0 18px' }}>
            <div className="bench-types__stat-card bench-types__stat-card--total">
              <div className="bench-types__stat-card-row1">
                <div className="bench-types__stat-card-icon"><Icon name="bookmark" size={18} /></div>
                <span className="bench-types__stat-card-num">{stats.totalSaved}</span>
              </div>
              <div className="bench-types__stat-card-label">SAVED</div>
            </div>
            <div className="bench-types__stat-card bench-types__stat-card--active">
              <div className="bench-types__stat-card-row1">
                <div className="bench-types__stat-card-icon"><Icon name="star" size={18} /></div>
                <span className="bench-types__stat-card-num">{stats.favorites}</span>
              </div>
              <div className="bench-types__stat-card-label">FAVORITES</div>
            </div>
            <div className="bench-types__stat-card bench-types__stat-card--inactive">
              <div className="bench-types__stat-card-row1">
                <div className="bench-types__stat-card-icon"><Icon name="clock" size={18} /></div>
                <span className="bench-types__stat-card-num">{stats.recentlyAdded}</span>
              </div>
              <div className="bench-types__stat-card-label">RECENT</div>
            </div>
          </div>
        </>
      )}

      <Card bodyClass="card__body--flush">
        <div className="toolbar-row" style={{ padding: '14px 18px 0' }}>
          <Input className="search-row__input" placeholder="Search by title or citation..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading-block"><span className="spinner" /></div> : filtered.length === 0 ? (
          <div className="empty-state"><Icon name="bookmark" /><p>No precedents saved yet.</p></div>
        ) : (
          <div className="table-scroll">
            <table className="table"><thead><tr><th>Title</th><th>Citation</th><th>Court</th><th>Date</th><th>Favorite</th></tr></thead>
              <tbody>{filtered.map((p) => (
                <tr key={p.id}><td>{p.title}</td><td>{p.citation}</td><td>{p.court}</td><td>{p.date}</td>
                  <td><button className="btn-icon" onClick={() => toggleFav(p)}><Icon name={p.is_favorite ? 'star' : 'star'} /></button></td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </Card>

      <nav className="bench-types__bottom-nav bench-types__mobile-only">
        <button className="bench-types__nav-tab bench-types__nav-tab--active">
          <Icon name="home" size={20} />
          <span>Dashboard</span>
        </button>
        <button className="bench-types__nav-tab">
          <Icon name="briefcase" size={20} />
          <span>Matters</span>
        </button>
        <button className="bench-types__nav-fab">
          <Icon name="plus" size={24} />
        </button>
        <button className="bench-types__nav-tab">
          <Icon name="file" size={20} />
          <span>Order Sheet</span>
        </button>
        <button className="bench-types__nav-tab">
          <Icon name="calendar" size={20} />
          <span>Calendar</span>
        </button>
      </nav>
    </div>
  );
}
