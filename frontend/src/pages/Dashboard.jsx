import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const statCards = [
  { key: 'total',       label: 'Total Applied',  color: '#6366F1', bg: '#EEF2FF', icon: '📤' },
  { key: 'interview',   label: 'Interviews',      color: '#8B5CF6', bg: '#F5F3FF', icon: '🎤' },
  { key: 'offer',       label: 'Offers',          color: '#10B981', bg: '#ECFDF5', icon: '🏆' },
  { key: 'shortlisted', label: 'Shortlisted',     color: '#F59E0B', bg: '#FFFBEB', icon: '⭐' },
  { key: 'rejected',    label: 'Rejected',        color: '#EF4444', bg: '#FEF2F2', icon: '✕' },
  { key: 'applied',     label: 'Pending Reply',   color: '#14B8A6', bg: '#F0FDFA', icon: '⏳' },
];

const statusColor = {
  APPLIED:     { bg: '#EEF2FF', color: '#4338CA' },
  SHORTLISTED: { bg: '#FFFBEB', color: '#92400E' },
  INTERVIEW:   { bg: '#F5F3FF', color: '#7C3AED' },
  OFFER:       { bg: '#ECFDF5', color: '#065F46' },
  REJECTED:    { bg: '#FEF2F2', color: '#DC2626' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/api/dashboard/stats').then(res => setStats(res.data));
    api.get('/api/jobs').then(res => setJobs(res.data.slice(0, 5)));
  }, []);

  const total = stats.total || 1;

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#0F172A' }}>
            Good morning, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 3 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link to="/applications">
          <button style={{
            background: '#6366F1', color: 'white', border: 'none',
            padding: '9px 18px', borderRadius: 8, fontSize: 13,
            fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
          }}>+ Add Application</button>
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {statCards.map(card => (
          <div key={card.key} style={{
            background: 'white', borderRadius: 12,
            border: '1px solid #E2E8F0', padding: '16px 20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{card.label}</span>
              <div style={{
                width: 30, height: 30, background: card.bg,
                borderRadius: 7, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14
              }}>{card.icon}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: '#0F172A' }}>{stats[card.key] ?? 0}</div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div style={{
        background: 'white', borderRadius: 12,
        border: '1px solid #E2E8F0', padding: '16px 20px', marginBottom: 24
      }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', marginBottom: 12 }}>Application pipeline</p>
        <div style={{ display: 'flex', height: 6, borderRadius: 4, overflow: 'hidden', gap: 2, marginBottom: 12 }}>
          {[
            { key: 'applied', color: '#6366F1' },
            { key: 'shortlisted', color: '#F59E0B' },
            { key: 'interview', color: '#8B5CF6' },
            { key: 'offer', color: '#10B981' },
            { key: 'rejected', color: '#EF4444' },
          ].map(s => (
            <div key={s.key} style={{
              height: '100%',
              width: `${((stats[s.key] || 0) / total) * 100}%`,
              background: s.color, minWidth: stats[s.key] ? 4 : 0
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Applied', key: 'applied', color: '#6366F1' },
            { label: 'Shortlisted', key: 'shortlisted', color: '#F59E0B' },
            { label: 'Interview', key: 'interview', color: '#8B5CF6' },
            { label: 'Offer', key: 'offer', color: '#10B981' },
            { label: 'Rejected', key: 'rejected', color: '#EF4444' },
          ].map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
              {s.label} {stats[s.key] ?? 0}
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>Recent applications</span>
          <Link to="/applications" style={{ fontSize: 12, color: '#6366F1', textDecoration: 'none' }}>View all →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Company', 'Role', 'Status', 'Date'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>
                No applications yet. <Link to="/applications" style={{ color: '#6366F1' }}>Add your first one →</Link>
              </td></tr>
            ) : jobs.map(job => {
              const sc = statusColor[job.status] || { bg: '#F1F5F9', color: '#475569' };
              return (
                <tr key={job.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{job.companyName}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{job.role}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      padding: '3px 10px', borderRadius: 20,
                      fontSize: 11, fontWeight: 500
                    }}>{job.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8' }}>{job.appliedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}