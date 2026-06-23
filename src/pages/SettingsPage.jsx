import React, { useState } from 'react'
import { Settings, Key, User, Trash2, CheckCircle } from 'lucide-react'

export default function SettingsPage({ apiKey, saveApiKey, childName, saveChildName }) {
  const [key, setKey] = useState(apiKey)
  const [name, setName] = useState(childName)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveApiKey(key)
    saveChildName(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const clearData = () => {
    if (confirm('This will clear all your study session history. Are you sure?')) {
      localStorage.removeItem('sb_sessions')
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div className="flex items-center gap-2">
        <Settings className="text-purple-400" size={20} />
        <h2 className="text-lg font-semibold text-purple-100">Settings</h2>
      </div>

      {/* API Key */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Key size={15} className="text-purple-400" />
          <p className="text-sm font-medium text-purple-200">Groq API Key (Free)</p>
        </div>
        <input type="password" value={key} onChange={e => setKey(e.target.value)}
          placeholder="gsk_..."
          className="w-full bg-purple-950/60 border border-purple-800/50 rounded-lg px-3 py-2.5 text-sm text-purple-100 placeholder-purple-700 outline-none focus:border-purple-500 font-mono" />
        <p className="text-xs text-purple-600">
          Get your FREE API key from{' '}
          <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-purple-400 underline">console.groq.com</a>.
          No credit card required. Your key is stored locally on your device only.
        </p>
      </div>

      {/* Child name */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <User size={15} className="text-purple-400" />
          <p className="text-sm font-medium text-purple-200">Student Name</p>
        </div>
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="Enter student's name..."
          className="w-full bg-purple-950/60 border border-purple-800/50 rounded-lg px-3 py-2.5 text-sm text-purple-100 placeholder-purple-700 outline-none focus:border-purple-500" />
        <p className="text-xs text-purple-600">Used to personalize the parent dashboard and AI progress reports.</p>
      </div>

      <button onClick={handleSave}
        className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors">
        {saved ? <><CheckCircle size={16} /> Saved!</> : 'Save Settings'}
      </button>

      {/* How to get Groq key */}
      <div className="p-4 rounded-xl bg-green-950/20 border border-green-800/30 flex flex-col gap-2">
        <p className="text-xs text-green-400 uppercase tracking-wider font-medium">How to get your FREE Groq API Key</p>
        <div className="text-xs text-green-700 space-y-1.5">
          <p>1. Go to <span className="text-green-400">console.groq.com</span></p>
          <p>2. Sign up with Google or email — no card needed</p>
          <p>3. Click <span className="text-green-400">API Keys</span> in the left sidebar</p>
          <p>4. Click <span className="text-green-400">Create API Key</span></p>
          <p>5. Copy the key (starts with <span className="text-green-400">gsk_</span>) and paste above</p>
        </div>
      </div>

      {/* Danger zone */}
      <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 flex flex-col gap-3">
        <p className="text-sm font-medium text-red-400">Danger Zone</p>
        <p className="text-xs text-red-700">Permanently delete all session history from this device.</p>
        <button onClick={clearData}
          className="flex items-center gap-2 text-sm px-3 py-2 border border-red-700/50 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors w-fit">
          <Trash2 size={14} /> Clear All Session Data
        </button>
      </div>

      {/* Deploy info */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/20">
        <p className="text-xs text-purple-400 uppercase tracking-wider mb-2">Deploy This Project</p>
        <div className="text-xs text-purple-500 space-y-1.5">
          <p>1. <span className="text-purple-300">npm install</span> — install dependencies</p>
          <p>2. <span className="text-purple-300">npm run dev</span> — run locally</p>
          <p>3. <span className="text-purple-300">npm run build</span> — build for production</p>
          <p>4. Deploy <span className="text-purple-300">dist/</span> to Vercel or Netlify for free</p>
        </div>
      </div>
    </div>
  )
}
