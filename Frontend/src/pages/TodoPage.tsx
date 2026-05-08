//  // v1
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Spinner from '../components/Spinner'
// import ConfirmModal from '../components/ConfirmModal'
// // import { SparkleTrail } from '../components/SparkleTrail'
// import { getTasksApi, createTaskApi, updateTaskApi, toggleTaskApi, deleteTaskApi } from '../services/api'

// interface Task {
//     id: number
//     title: string
//     description: string | null
//     is_completed: boolean
//     created_at: string
//     due_date: string | null
//     priority: string | null
// }

// export default function TodoPage() {
//     const navigate = useNavigate()
//     const [tasks, setTasks]         = useState<Task[]>([])
//     const [loading, setLoading]     = useState(true)
//     const [error, setError]         = useState('')
//     const [newTitle, setNewTitle]   = useState('')
//     const [newDesc, setNewDesc]     = useState('')
//     const [adding, setAdding]       = useState(false)
//     const [editId, setEditId]       = useState<number | null>(null)
//     const [editTitle, setEditTitle] = useState('')
//     const [editDesc, setEditDesc]   = useState('')
//     const [filter, setFilter]       = useState<'all' | 'active' | 'done'>('all')
//     const [username, setUsername] = useState('')
//     const [deleteId, setDeleteId] = useState<number | null>(null)
//     const [deleteTitle, setDeleteTitle] = useState('')
//     const [newDueDate, setNewDueDate] = useState('')
//     const [newPriority, setNewPriority] = useState('medium')
//     const [search, setSearch] = useState('')

//     async function fetchTasks() {
//         try {
//             setLoading(true)
//             const data = await getTasksApi()
//             if (data.error) { navigate('/login'); return }
//             setTasks(data)
//         } catch { setError('โหลด task ไม่สำเร็จ') }
//         finally { setLoading(false) }
//     }

//     useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) { navigate('/login'); return }

//     // ← add these 2 lines:
//     const payload = JSON.parse(atob(token.split('.')[1]))
//     setUsername(payload.username)

//     fetchTasks()
// }, [])

//     async function handleCreate() {
//         if (!newTitle.trim()) return
//         console.log('Priiority begin sent:', newPriority)
//         try {
//             setAdding(true)
//             const task = await createTaskApi(newTitle, newDesc, newDueDate || undefined, newPriority)
//             setTasks(prev => [task, ...prev])
//             setNewTitle('')
//             setNewDesc('')
//             setNewDueDate('')
//             setNewPriority('medium')
//         } catch { setError('สร้าง task ไม่สำเร็จ') }
//         finally { setAdding(false) }
//     }

//     async function handleToggle(id: number) {
//         const updated = await toggleTaskApi(id)
//         setTasks(prev => prev.map(t => t.id === id ? updated : t))
//     }

//     function startEdit(task: Task) {
//         setEditId(task.id); setEditTitle(task.title); setEditDesc(task.description || '')
//     }

//     async function handleSaveEdit(id: number) {
//         if (!editTitle.trim()) return
//         const updated = await updateTaskApi(id, { title: editTitle, description: editDesc })
//         setTasks(prev => prev.map(t => t.id === id ? updated : t))
//         setEditId(null)
//     }

//     async function askDelete(task: Task) {
//     setDeleteId(task.id)        // remember which task
//     setDeleteTitle(task.title)  // remember its name to show in modal
//     }

//     async function confirmDelete() {
//     if (!deleteId) return
//     await deleteTaskApi(deleteId)
//     setTasks(prev => prev.filter(t => t.id !== deleteId))
//     setDeleteId(null)  // close modal
//     }

//     function handleLogout() {
//         localStorage.removeItem('token'); navigate('/login')
//     }

//     const filtered = tasks
//         .filter(t =>
//             filter === 'active' ? !t.is_completed : filter === 'done' ? t.is_completed : true
//         )
//         .filter(t =>
//             search.trim() === '' ? true : t.title.toLowerCase().includes(search.toLowerCase())
//         )
//     const doneCount = tasks.filter(t => t.is_completed).length

