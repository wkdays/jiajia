import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './pages/Login'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Materials from './pages/Materials'
import HealthProblems from './pages/HealthProblems'
import Formulas from './pages/Formulas'
import Laws from './pages/Laws'
import Books from './pages/Books'
import Search from './pages/Search'
import AdminPanel from './pages/Admin'

function App() {
  const { token } = useAuth()

  if (!token) {
    return <LoginPage />
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/health" element={<HealthProblems />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/laws" element={<Laws />} />
        <Route path="/books" element={<Books />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
