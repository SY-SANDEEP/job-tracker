export default function StatusBadge({ status }) {
  const colors = {
    APPLIED:     { bg: '#DBEAFE', text: '#1D4ED8' },
    SHORTLISTED: { bg: '#FEF3C7', text: '#D97706' },
    INTERVIEW:   { bg: '#EDE9FE', text: '#7C3AED' },
    OFFER:       { bg: '#D1FAE5', text: '#065F46' },
    REJECTED:    { bg: '#FEE2E2', text: '#DC2626' },
  };

  const style = colors[status] || { bg: '#F3F4F6', text: '#374151' };

  return (
    <span style={{
      background: style.bg, color: style.text,
      padding: '4px 10px', borderRadius: 20,
      fontSize: 12, fontWeight: 600
    }}>
      {status}
    </span>
  );
}