//     // ── Styles ────────────────────────────────────────────────────────────
//     const page: React.CSSProperties = {
//         minHeight: '100vh',
//         background: '#0a0a0f',
//         padding: '40px 16px',
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//         color: '#d4d4f0',
//     }
//     const inner: React.CSSProperties = {
//         maxWidth: '520px',
//         margin: '0 auto',
//     }
//     const card: React.CSSProperties = {
//         background: '#13131a',
//         border: '1px solid rgba(255,255,255,0.06)',
//         borderRadius: '14px',
//         padding: '16px',
//     }
//     const inputStyle: React.CSSProperties = {
//         width: '100%',
//         background: '#0a0a0f',
//         color: '#d4d4f0',
//         border: '1px solid rgba(255,255,255,0.07)',
//         borderRadius: '10px',
//         padding: '10px 14px',
//         fontSize: '14px',
//         outline: 'none',
//         boxSizing: 'border-box',
//         marginBottom: '10px',
//     }
//     const btnPrimary: React.CSSProperties = {
//         width: '100%',
//         background: '#4f46e5',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '10px',
//         padding: '10px',
//         fontSize: '13px',
//         fontWeight: 600,
//         cursor: 'pointer',
//     }

//     return (
//         <div style={page}>
//             {/* <SparkleTrail/> */}
//             <div style={inner}>

//                 {/* Header */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
//                     <div>
//                         <p style={{ fontSize: '12px', color: '#3a3a5a', margin: '0 0 4px' }}>
//                             Welcome back,
//                         </p>
//                         <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#f1f0ff', letterSpacing: '-0.02em', margin: 0 }}>
//                             {username} 👋
//                         </h1>
//                         <p style={{ fontSize: '12px', color: '#3a3a5a', marginTop: '4px' }}>
//                             {doneCount} / {tasks.length} completed
//                         </p>
//                     </div>
//                     <button onClick={handleLogout} style={{
//                         background: 'none',
//                         border: '1px solid rgba(255,255,255,0.07)',
//                         color: '#4a4a6a',
//                         borderRadius: '8px',
//                         padding: '6px 14px',
//                         fontSize: '12px',
//                         cursor: 'pointer',
//                     }}>
//                         Logout
//                     </button>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                     <div style={{
//                         fontSize: '12px', color: '#f87171',
//                         background: 'rgba(239,68,68,0.08)',
//                         border: '1px solid rgba(239,68,68,0.15)',
//                         borderRadius: '10px', padding: '10px 14px',
//                         marginBottom: '16px',
//                         display: 'flex', justifyContent: 'space-between'
//                     }}>
//                         <span>{error}</span>
//                         <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}>✕</button>
//                     </div>
//                 )}

//                 {/* Search bar */}
//                 <div style={{ position: 'relative', marginBottom: '16px' }}>
//                     <span style={{
//                         position: 'absolute',
//                         left: '14px',
//                         top: '50%',
//                         transform: 'translateY(-50%)',
//                         fontSize: '14px',
//                         color: '#3a3a5a',
//                     }}>
//                         🔍
//                     </span>
//                     <input
//                         type="text"
//                         placeholder="Search tasks..."
//                         value={search}
//                         onChange={e => setSearch(e.target.value)}
//                         style={{
//                             width: '100%',
//                             background: '#13131a',
//                             color: '#d4d4f0',
//                             border: '1px solid rgba(255,255,255,0.06)',
//                             borderRadius: '12px',
//                             padding: '10px 14px 10px 38px',
//                             fontSize: '14px',
//                             outline: 'none',
//                             boxSizing: 'border-box' as const,
//                         }}
//                     />
//                     {/* Clear button — only shows when typing */}
//                     {search && (
//                         <button
//                             onClick={() => setSearch('')}
//                             style={{
//                                 position: 'absolute',
//                                 right: '12px',
//                                 top: '50%',
//                                 transform: 'translateY(-50%)',
//                                 background: 'none',
//                                 border: 'none',
//                                 color: '#3a3a5a',
//                                 cursor: 'pointer',
//                                 fontSize: '14px',
//                                 padding: 0,
//                             }}
//                         >
//                             ✕
//                         </button>
//                     )}
//                 </div>

