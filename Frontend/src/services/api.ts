const BASE_URL = 'http://localhost:3000'

// helper — reads token from localStorage and puts it in the header
function authHeaders() {
    const token = localStorage.getItem('token')
    return{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

// ─── AUTH ─────────────────────────────────────
export async function registerApi(username: string, password: string, email: string) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    })
    return res.json()
}

export async function loginApi(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    return res.json()
}

// ─── TASKs ─────────────────────────────────────
export async function getTasksApi() {
    const res = await fetch(`${BASE_URL}/tasks`, {
        headers: authHeaders()
    })
    return res.json()
}

export async function createTaskApi(title: string, description: string, due_date?: string, priority?: string) {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ title, description, due_date, priority })
    })
    return res.json()
}

export async function updateTaskApi(id: number, data: { title?: string, description?: string, is_completed?: boolean }) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })
    return res.json()
}

export async function toggleTaskApi(id: number) {
    const res = await fetch(`${BASE_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: authHeaders()
    })
    return res.json()
}

export async function deleteTaskApi(id: number) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
    return res.json()
}