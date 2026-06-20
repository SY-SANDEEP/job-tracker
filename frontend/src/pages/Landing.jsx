import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ background: '#F8F7FA', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 60px', background: 'white', borderBottom: '1px solid #ECEEF1',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, fontWeight: 700, color: '#3C3A4D' }}>
          <div style={{
            width: 32, height: 32, background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15
          }}>💼</div>
          JobTrack
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <span style={{ color: '#6F6B7D', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Features</span>
          <span style={{ color: '#6F6B7D', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>How it works</span>
          <Link to="/login" style={{ color: '#3C3A4D', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#7367F0', color: 'white', border: 'none',
              padding: '10px 24px', borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(115,103,240,0.35)'
            }}>Get started free</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 56,
        padding: '72px 60px 56px', maxWidth: 1180, margin: '0 auto'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            background: '#EEE9FD', color: '#7367F0', fontSize: 12, fontWeight: 700,
            padding: '7px 16px', borderRadius: 20, marginBottom: 22, display: 'inline-flex',
            alignItems: 'center', gap: 6
          }}>✨ AI-Powered Job Tracking</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#3C3A4D', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-1px' }}>
            Stop juggling spreadsheets.<br />Start landing <span style={{
              background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>interviews.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#6F6B7D', lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
            JobTrack brings every application, interview, and follow-up into one clean dashboard — plus an AI assistant that scores your resume against any job description and preps you for interviews.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#7367F0', color: 'white', border: 'none',
                padding: '15px 34px', borderRadius: 10, fontSize: 15,
                fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 18px rgba(115,103,240,0.4)'
              }}>Start tracking free →</button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'white', color: '#3C3A4D', border: '1px solid #ECEEF1',
                padding: '15px 30px', borderRadius: 10, fontSize: 15, cursor: 'pointer', fontWeight: 600
              }}>Sign in</button>
            </Link>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            background: 'white', borderRadius: 18, boxShadow: '0 20px 50px rgba(76,72,140,0.18)', padding: 26,
            border: '1px solid #F1F0F7'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3C3A4D' }}>📊 Application Pipeline</div>
              <div style={{ fontSize: 11, color: '#A8A5B5' }}>This week</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 130, marginBottom: 16 }}>
              {[40, 70, 50, 95, 60, 35, 25].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: '100%', height: `${h}%`, borderRadius: '6px 6px 0 0',
                    background: h === 95 ? '#7367F0' : '#E4E1F7'
                  }} />
                  <div style={{ fontSize: 10, color: '#A8A5B5' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, borderTop: '1px solid #F1F0F7', paddingTop: 16 }}>
              {[
                { label: 'Applied', val: 'Tracked', color: '#7367F0' },
                { label: 'Interview', val: 'Scheduled', color: '#28C76F' },
                { label: 'Offer', val: 'Won', color: '#FF9F43' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: '#A8A5B5' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            position: 'absolute', top: -20, right: -28, background: 'white',
            borderRadius: 14, boxShadow: '0 12px 30px rgba(76,72,140,0.2)',
            padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid #F1F0F7'
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#E7F6EE', color: '#28C76F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>🏆</div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: '#3C3A4D' }}>Stay on top</div><div style={{ fontSize: 11, color: '#A8A5B5' }}>of every offer</div></div>
          </div>

          <div style={{
            position: 'absolute', bottom: -20, left: -30, background: 'white',
            borderRadius: 14, boxShadow: '0 12px 30px rgba(76,72,140,0.2)',
            padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid #F1F0F7'
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEE9FD', color: '#7367F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>🤖</div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: '#3C3A4D' }}>AI-matched</div><div style={{ fontSize: 11, color: '#A8A5B5' }}>resume scoring</div></div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '64px 60px', background: 'white', maxWidth: 1180, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, color: '#3C3A4D', marginBottom: 10 }}>
          Everything you need to land the job
        </h2>
        <p style={{ textAlign: 'center', fontSize: 15, color: '#6F6B7D', marginBottom: 48 }}>
          Built for job seekers who want clarity, not chaos
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '📊', bg: '#EEE9FD', color: '#7367F0', name: 'Visual pipeline', desc: 'Track every application from Applied to Offer in one organized, color-coded dashboard.' },
            { icon: '🤖', bg: '#FFF4E0', color: '#FF9F43', name: 'AI resume scorer', desc: 'Paste any job description and get an instant match score with specific improvement tips.' },
            { icon: '🎤', bg: '#E7F6EE', color: '#28C76F', name: 'Interview prep', desc: 'AI generates role-specific technical and HR questions so you walk in fully prepared.' },
            { icon: '✍️', bg: '#FDE8F0', color: '#EA5455', name: 'Resume tailor', desc: 'Get a tailored summary and bullet points matched to the exact job you are applying for.' },
            { icon: '📈', bg: '#E0F2FE', color: '#0EA5E9', name: 'Live analytics', desc: 'See your response rate, weekly activity, and pipeline health at a glance.' },
            { icon: '🔒', bg: '#F3F0FF', color: '#7367F0', name: 'Secure & private', desc: 'JWT-secured authentication keeps your application data fully private to you.' },
          ].map(f => (
            <div key={f.name} style={{ background: '#F8F7FA', borderRadius: 16, padding: 28 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 13, background: f.bg, color: f.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16
              }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#3C3A4D', marginBottom: 8 }}>{f.name}</div>
              <div style={{ fontSize: 13, color: '#A8A5B5', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '64px 60px', background: '#F8F7FA' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, color: '#3C3A4D', marginBottom: 10 }}>
          How it works
        </h2>
        <p style={{ textAlign: 'center', fontSize: 15, color: '#6F6B7D', marginBottom: 48 }}>
          Three steps to a more organized job search
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1180, margin: '0 auto' }}>
          {[
            { step: '1', title: 'Log every application', desc: 'Add the company, role, and status the moment you apply — takes seconds.' },
            { step: '2', title: 'Let AI do the heavy lifting', desc: 'Paste a job description to get a match score, missing skills, and tailored resume points.' },
            { step: '3', title: 'Walk into interviews ready', desc: 'Generate role-specific questions and practice before the big day.' },
          ].map(s => (
            <div key={s.step} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #ECEEF1' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
                color: 'white', fontSize: 15, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
              }}>{s.step}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#3C3A4D', marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#A8A5B5', lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg,#7367F0,#9E95F5)',
        padding: '64px 60px', textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: 'white', marginBottom: 12 }}>
          Your next offer starts with staying organized
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 30 }}>
          Free to use, no credit card required
        </p>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'white', color: '#7367F0', border: 'none',
            padding: '16px 36px', borderRadius: 10, fontSize: 15,
            fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>Get started — it's free →</button>
        </Link>
      </div>

      {/* Footer */}
      <div style={{ padding: '24px 60px', background: '#3C3A4D', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© 2026 JobTrack. Built by Sandeep Yadav.</p>
      </div>
    </div>
  );
}