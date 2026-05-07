import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/api'
// import { SparkleTrail } from '../components/SparkleTrail'

export default function LoginPage() {
    const [mode, setMode]         = useState<'login' | 'register'>('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail]       = useState('')
    const [error, setError]       = useState('')
    const [loading, setLoading]   = useState(false)
    const navigate = useNavigate()

    async function handleSubmit() {
        setError('')
        if (!username || !password) { setError('กรุณากรอก username และ password'); return }
        setLoading(true)
        try {
            if (mode === 'register') {
                const data = await registerApi(username, password, email)
                if (data.error) { setError(data.error); return }
                setMode('login')
                setError('สมัครสมาชิกสำเร็จ! กรุณา Login')
            } else {
                const data = await loginApi(username, password)
                if (data.error) { setError(data.error); return }
                localStorage.setItem('token', data.token)
                navigate('/tasks')
            }
        } catch { setError('เกิดข้อผิดพลาด กรุณาลองใหม่') }
        finally { setLoading(false) }
    }

    const s = {
        page: {
            minHeight: '100vh',
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: "'DM Sans', system-ui, sans-serif",
        } as React.CSSProperties,
        wrap: {
            width: '100%',
            maxWidth: '380px',
        } as React.CSSProperties,
        badge: {
            display: 'inline-block',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#6366f1',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            padding: '4px 12px',
            borderRadius: '99px',
            marginBottom: '24px',
        },
        card: {
            background: '#13131a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '32px',
        } as React.CSSProperties,
        title: {
            fontSize: '22px',
            fontWeight: 600,
            color: '#f1f0ff',
            marginBottom: '4px',
            letterSpacing: '-0.02em',
        },
        subtitle: {
            fontSize: '13px',
            color: '#4a4a6a',
            marginBottom: '28px',
        },
        errorBox: {
            fontSize: '12px',
            color: '#f87171',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            fontSize: '12px',
            color: '#5a5a7a',
            marginBottom: '6px',
            letterSpacing: '0.02em',
        },
        input: {
            width: '100%',
            background: '#0a0a0f',
            color: '#d4d4f0',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box' as const,
            marginBottom: '16px',
            transition: 'border-color 0.2s',
        },
        btnPrimary: {
            width: '100%',
            background: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '11px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '4px',
            marginBottom: '20px',
            transition: 'background 0.2s',
            opacity: loading ? 0.5 : 1,
        } as React.CSSProperties,
        switchRow: {
            textAlign: 'center' as const,
            fontSize: '12px',
            color: '#4a4a6a',
        },
        switchBtn: {
            background: 'none',
            border: 'none',
            color: '#6366f1',
            cursor: 'pointer',
            fontSize: '12px',
            padding: 0,
            fontWeight: 600,
        },
    }

    return (
        <div style={s.page}>
            {/* <SparkleTrail/> */}
            <div style={s.wrap}>
                <div style={{ textAlign: 'center' }}>
                    <span style={s.badge}>Todo App</span>
                </div>
                <div style={s.card}>
                    <div style={s.title}>
                        {mode === 'login' ? 'Welcome back' : 'Create account'}
                    </div>
                    <div style={s.subtitle}>
                        {mode === 'login' ? 'Login to see your tasks' : 'Register to get started'}
                    </div>

                    {error && <div style={s.errorBox}>{error}</div>}

                    <label style={s.label}>Username</label>
                    <input
                        style={s.input}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="your username"
                    />

                    {mode === 'register' && <>
                        <label style={s.label}>Email <span style={{ color: '#2a2a4a' }}>(optional)</span></label>
                        <input
                            style={s.input}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                        />
                    </>}

                    <label style={s.label}>Password</label>
                    <input
                        style={s.input}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="••••••••"
                    />

                    <button style={s.btnPrimary} onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
                    </button>

                    <div style={s.switchRow}>
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button style={s.switchBtn} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>
                            {mode === 'login' ? 'Register' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
