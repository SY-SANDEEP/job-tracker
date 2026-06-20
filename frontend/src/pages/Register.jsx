import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/register', form);
      login(res.data);
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 9,
    border: '1px solid #E2E1EB', fontSize: 14,
    outline: 'none', background: '#F8F7FA', fontFamily: 'inherit'
  };

  const perks = [
    'Track unlimited job applications',
    'AI resume scoring against any JD',
    'Interview question generator',
    'Live pipeline analytics',
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Left — branding panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
        padding: '56px 48px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 18, fontWeight: 800, marginBottom: 60 }}>
              <div style={{
                width: 34, height: 34, background: 'rgba(255,255,255,0.2)',
                borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
              }}>💼</div>
              JobTrack
            </div>
          </Link>

          <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.3, marginBottom: 20, maxWidth: 420 }}>
            Join thousands tracking their job search smarter
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8, maxWidth: 380, marginBottom: 36 }}>
            Create your free account and start organizing every application, interview, and offer in one place.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {perks.map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0
                }}>✓</div>
                {p}
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Right — form */}
      <div style={{
        flex: 1, background: '#F8F7FA', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 40
      }}>
        <div style={{ width: 400 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#3C3A4D', marginBottom: 6 }}>Create your account</h2>
            <p style={{ color: '#6F6B7D', fontSize: 13 }}>Free forever. No credit card needed.</p>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #ECEEF1', padding: 32 }}>
            {error && (
              <div style={{
                background: '#FDE8E8', border: '1px solid #FBC9C9',
                borderRadius: 9, padding: '10px 14px',
                color: '#EA5455', fontSize: 13, marginBottom: 18
              }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3C3A4D', marginBottom: 6 }}>Full name</label>
                <input placeholder="Sandeep Yadav" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3C3A4D', marginBottom: 6 }}>Email address</label>
                <input type="email" placeholder="you@example.com" required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3C3A4D', marginBottom: 6 }}>Password</label>
                <input type="password" placeholder="At least 6 characters" required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={inputStyle} />
              </div>
              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '13px', background: '#7367F0',
                color: 'white', border: 'none', borderRadius: 9,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(115,103,240,0.35)'
              }}>
                {loading ? 'Creating account...' : 'Create free account'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, color: '#6F6B7D', fontSize: 13 }}>
            Already have an account? <Link to="/login" style={{ color: '#7367F0', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}