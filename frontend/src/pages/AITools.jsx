import { useState } from 'react';

const callBackend = async (endpoint, body) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:8080/api/ai/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data.result;
};

const tabs = ['Resume Scorer', 'Interview Prep', 'Resume Tailor'];

export default function AITools() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [tailorJd, setTailorJd] = useState('');
  const [experience, setExperience] = useState('');

  const handleScore = async () => {
    if (!jd || !resume) return;
    setLoading(true); setResult('');
    try {
      setResult(await callBackend('score', { jd, resume }));
    } finally { setLoading(false); }
  };

  const handleInterview = async () => {
    if (!role) return;
    setLoading(true); setResult('');
    try {
      setResult(await callBackend('interview', { role, company }));
    } finally { setLoading(false); }
  };

  const handleTailor = async () => {
    if (!tailorJd || !experience) return;
    setLoading(true); setResult('');
    try {
      setResult(await callBackend('tailor', { jd: tailorJd, experience }));
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    border: '1px solid #E2E8F0', fontSize: 13, outline: 'none',
    background: '#F8FAFC', fontFamily: 'inherit', resize: 'vertical'
  };

  const btnStyle = {
    background: '#0F172A', color: 'white', border: 'none',
    padding: '10px 24px', borderRadius: 8, fontSize: 13,
    fontWeight: 500, cursor: 'pointer', marginTop: 12
  };

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#0F172A' }}>AI Tools ✨</h1>
        <p style={{ color: '#64748B', fontSize: 13, marginTop: 3 }}>
          Powered by Gemini — score your resume, prep for interviews, tailor your applications
        </p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => { setActiveTab(i); setResult(''); }} style={{
            padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', border: '1px solid',
            borderColor: activeTab === i ? '#0F172A' : '#E2E8F0',
            background: activeTab === i ? '#0F172A' : 'white',
            color: activeTab === i ? 'white' : '#64748B',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24 }}>

          {activeTab === 0 && (
            <>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>📊 Resume vs Job Description</h3>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Job Description</label>
              <textarea rows={5} placeholder="Paste the job description here..."
                value={jd} onChange={e => setJd(e.target.value)} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', margin: '12px 0 6px' }}>Your Resume / Skills</label>
              <textarea rows={5} placeholder="Paste your resume or list your skills..."
                value={resume} onChange={e => setResume(e.target.value)} style={inputStyle} />
              <button onClick={handleScore} disabled={loading} style={btnStyle}>
                {loading ? 'Analyzing...' : '→ Get Match Score'}
              </button>
            </>
          )}

          {activeTab === 1 && (
            <>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>🎤 Interview Question Generator</h3>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Role</label>
              <input placeholder="e.g. Full Stack Developer"
                value={role} onChange={e => setRole(e.target.value)}
                style={{ ...inputStyle, resize: 'none' }} />
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', margin: '12px 0 6px' }}>Company (optional)</label>
              <input placeholder="e.g. Google, Infosys"
                value={company} onChange={e => setCompany(e.target.value)}
                style={{ ...inputStyle, resize: 'none' }} />
              <button onClick={handleInterview} disabled={loading} style={btnStyle}>
                {loading ? 'Generating...' : '→ Generate Questions'}
              </button>
            </>
          )}

          {activeTab === 2 && (
            <>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>✍️ Tailor Resume for Job</h3>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Job Description</label>
              <textarea rows={4} placeholder="Paste the job description..."
                value={tailorJd} onChange={e => setTailorJd(e.target.value)} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', margin: '12px 0 6px' }}>Your Experience & Skills</label>
              <textarea rows={4} placeholder="Describe your experience, projects, and skills..."
                value={experience} onChange={e => setExperience(e.target.value)} style={inputStyle} />
              <button onClick={handleTailor} disabled={loading} style={btnStyle}>
                {loading ? 'Tailoring...' : '→ Tailor My Resume'}
              </button>
            </>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24, minHeight: 300 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>AI Response</h3>
            {result && (
              <button onClick={() => navigator.clipboard.writeText(result)} style={{
                fontSize: 11, padding: '4px 12px', borderRadius: 6,
                border: '1px solid #E2E8F0', background: 'white',
                cursor: 'pointer', color: '#64748B'
              }}>Copy</button>
            )}
          </div>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <div style={{
                width: 32, height: 32, border: '3px solid #E2E8F0',
                borderTop: '3px solid #0F172A', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Gemini is thinking...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          )}

          {!loading && !result && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
              <p style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center' }}>
                Fill in the details and click the button.<br />AI response will appear here.
              </p>
            </div>
          )}

          {!loading && result && (
            <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap', maxHeight: 420, overflowY: 'auto' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}