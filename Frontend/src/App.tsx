import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import TodoPage from './pages/TodoPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default route → go to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App