//                 {/* Add task */}
//                 <div style={{ ...card, marginBottom: '16px' }}>
//                     <input
//                         style={inputStyle}
//                         type="text"
//                         placeholder="Task title..."
//                         value={newTitle}
//                         onChange={e => setNewTitle(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleCreate()}
//                     />
//                     <input
//                         style={{ ...inputStyle, marginBottom: '12px' }}
//                         type="text"
//                         placeholder="Description (optional)"
//                         value={newDesc}
//                         onChange={e => setNewDesc(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleCreate()}
//                     />
//                     <input
//                         style={{ ...inputStyle, marginBottom: '12px', colorScheme: 'dark' }}
//                         type="date"
//                         value={newDueDate}
//                         onChange={e => setNewDueDate(e.target.value)}
//                     />

//                 {/* Priority picker */}
//                 <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
//                     {(['low', 'medium', 'high'] as const).map(p => (
//                         <button
//                             type="button"
//                             key={p}
//                             onClick={() => setNewPriority(p)}
//                             style={{
//                                 flex: 1,
//                                 padding: '8px',
//                                 borderRadius: '10px',
//                                 fontSize: '12px',
//                                 fontWeight: 500,
//                                 cursor: 'pointer',
//                                 textTransform: 'capitalize',
//                                 border: newPriority === p
//                                     ? `1px solid ${p === 'high' ? '#f87171' : p === 'medium' ? '#fb923c' : '#4ade80'}`
//                                     : '1px solid rgba(255,255,255,0.06)',
//                                 background: newPriority === p
//                                     ? p === 'high' ? 'rgba(248,113,113,0.1)' : p === 'medium' ? 'rgba(251,146,60,0.1)' : 'rgba(74,222,128,0.1)'
//                                     : '#0a0a0f',
//                                 color: newPriority === p
//                                     ? p === 'high' ? '#f87171' : p === 'medium' ? '#fb923c' : '#4ade80'
//                                     : '#3a3a5a',
//                             }}
//                         >
//                             {p === 'high' ? '🔴' : p === 'medium' ? '🟠' : '🟢'} {p}
//                         </button>
//                     ))}

//                 </div>
//                     <button
//                         style={{ ...btnPrimary, opacity: adding || !newTitle.trim() ? 0.4 : 1 }}
//                         onClick={handleCreate}
//                         disabled={adding || !newTitle.trim()}
//                     >
//                         {adding ? 'Adding...' : '+ Add task'}
//                     </button>
//                 </div>

//                 {/* Filters */}
//                 <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
//                     {(['all', 'active', 'done'] as const).map(f => (
//                         <button key={f} onClick={() => setFilter(f)} style={{
//                             flex: 1,
//                             padding: '8px',
//                             borderRadius: '10px',
//                             fontSize: '12px',
//                             fontWeight: 500,
//                             cursor: 'pointer',
//                             textTransform: 'capitalize',
//                             transition: 'all 0.15s',
//                             background: filter === f ? '#4f46e5' : '#13131a',
//                             color: filter === f ? '#fff' : '#4a4a6a',
//                             border: filter === f ? '1px solid #4f46e5' : '1px solid rgba(255,255,255,0.06)',
//                         }}>
//                             {f}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Task list */}
//                 {loading ? (
//                     <Spinner />
//                 ) : filtered.length === 0 ? (
//                     <p style={{ textAlign: 'center', color: '#3a3a5a', fontSize: '14px', padding: '60px 0' }}>
//                         {search
//                             ? `No tasks matching "${search}"`
//                             : filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`
//                         }
//                     </p>
//                 ) : (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                         {filtered.map(task => (
//                             <div key={task.id} style={{
//                                 ...card,
//                                 borderColor: editId === task.id ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
//                             }}>
//                                 {editId === task.id ? (
//                                     // Edit mode
//                                     <div>
//                                         <input
//                                             style={inputStyle}
//                                             value={editTitle}
//                                             onChange={e => setEditTitle(e.target.value)}
//                                         />
//                                         <input
//                                             style={{ ...inputStyle, marginBottom: '12px' }}
//                                             value={editDesc}
//                                             onChange={e => setEditDesc(e.target.value)}
//                                             placeholder="Description"
//                                         />
//                                         <div style={{ display: 'flex', gap: '8px' }}>
//                                             <button onClick={() => handleSaveEdit(task.id)} style={{ ...btnPrimary, flex: 1 }}>
//                                                 Save
//                                             </button>
//                                             <button onClick={() => setEditId(null)} style={{
//                                                 flex: 1, background: 'rgba(255,255,255,0.05)',
//                                                 border: '1px solid rgba(255,255,255,0.06)',
//                                                 color: '#6a6a8a', borderRadius: '10px',
//                                                 padding: '10px', fontSize: '13px', cursor: 'pointer',
//                                             }}>
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     // View mode
//                                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>

