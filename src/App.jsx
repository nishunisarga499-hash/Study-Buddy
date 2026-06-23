import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, MessageCircle, LayoutDashboard, Brain, Settings } from 'lucide-react'
import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import QuizPage from './pages/QuizPage'
import SettingsPage from './pages/SettingsPage'

const NAV = [
  { to: '/', icon: MessageCircle, label: 'Study Chat' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('sb_apikey') || '')
  const [sessions, setSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sb_sessions') || '[]') } catch { return [] }
  })
  const [childName, setChildName] = useState(() => localStorage.getItem('sb_childname') || '')

  const addSession = (session) => {
    const updated = [session, ...sessions].slice(0, 200)
    setSessions(updated)
    localStorage.setItem('sb_sessions', JSON.stringify(updated))
  }

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('sb_apikey', key)
  }

  const saveChildName = (name) => {
    setChildName(name)
    localStorage.setItem('sb_childname', name)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-purple-900/40 bg-[#0f0c1a]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">🎓</div>
          <span className="font-semibold text-purple-100">Study Buddy</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300">AI Powered</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<ChatPage apiKey={apiKey} addSession={addSession} />} />
          <Route path="/quiz" element={<QuizPage apiKey={apiKey} addSession={addSession} />} />
          <Route path="/dashboard" element={<DashboardPage sessions={sessions} childName={childName} apiKey={apiKey} />} />
          <Route path="/settings" element={<SettingsPage apiKey={apiKey} saveApiKey={saveApiKey} childName={childName} saveChildName={saveChildName} />} />
        </Routes>
      </main>

      {/* Bottom Nav */}
      <nav className="border-t border-purple-900/40 bg-[#0f0c1a]/95 backdrop-blur sticky bottom-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${isActive ? 'text-purple-400' : 'text-purple-700 hover:text-purple-500'}`
              }>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
