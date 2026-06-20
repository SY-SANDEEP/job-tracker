import { useState } from 'react';
import api from '../api/axios';

export default function JobFormModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({
    companyName: job?.companyName || '',
    role: job?.role || '',
    status: job?.status || 'APPLIED',
    appliedDate: job?.appliedDate || '',
    jobLink: job?.jobLink || '',
    notes: job?.notes || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (job) {
      await api.put(`/api/jobs/${job.id}`, form);
    } else {
      await api.post('/api/jobs', form);
    }
    onSave();
  };

  const inputStyle = {
    width: '100%', padding: 8, marginBottom: 12,
    border: '1px solid #E5E7EB', borderRadius: 6
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 999
    }}>
      <div style={{ background: 'white', padding: 32, borderRadius: 12, width: 480 }}>
        <h3>{job ? 'Edit Job' : 'Add New Job'}</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Company Name" required
            value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
            style={inputStyle} />
          <input placeholder="Role" required
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={inputStyle} />
          <select value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            style={inputStyle}>
            <option>APPLIED</option>
            <option>SHORTLISTED</option>
            <option>INTERVIEW</option>
            <option>OFFER</option>
            <option>REJECTED</option>
          </select>
          <input type="date"
            value={form.appliedDate}
            onChange={e => setForm({ ...form, appliedDate: e.target.value })}
            style={inputStyle} />
          <input placeholder="Job Link (optional)"
            value={form.jobLink}
            onChange={e => setForm({ ...form, jobLink: e.target.value })}
            style={inputStyle} />
          <textarea placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            style={{ ...inputStyle, height: 80 }} />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '8px 20px', border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit"
              style={{ padding: '8px 20px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              {job ? 'Update' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}