//                                         {/* Toggle circle */}
//                                         <button onClick={() => handleToggle(task.id)} style={{
//                                             width: '18px', height: '18px',
//                                             borderRadius: '50%',
//                                             border: task.is_completed ? 'none' : '1.5px solid #2a2a4a',
//                                             background: task.is_completed ? '#10b981' : 'transparent',
//                                             cursor: 'pointer',
//                                             flexShrink: 0,
//                                             marginTop: '2px',
//                                             display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                             transition: 'all 0.2s',
//                                             padding: 0,
//                                         }}>
//                                             {task.is_completed && (
//                                                 <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
//                                                     <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                                                 </svg>
//                                             )}
//                                         </button>

//                                         {/* Text */}
//                                         <div style={{ flex: 1, minWidth: 0 }}>
//                                             <p style={{
//                                                 margin: 0, fontSize: '14px', fontWeight: 500,
//                                                 color: task.is_completed ? '#2a2a4a' : '#e8e8ff',
//                                                 textDecoration: task.is_completed ? 'line-through' : 'none',
//                                             }}>
//                                                 {task.title}
//                                             </p>
//                                             {task.description && (
//                                                 <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#3a3a5a' }}>
//                                                     {task.description}
//                                                 </p>
//                                             )}

//                                         {/* Priority badge */}
//                                         <span style={{
//                                             display: 'inline-block',
//                                             fontSize: '10px',
//                                             fontWeight: 600,
//                                             padding: '2px 8px',
//                                             borderRadius: '99px',
//                                             marginTop: '4px',
//                                             textTransform: 'capitalize',
//                                             background: task.priority === 'high' ? 'rgba(248,113,113,0.1)'
//                                                 : task.priority === 'low' ? 'rgba(74,222,128,0.1)'
//                                                 : 'rgba(251,146,60,0.1)',
//                                             color: task.priority === 'high' ? '#f87171'
//                                                 : task.priority === 'low' ? '#4ade80'
//                                                 : '#fb923c',
//                                             border: `1px solid ${task.priority === 'high' ? 'rgba(248,113,113,0.2)'
//                                                 : task.priority === 'low' ? 'rgba(74,222,128,0.2)'
//                                                 : 'rgba(251,146,60,0.2)'}`,
//                                         }}>
//                                             {task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟠'} {task.priority || 'medium'}
//                                         </span>
//                                             {task.due_date && (
//                                                 <p style={{
//                                                     margin: '4px 0 0',
//                                                     fontSize: '11px',
//                                                     color: new Date(task.due_date) < new Date() && !task.is_completed
//                                                         ? '#f87171'   // red if overdue
//                                                         : '#3a3a5a',  // gray if fine
//                                                 }}>
//                                                     📅 {new Date(task.due_date).toLocaleDateString('th-TH', {
//                                                         day: 'numeric',
//                                                         month: 'short',
//                                                         year: 'numeric'
//                                                     })}
//                                                     {new Date(task.due_date) < new Date() && !task.is_completed && ' · overdue'}
//                                                 </p>
//                                             )}
//                                         </div>

