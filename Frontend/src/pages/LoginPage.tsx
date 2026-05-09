// // v3 old style
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { loginApi, registerApi } from '../services/api'

// export default function LoginPage() {
//     const [mode, setMode]         = useState<'login' | 'register'>('login')
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [email, setEmail]       = useState('')
//     const [error, setError]       = useState('')
//     const [loading, setLoading]   = useState(false)
//     const navigate = useNavigate()

//     async function handleSubmit() {
//         setError('')
//         if (!username || !password) { setError('กรุณากรอก username และ password'); return }
//         setLoading(true)
//         try {
//             if (mode === 'register') {
//                 const data = await registerApi(username, password, email)
//                 if (data.error) { setError(data.error); return }
//                 setMode('login')
//                 setError('สมัครสมาชิกสำเร็จ! กรุณา Login')
//             } else {
//                 const data = await loginApi(username, password)
//                 if (data.error) { setError(data.error); return }
//                 localStorage.setItem('token', data.token)
//                 navigate('/tasks')
//             }
//         } catch { setError('เกิดข้อผิดพลาด กรุณาลองใหม่') }
//         finally { setLoading(false) }
//     }

//     const inputClass =
//         'w-full bg-[#0a0a0f] text-[#d4d4f0] border border-white/[0.07] rounded-xl px-4 py-3 text-[15px] outline-none mb-4 box-border transition-colors focus:border-indigo-500/50 appearance-none'

//     return (
//         <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-6 font-sans">
//             <div className="w-full max-w-[420px]">

//                 {/* Badge */}
//                 <div className="text-center mb-5">
//                     <span className="inline-block text-[11px] tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
//                         Todo App
//                     </span>
//                 </div>

//                 {/* Card */}
//                 <div className="bg-[#13131a] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
//                     <p className="text-xl sm:text-[26px] font-bold text-[#f1f0ff] mb-1 tracking-tight">
//                         {mode === 'login' ? 'Welcome back' : 'Create account'}
//                     </p>
//                     <p className="text-[13px] text-[#4a4a6a] mb-6">
//                         {mode === 'login' ? 'Login to see your tasks' : 'Register to get started'}
//                     </p>

//                     {error && (
//                         <div className="text-xs text-red-400 bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl px-3.5 py-2.5 mb-5">
//                             {error}
//                         </div>
//                     )}

//                     {/* Username */}
//                     <label className="block text-xs text-[#5a5a7a] mb-1.5 tracking-wide">Username</label>
//                     <input
//                         className={inputClass}
//                         type="text"
//                         value={username}
//                         onChange={e => setUsername(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleSubmit()}
//                         placeholder="your username"
//                         autoComplete="username"
//                     />

//                     {/* Email — register only */}
//                     {mode === 'register' && (
//                         <>
//                             <label className="block text-xs text-[#5a5a7a] mb-1.5 tracking-wide">
//                                 Email <span className="text-[#2a2a4a]">(optional)</span>
//                             </label>
//                             <input
//                                 className={inputClass}
//                                 type="email"
//                                 value={email}
//                                 onChange={e => setEmail(e.target.value)}
//                                 placeholder="your@email.com"
//                                 autoComplete="email"
//                             />
//                         </>
//                     )}

//                     {/* Password */}
//                     <label className="block text-xs text-[#5a5a7a] mb-1.5 tracking-wide">Password</label>
//                     <input
//                         className={inputClass}
//                         type="password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleSubmit()}
//                         placeholder="••••••••"
//                         autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
//                     />

//                     {/* Submit */}
//                     <button
//                         className="w-full bg-indigo-600 text-white border-none rounded-xl py-3.5 text-[15px] font-semibold cursor-pointer mt-1 mb-5 transition-colors active:bg-indigo-700 disabled:opacity-50"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
//                     </button>

