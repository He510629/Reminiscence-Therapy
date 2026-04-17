import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MuseumPage from './pages/MuseumPage'
import ContentDetailPage from './pages/ContentDetailPage'
import GamePage from './pages/GamePage'
import GamePlayPage from './pages/GamePlayPage'
import CompanionPage from './pages/CompanionPage'
import ReportPage from './pages/ReportPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/museum', label: '策展馆', icon: '🏛️' },
    { path: '/game', label: '健脑营', icon: '🎮' },
    { path: '/companion', label: '陪伴官', icon: '💬' },
    { path: '/report', label: '报告', icon: '📊' },
  ]

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 onClick={() => navigate('/museum')} style={{ cursor: 'pointer' }}>
          🏛️ 认知陪伴
        </h1>
        <div className="user-info">
          <span>{user?.name || '用户'}</span>
          <button
            onClick={logout}
            style={{
              color: '#fff',
              fontSize: '22px',
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '999px',
              minHeight: '40px',
              minWidth: 'auto',
            }}
          >
            退出
          </button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/museum" element={<MuseumPage />} />
          <Route path="/museum/:id" element={<ContentDetailPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/play/:code" element={<GamePlayPage />} />
          <Route path="/companion" element={<CompanionPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/" element={<Navigate to="/museum" replace />} />
        </Routes>
      </main>

      <nav className="app-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function AuthLayout() {
  const { isLoggedIn } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (isLoggedIn) return <Navigate to="/museum" replace />

  if (showRegister) {
    return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
  }
  return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<AuthLayout />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