//                                         {/* Actions */}
//                                         <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
//                                             <button onClick={() => startEdit(task)} style={{
//                                                 background: 'none', border: 'none',
//                                                 color: '#3a3a5a', cursor: 'pointer',
//                                                 padding: '4px 6px', borderRadius: '6px', fontSize: '13px',
//                                             }}>✏️</button>
//                                             <button onClick={() => askDelete(task)} style={{
//                                                 background: 'none', border: 'none',
//                                                 color: '#3a3a5a', cursor: 'pointer',
//                                                 padding: '4px 6px', borderRadius: '6px', fontSize: '13px',
//                                             }}>🗑️</button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             {/* Delete confirm modal */}
//             {deleteId && (
//                 <ConfirmModal
//                     message={`"${deleteTitle}" will be permanently deleted.`}
//                     onConfirm={confirmDelete}
//                     onCancel={() => setDeleteId(null)}
//                 />
//             )}
//         </div>
//     )
// }

// v2
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import ConfirmModal from '../components/ConfirmModal'
import { getTasksApi, createTaskApi, updateTaskApi, toggleTaskApi, deleteTaskApi } from '../services/api'
 
interface Task {
    id: number
    title: string
    description: string | null
    is_completed: boolean
    created_at: string
    due_date: string | null
    priority: string | null
}
 