//                     {/* Switch mode */}
//                     <div className="text-center text-[13px] text-[#4a4a6a]">
//                         {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                         <button
//                             className="bg-transparent border-none text-indigo-400 cursor-pointer text-[13px] p-0 font-semibold"
//                             onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
//                         >
//                             {mode === 'login' ? 'Register' : 'Login'}
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// v 4 separate style
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/api'

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        icon: (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
        ),
    },
    {
        label: 'Tasks',
        icon: (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
    },
    {
        label: 'Calendar',
        icon: (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
    },
    {
        label: 'Profile',
        icon: (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
]

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
        if (!username || !password) { setError('Please enter username and password'); return }
        setLoading(true)
        try {
            if (mode === 'register') {
                const data = await registerApi(username, password, email)
                if (data.error) { setError(data.error); return }
                setMode('login')
                setError('Account created! Please sign in.')
            } else {
                const data = await loginApi(username, password)
                if (data.error) { setError(data.error); return }
                localStorage.setItem('token', data.token)
                navigate('/tasks')
            }
        } catch { setError('Something went wrong. Please try again.') }
        finally { setLoading(false) }
    }

    const inputClass =
        'w-full bg-white text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[15px] outline-none transition-all duration-200 focus:border-violet-600 focus:ring-4 focus:ring-violet-100 placeholder:text-gray-300 font-sans'

    return (
        <div className="min-h-screen flex font-sans bg-[#f7f5f0]">

            {/* ── Left sidebar ── */}
            <aside className="hidden md:flex w-[200px] xl:w-[220px] bg-[#1a1a2e] flex-col justify-between px-6 py-8 flex-shrink-0">
                <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mb-8 font-sans">TaskFlow</p>
                    {NAV_ITEMS.map((item, i) => (
                        <div key={item.label}
                            className={`flex items-center gap-2.5 text-xs mb-4 cursor-pointer transition-colors duration-150 ${i === 0 ? 'text-white' : 'text-white/25 hover:text-white/50'}`}>
                            {item.icon}
                            <span>{item.label}</span>
                            {i === 0 && <span className="ml-auto w-1.5 h-1.5 bg-violet-500 rounded-full" />}
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-white/15 leading-relaxed">© 2026 TaskFlow<br />All rights reserved</p>
            </aside>

            {/* ── Right content ── */}
            <main className="flex-1 flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-12">
                <div className="max-w-[420px] w-full">

                    {/* Eyebrow */}
                    <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-4">
                        {mode === 'login' ? 'Member portal' : 'Get started'}
                    </p>

                    {/* Title */}
                    <h1 className="text-4xl xl:text-5xl font-black text-gray-900 leading-[1.05] tracking-tight mb-3">
                        {mode === 'login' ? (
                            <>Sign in to<br /><span className="text-violet-600">TaskFlow.</span></>
                        ) : (
                            <>Create your<br /><span className="text-violet-600">account.</span></>
                        )}
                    </h1>
                    <p className="text-[13px] text-gray-400 border-l-[3px] border-gray-200 pl-3 mb-8">
                        {mode === 'login' ? 'Your personal productivity workspace' : 'Start organizing your tasks today'}
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center justify-between text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
                            <span>{error}</span>
                            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ml-3 font-bold">✕</button>
                        </div>
                    )}

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Username</label>
                        <input className={inputClass} type="text" value={username}
                            onChange={e => setUsername(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            placeholder="your username" autoComplete="username" />
                    </div>

                    {/* Email — register only */}
                    {mode === 'register' && (
                        <div className="mb-4">
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
                                Email <span className="text-gray-300 normal-case tracking-normal">(optional)</span>
                            </label>
                            <input className={inputClass} type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com" autoComplete="email" />
                        </div>
                    )}

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Password</label>
                        <input className={inputClass} type="password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            placeholder="••••••••"
                            autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            className="flex-[2] bg-[#1a1a2e] hover:bg-violet-600 text-white rounded-xl py-4 text-sm font-bold tracking-wide transition-colors duration-200 disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : mode === 'login' ? 'Sign in →' : 'Create account →'}
                        </button>
                        <button
                            className="flex-1 bg-transparent hover:border-violet-500 hover:text-violet-600 text-gray-400 border-2 border-gray-200 rounded-xl py-4 text-sm font-medium transition-all duration-200"
                            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                        >
                            {mode === 'login' ? 'Register' : 'Sign in'}
                        </button>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mt-6">
                        {['Secure', 'Private', 'Fast'].map(tag => (
                            <span key={tag} className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    )
}