import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { LayoutDashboard, Sparkles, BookOpen, Calendar, Languages } from 'lucide-react'
import { generateParentSummary } from '../utils/claudeApi'

const COLORS = ['#a78bfa', '#34d399', '#fb923c', '#60a5fa', '#f472b6', '#facc15']

export default function DashboardPage({ sessions, childName, apiKey }) {
  const [aiReport, setAiReport] = useState('')
  const [loadingReport, setLoadingReport] = useState(false)

  const stats = useMemo(() => {
    if (!sessions.length) return null
    const bySubject = {}
    const byLang = {}
    const byDay = {}
    sessions.forEach(s => {
      bySubject[s.subject] = (bySubject[s.subject] || 0) + 1
      byLang[s.language] = (byLang[s.language] || 0) + 1
      byDay[s.date] = (byDay[s.date] || 0) + 1
    })
    return {
      total: sessions.length,
      subjects: Object.entries(bySubject).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      languages: Object.entries(byLang).map(([name, value]) => ({ name, value })),
      recent: Object.entries(byDay).slice(-7).map(([date, count]) => ({ date, count })),
      streak: new Set(sessions.slice(0, 7).map(s => s.date)).size
    }
  }, [sessions])

  const getAiReport = async () => {
    if (!apiKey) { alert('Please add your API key in Settings.'); return }
    setLoadingReport(true)
    try {
      const report = await generateParentSummary({ sessions: sessions.slice(0, 30), childName, apiKey })
      setAiReport(report)
    } catch (e) {
      setAiReport('Could not generate report: ' + e.message)
    }
    setLoadingReport(false)
  }

  if (!sessions.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-purple-500">
        <LayoutDashboard size={48} className="opacity-30" />
        <p className="text-lg">No study sessions yet</p>
        <p className="text-sm text-purple-700">Start chatting or take a quiz to see your progress here!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-purple-400" size={20} />
          <h2 className="text-lg font-semibold text-purple-100">
            {childName ? `${childName}'s Dashboard` : 'Parent Dashboard'}
          </h2>
        </div>
        <button onClick={getAiReport} disabled={loadingReport}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-700/50 hover:bg-purple-700 disabled:opacity-50 text-purple-200 rounded-lg transition-colors">
          <Sparkles size={13} />
          {loadingReport ? 'Generating...' : 'AI Report'}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, label: 'Total Sessions', value: stats.total },
          { icon: Calendar, label: 'Day Streak', value: `${stats.streak} days` },
          { icon: Languages, label: 'Languages Used', value: stats.languages.length },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 text-center">
            <Icon size={16} className="text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-semibold text-purple-100">{value}</p>
            <p className="text-xs text-purple-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
          <p className="text-xs text-purple-400 uppercase tracking-wider mb-3">Sessions by Subject</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={stats.subjects}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#a78bfa' }} />
              <YAxis tick={{ fontSize: 10, fill: '#a78bfa' }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#1a1535', border: '1px solid #4c1d95', color: '#e9d5ff', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
          <p className="text-xs text-purple-400 uppercase tracking-wider mb-3">Language Distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={stats.languages} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                labelLine={false} fontSize={10}>
                {stats.languages.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1535', border: '1px solid #4c1d95', color: '#e9d5ff', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
        <p className="text-xs text-purple-400 uppercase tracking-wider mb-3">Recent Sessions</p>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {sessions.slice(0, 15).map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-purple-600 text-xs w-20 flex-shrink-0">{s.date}</span>
              <span className="text-purple-300 flex-1 truncate">{s.topic}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-400">{s.subject}</span>
              <span className="text-xs text-purple-600">{s.language}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Report */}
      {aiReport && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/60 to-indigo-950/60 border border-purple-700/40">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-purple-400" />
            <p className="text-xs text-purple-400 uppercase tracking-wider">AI Progress Report</p>
          </div>
          <p className="text-sm text-purple-200 leading-relaxed">{aiReport}</p>
        </div>
      )}
    </div>
  )
}
