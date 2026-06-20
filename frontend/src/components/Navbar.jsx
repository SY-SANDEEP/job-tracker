import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { path: '/applications', icon: '📋', label: 'Applications' },
  { path: '/ai-tools', icon: '✨', label: 'AI Tools' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => { logout(); navigate('/login'); };
  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside style={{
      width: 220, background: 'white', borderRight: '1px solid #ECEEF1',
      display: 'flex', flexDirection: 'column', height: '100vh',
      position: 'fixed', left: 0, top: 0, zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 30, height: 30, background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
        }}>💼</div>
        <span style={{ color: '#3C3A4D', fontSize: 15, fontWeight: 800 }}>JobTrack</span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '8px 14px', flex: 1 }}>
        <div style={{ color: '#A8A5B5', fontSize: 10, letterSpacing: '0.06em', padding: '14px 10px 6px', textTransform: 'uppercase', fontWeight: 600 }}>Menu</div>
        {navItems.map(item => {
          const active = pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                background: active ? '#EEE9FD' : 'transparent',
                color: active ? '#7367F0' : '#6F6B7D',
                fontSize: 13, fontWeight: 500, cursor: 'pointer'
              }}>
                <span>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: 14, borderTop: '1px solid #ECEEF1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 700
          }}>{initials}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ color: '#3C3A4D', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ color: '#A8A5B5', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
          </div>
          <button onClick={handleLogout} title="Logout" style={{
            width: 28, height: 28, borderRadius: 7, background: '#FDE8E8',
            color: '#EA5455', border: 'none', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13
          }}>⎋</button>
        </div>
      </div>
    </aside>
  );
}