export default function TodoPage() {
    const navigate = useNavigate()
    const [tasks, setTasks]             = useState<Task[]>([])
    const [loading, setLoading]         = useState(true)
    const [error, setError]             = useState('')
    const [newTitle, setNewTitle]       = useState('')
    const [newDesc, setNewDesc]         = useState('')
    const [adding, setAdding]           = useState(false)
    const [editId, setEditId]           = useState<number | null>(null)
    const [editTitle, setEditTitle]     = useState('')
    const [editDesc, setEditDesc]       = useState('')
    const [filter, setFilter]           = useState<'all' | 'active' | 'done'>('all')
    const [username, setUsername]       = useState('')
    const [deleteId, setDeleteId]       = useState<number | null>(null)
    const [deleteTitle, setDeleteTitle] = useState('')
    const [newDueDate, setNewDueDate]   = useState('')
    const [newPriority, setNewPriority] = useState('medium')
    const [search, setSearch]           = useState('')
 
    async function fetchTasks() {
        try {
            setLoading(true)
            const data = await getTasksApi()
            if (data.error) { navigate('/login'); return }
            setTasks(data)
        } catch { setError('โหลด task ไม่สำเร็จ') }
        finally { setLoading(false) }
    }
 
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { navigate('/login'); return }
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUsername(payload.username)
        fetchTasks()
    }, [])
 
    async function handleCreate() {
        if (!newTitle.trim()) return
        try {
            setAdding(true)
            const task = await createTaskApi(newTitle, newDesc, newDueDate || undefined, newPriority)
            setTasks(prev => [task, ...prev])
            setNewTitle(''); setNewDesc(''); setNewDueDate(''); setNewPriority('medium')
        } catch { setError('สร้าง task ไม่สำเร็จ') }
        finally { setAdding(false) }
    }
 
    async function handleToggle(id: number) {
        const updated = await toggleTaskApi(id)
        setTasks(prev => prev.map(t => t.id === id ? updated : t))
    }
 
    function startEdit(task: Task) {
        setEditId(task.id); setEditTitle(task.title); setEditDesc(task.description || '')
    }
 
    async function handleSaveEdit(id: number) {
        if (!editTitle.trim()) return
        const updated = await updateTaskApi(id, { title: editTitle, description: editDesc })
        setTasks(prev => prev.map(t => t.id === id ? updated : t))
        setEditId(null)
    }
 
    function askDelete(task: Task) {
        setDeleteId(task.id)
        setDeleteTitle(task.title)
    }
 
    async function confirmDelete() {
        if (!deleteId) return
        await deleteTaskApi(deleteId)
        setTasks(prev => prev.filter(t => t.id !== deleteId))
        setDeleteId(null)
    }
 
    function handleLogout() {
        localStorage.removeItem('token'); navigate('/login')
    }
 
    const filtered = tasks
        .filter(t => filter === 'active' ? !t.is_completed : filter === 'done' ? t.is_completed : true)
        .filter(t => search.trim() === '' ? true : t.title.toLowerCase().includes(search.toLowerCase()))
 
    const doneCount = tasks.filter(t => t.is_completed).length
 
    return (
        <>
            <style>{`
                .todo-page {
                    min-height: 100vh;
                    min-height: 100dvh;
                    background: #0a0a0f;
                    font-family: 'DM Sans', system-ui, sans-serif;
                    color: #d4d4f0;
                }
                .todo-inner {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 28px 16px 60px;
                }
                .todo-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                    gap: 12px;
                }
                .todo-header-left { flex: 1; }
                .todo-welcome { font-size: 12px; color: #3a3a5a; margin: 0 0 4px; }
                .todo-username {
                    font-size: clamp(20px, 5vw, 26px);
                    font-weight: 700; color: #f1f0ff;
                    margin: 0 0 4px; letter-spacing: -0.02em;
                }
                .todo-count { font-size: 12px; color: #3a3a5a; margin: 0; }
                .todo-logout {
                    background: none;
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #4a4a6a; border-radius: 10px;
                    padding: 8px 16px; font-size: 13px;
                    cursor: pointer; flex-shrink: 0;
                    white-space: nowrap;
                    -webkit-tap-highlight-color: transparent;
                }
                .todo-input {
                    width: 100%; background: #0a0a0f; color: #d4d4f0;
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 12px; padding: 12px 16px;
                    font-size: 15px; outline: none;
                    box-sizing: border-box; margin-bottom: 10px;
                    -webkit-appearance: none; font-family: inherit;
                }
                .todo-input:focus { border-color: rgba(99,102,241,0.4); }
                .todo-search-wrap { position: relative; margin-bottom: 16px; }
                .todo-search-icon {
                    position: absolute; left: 14px; top: 50%;
                    transform: translateY(-50%); font-size: 14px;
                    color: #3a3a5a; pointer-events: none;
                }
                .todo-search-input {
                    width: 100%; background: #13131a; color: #d4d4f0;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px; padding: 12px 40px;
                    font-size: 14px; outline: none;
                    box-sizing: border-box; font-family: inherit;
                    -webkit-appearance: none;
                }
                .todo-search-clear {
                    position: absolute; right: 12px; top: 50%;
                    transform: translateY(-50%); background: none;
                    border: none; color: #3a3a5a; cursor: pointer;
                    font-size: 14px; padding: 4px;
                }
                .todo-add-card {
                    background: #13131a;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 16px; margin-bottom: 16px;
                }
                .todo-add-grid { display: block; }
                .todo-priority-row { display: flex; gap: 8px; margin-bottom: 12px; }
                .todo-priority-btn {
                    flex: 1; padding: 10px 6px; border-radius: 10px;
                    font-size: 13px; font-weight: 500; cursor: pointer;
                    text-transform: capitalize; transition: all 0.15s;
                    font-family: inherit; -webkit-tap-highlight-color: transparent;
                }
                .todo-add-btn {
                    width: 100%; background: #4f46e5; color: #fff;
                    border: none; border-radius: 12px; padding: 13px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    font-family: inherit; transition: background 0.15s;
                    -webkit-tap-highlight-color: transparent;
                }
                .todo-add-btn:active { background: #4338ca; }
                .todo-filters { display: flex; gap: 8px; margin-bottom: 16px; }
                .todo-filter-btn {
                    flex: 1; padding: 9px; border-radius: 10px;
                    font-size: 13px; font-weight: 500; cursor: pointer;
                    text-transform: capitalize; transition: all 0.15s;
                    font-family: inherit; -webkit-tap-highlight-color: transparent;
                }
                .todo-task-card {
                    background: #13131a;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 14px; padding: 14px; margin-bottom: 8px;
                    transition: border-color 0.15s;
                }
                .todo-task-row { display: flex; align-items: flex-start; gap: 12px; }
                .todo-task-check {
                    width: 20px; height: 20px; border-radius: 6px;
                    cursor: pointer; flex-shrink: 0; margin-top: 2px;
                    display: flex; align-items: center; justify-content: center;
                    padding: 0; transition: all 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .todo-task-content { flex: 1; min-width: 0; }
                .todo-task-title { margin: 0 0 3px; font-size: 15px; font-weight: 500; }
                .todo-task-desc { margin: 0 0 6px; font-size: 13px; color: #3a3a5a; }
                .todo-task-badges { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
                .todo-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 99px; }
                .todo-task-actions { display: flex; gap: 2px; flex-shrink: 0; }
                .todo-action-btn {
                    background: none; border: none; color: #3a3a5a;
                    cursor: pointer; padding: 6px; border-radius: 8px;
                    font-size: 14px; -webkit-tap-highlight-color: transparent;
                }
                .todo-edit-actions { display: flex; gap: 8px; margin-top: 4px; }
                .todo-edit-save {
                    flex: 1; background: #4f46e5; color: #fff; border: none;
                    border-radius: 10px; padding: 10px; font-size: 13px;
                    font-weight: 600; cursor: pointer; font-family: inherit;
                }
                .todo-edit-cancel {
                    flex: 1; background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.06);
                    color: #6a6a8a; border-radius: 10px; padding: 10px;
                    font-size: 13px; cursor: pointer; font-family: inherit;
                }
                @media (min-width: 540px) {
                    .todo-inner { padding: 36px 32px 60px; }
                    .todo-add-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0 10px;
                    }
                    .todo-input-full { grid-column: 1 / -1; }
                }
                @media (max-width: 400px) {
                    .todo-priority-btn { padding: 9px 4px; font-size: 12px; }
                    .todo-task-title { font-size: 14px; }
                }
            `}</style>
 
            <div className="todo-page">
                <div className="todo-inner">
 
                    {/* Header */}
                    <div className="todo-header">
                        <div className="todo-header-left">
                            <p className="todo-welcome">Welcome back,</p>
                            <h1 className="todo-username">{username} 👋</h1>
                            <p className="todo-count">{doneCount} / {tasks.length} completed</p>
                        </div>
                        <button className="todo-logout" onClick={handleLogout}>Logout</button>
                    </div>
 
                    {/* Error */}
                    {error && (
                        <div style={{
                            fontSize: '12px', color: '#f87171',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.15)',
                            borderRadius: '10px', padding: '10px 14px',
                            marginBottom: '16px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <span>{error}</span>
                            <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}>✕</button>
                        </div>
                    )}
 
                    {/* Search */}
                    <div className="todo-search-wrap">
                        <span className="todo-search-icon">🔍</span>
                        <input className="todo-search-input" type="text"
                            placeholder="Search tasks..." value={search}
                            onChange={e => setSearch(e.target.value)} />
                        {search && <button className="todo-search-clear" onClick={() => setSearch('')}>✕</button>}
                    </div>
 
                    {/* Add task */}
                    <div className="todo-add-card">
                        <div className="todo-add-grid">
                            <input className="todo-input todo-input-full" type="text"
                                placeholder="Task title..." value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleCreate()} />
                            <input className="todo-input" type="text"
                                placeholder="Description (optional)" value={newDesc}
                                onChange={e => setNewDesc(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleCreate()} />
                            <input className="todo-input" type="date"
                                value={newDueDate} onChange={e => setNewDueDate(e.target.value)}
                                style={{ colorScheme: 'dark', marginBottom: '10px' }} />
                        </div>
 
                        {/* Priority */}
                        <div className="todo-priority-row">
                            {(['low', 'medium', 'high'] as const).map(p => {
                                const active = newPriority === p
                                const color = p === 'high' ? '#f87171' : p === 'low' ? '#4ade80' : '#fb923c'
                                const bgActive = p === 'high' ? 'rgba(248,113,113,0.15)' : p === 'low' ? 'rgba(74,222,128,0.15)' : 'rgba(251,146,60,0.15)'
                                return (
                                    <button key={p} type="button" className="todo-priority-btn"
                                        onClick={() => setNewPriority(p)}
                                        style={{
                                            background: active ? bgActive : '#0a0a0f',
                                            color: active ? color : '#3a3a5a',
                                            border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.06)',
                                        }}>
                                        {p === 'high' ? '🔴' : p === 'medium' ? '🟠' : '🟢'} {p}
                                    </button>
                                )
                            })}
                        </div>
 
                        <button className="todo-add-btn" onClick={handleCreate}
                            disabled={adding || !newTitle.trim()}
                            style={{ opacity: adding || !newTitle.trim() ? 0.4 : 1 }}>
                            {adding ? 'Adding...' : '+ Add task'}
                        </button>
                    </div>
 
                    {/* Filters */}
                    <div className="todo-filters">
                        {(['all', 'active', 'done'] as const).map(f => (
                            <button key={f} className="todo-filter-btn" onClick={() => setFilter(f)}
                                style={{
                                    background: filter === f ? '#4f46e5' : '#13131a',
                                    color: filter === f ? '#fff' : '#4a4a6a',
                                    border: filter === f ? '1px solid #4f46e5' : '1px solid rgba(255,255,255,0.06)',
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>
 
                    {/* Task list */}
                    {loading ? <Spinner /> : filtered.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#3a3a5a', fontSize: '14px', padding: '60px 0' }}>
                            {search ? `No tasks matching "${search}"` : filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
                        </p>
                    ) : (
                        <div>
                            {filtered.map(task => (
                                <div key={task.id} className="todo-task-card"
                                    style={{ borderColor: editId === task.id ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)' }}>
                                    {editId === task.id ? (
                                        <div>
                                            <input className="todo-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                                            <input className="todo-input" value={editDesc} onChange={e => setEditDesc(e.target.value)}
                                                placeholder="Description" style={{ marginBottom: '12px' }} />
                                            <div className="todo-edit-actions">
                                                <button className="todo-edit-save" onClick={() => handleSaveEdit(task.id)}>Save</button>
                                                <button className="todo-edit-cancel" onClick={() => setEditId(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="todo-task-row">
                                            <button className="todo-task-check" onClick={() => handleToggle(task.id)}
                                                style={{
                                                    border: task.is_completed ? 'none' : '1.5px solid #2a2a4a',
                                                    background: task.is_completed ? '#10b981' : 'transparent',
                                                }}>
                                                {task.is_completed && (
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </button>
                                            <div className="todo-task-content">
                                                <p className="todo-task-title" style={{
                                                    color: task.is_completed ? '#2a2a4a' : '#e8e8ff',
                                                    textDecoration: task.is_completed ? 'line-through' : 'none',
                                                }}>{task.title}</p>
                                                {task.description && <p className="todo-task-desc">{task.description}</p>}
                                                <div className="todo-task-badges">
                                                    <span className="todo-badge" style={{
                                                        background: task.priority === 'high' ? 'rgba(248,113,113,0.1)' : task.priority === 'low' ? 'rgba(74,222,128,0.1)' : 'rgba(251,146,60,0.1)',
                                                        color: task.priority === 'high' ? '#f87171' : task.priority === 'low' ? '#4ade80' : '#fb923c',
                                                        border: `1px solid ${task.priority === 'high' ? 'rgba(248,113,113,0.2)' : task.priority === 'low' ? 'rgba(74,222,128,0.2)' : 'rgba(251,146,60,0.2)'}`,
                                                    }}>
                                                        {task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟠'} {task.priority || 'medium'}
                                                    </span>
                                                    {task.due_date && (
                                                        <span className="todo-badge" style={{
                                                            fontWeight: 400,
                                                            background: new Date(task.due_date) < new Date() && !task.is_completed ? 'rgba(248,113,113,0.1)' : 'rgba(99,102,241,0.1)',
                                                            color: new Date(task.due_date) < new Date() && !task.is_completed ? '#f87171' : '#818cf8',
                                                            border: `1px solid ${new Date(task.due_date) < new Date() && !task.is_completed ? 'rgba(248,113,113,0.2)' : 'rgba(99,102,241,0.2)'}`,
                                                        }}>
                                                            📅 {new Date(task.due_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                            {new Date(task.due_date) < new Date() && !task.is_completed && ' · overdue'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="todo-task-actions">
                                                <button className="todo-action-btn" onClick={() => startEdit(task)}>✏️</button>
                                                <button className="todo-action-btn" onClick={() => askDelete(task)}>🗑️</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
 
            {deleteId && (
                <ConfirmModal
                    message={`"${deleteTitle}" will be permanently deleted.`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </>
    )
}
