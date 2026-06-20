import { useEffect, useState } from 'react';
import api from '../api/axios';
import JobFormModal from '../components/JobFormModal';

const statusColor = {
  APPLIED:     { bg: '#EEF2FF', color: '#4338CA' },
  SHORTLISTED: { bg: '#FFFBEB', color: '#92400E' },
  INTERVIEW:   { bg: '#F5F3FF', color: '#7C3AED' },
  OFFER:       { bg: '#ECFDF5', color: '#065F46' },
  REJECTED:    { bg: '#FEF2F2', color: '#DC2626' },
};

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const fetchJobs = () => api.get('/api/jobs').then(res => setJobs(res.data));
  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this application?')) {
      await api.delete(`/api/jobs/${id}`);
      fetchJobs();
    }
  };

  const filtered = filter === 'ALL' ? jobs : jobs.filter(j => j.status === filter);
  const statuses = ['ALL', 'APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFER', 'REJECTED'];

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#0F172A' }}>Applications</h1>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 3 }}>{jobs.length} total applications</p>
        </div>
        <button onClick={() => { setEditJob(null); setShowModal(true); }} style={{
          background: '#6366F1', color: 'white', border: 'none',
          padding: '9px 18px', borderRadius: 8, fontSize: 13,
          fontWeight: 500, cursor: 'pointer'
        }}>+ Add Application</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
            cursor: 'pointer', border: '1px solid',
            borderColor: filter === s ? '#6366F1' : '#E2E8F0',
            background: filter === s ? '#6366F1' : 'white',
            color: filter === s ? 'white' : '#64748B',
          }}>{s}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Company', 'Role', 'Status', 'Date Applied', 'Notes', ''].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                No applications found. Click "+ Add Application" to get started.
              </td></tr>
            ) : filtered.map(job => {
              const sc = statusColor[job.status] || { bg: '#F1F5F9', color: '#475569' };
              return (
                <tr key={job.id} style={{ borderTop: '1px solid #F1F5F9' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{job.companyName}</div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 13, color: '#475569' }}>{job.role}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500 }}>{job.status}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#94A3B8' }}>{job.appliedDate || '—'}</td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#94A3B8', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.notes || '—'}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setEditJob(job); setShowModal(true); }} style={{
                        width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0',
                        background: 'white', cursor: 'pointer', fontSize: 13, color: '#64748B'
                      }}>✎</button>
                      <button onClick={() => handleDelete(job.id)} style={{
                        width: 28, height: 28, borderRadius: 6, border: '1px solid #FECACA',
                        background: '#FEF2F2', cursor: 'pointer', fontSize: 13, color: '#DC2626'
                      }}>✕</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <JobFormModal
          job={editJob}
          onClose={() => setShowModal(false)}
          onSave={() => { fetchJobs(); setShowModal(false); }}
        />
      )}
    </div>
  );
}