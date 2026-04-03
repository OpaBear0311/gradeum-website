'use client';

import { useState } from 'react';

const AMBER = '#C4882A';
const API_URL = 'https://api.gradeum.io/api/v1';

interface Props {
  product: 'praxis' | 'civitas';
}

export default function DemoRequestForm({ product }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');
    try {
      const res = await fetch(`${API_URL}/demo/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), product }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message?.includes('already') ? 'duplicate' : 'success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success' || status === 'duplicate') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '32px 0',
      }}>
        <div style={{
          fontSize: 18,
          color: '#E2E8F0',
          lineHeight: 1.6,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {status === 'success'
            ? <>Your demo key has been sent to <span style={{ color: AMBER, fontWeight: 600 }}>{email}</span>.<br />Check your inbox — you&apos;ll receive access within a few minutes.</>
            : <>A demo key has already been sent to <span style={{ color: AMBER, fontWeight: 600 }}>{email}</span>.<br />Check your inbox or spam folder.</>
          }
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: 12,
      maxWidth: 520,
      margin: '0 auto',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: '1 1 300px',
          padding: '14px 20px',
          fontSize: 15,
          fontFamily: "'DM Sans', sans-serif",
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          color: '#F8FAFC',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'submitting' || !email}
        style={{
          padding: '14px 28px',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: 0.5,
          background: status === 'submitting' ? `${AMBER}60` : AMBER,
          border: 'none',
          borderRadius: 8,
          color: '#0B1120',
          cursor: status === 'submitting' ? 'wait' : 'pointer',
        }}
      >
        {status === 'submitting' ? 'Sending...' : 'Request Demo Key'}
      </button>
      {status === 'error' && (
        <div style={{
          width: '100%',
          textAlign: 'center',
          fontSize: 13,
          color: '#EF4444',
          marginTop: 8,
        }}>
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
