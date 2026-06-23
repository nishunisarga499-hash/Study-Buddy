import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Send, BookOpen, ChevronDown } from 'lucide-react'
import { LANGUAGES, SUBJECTS, CLASSES, NCERT_CHAPTERS } from '../utils/ncertData'
import { askClaude } from '../utils/claudeApi'

const QUICK_TOPICS = [
  "Explain Newton's first law", "What is photosynthesis?",
  "Explain Pythagoras theorem", "What is the French Revolution?",
  "Explain recursion in programming", "What is osmosis?",
  "Explain ohm's law", "What are prime numbers?"
]

export default function ChatPage({ apiKey, addSession }) {
  const [lang, setLang] = useState('English')
  const [subject, setSubject] = useState('Physics')
  const [cls, setCls] = useState('Class 11')
  const [chapter, setChapter] = useState('')
  const [useNcert, setUseNcert] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! 👋 I\'m your personal Study Buddy. Pick your language, subject, and optionally a NCERT chapter above, then ask me anything! You can also tap the 🎤 mic to speak your question.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const chatRef = useRef(null)
  const recognitionRef = useRef(null)

  const chapters = useNcert && NCERT_CHAPTERS[subject]?.[cls] || []

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  const speak = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const clean = text.replace(/[#*_`]/g, '').slice(0, 500)
    const utt = new SpeechSynthesisUtterance(clean)
    const langMap = { Hindi: 'hi-IN', Kannada: 'kn-IN', Tamil: 'ta-IN', Telugu: 'te-IN', Bengali: 'bn-IN', Marathi: 'mr-IN', English: 'en-IN' }
    utt.lang = langMap[lang] || 'en-IN'
    utt.rate = 0.9
    window.speechSynthesis.speak(utt)
  }

  const startRecording = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Speech recognition not supported in this browser. Try Chrome.'); return }
    const r = new SR()
    const langMap = { Hindi: 'hi-IN', Kannada: 'kn-IN', Tamil: 'ta-IN', Telugu: 'te-IN', Bengali: 'bn-IN', Marathi: 'mr-IN', English: 'en-IN' }
    r.lang = langMap[lang] || 'en-IN'
    r.interimResults = false
    r.onresult = (e) => { setInput(e.results[0][0].transcript); setIsRecording(false) }
    r.onerror = () => setIsRecording(false)
    r.onend = () => setIsRecording(false)
    recognitionRef.current = r
    r.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }

  const sendMessage = async (q) => {
    const question = q || input.trim()
    if (!question) return
    if (!apiKey) { alert('Please add your Anthropic API key in Settings first.'); return }

    setMessages(m => [...m, { role: 'user', text: question }])
    setInput('')
    setLoading(true)

    const ncertContext = useNcert && chapter ? { class: cls, chapter } : null

    try {
      const reply = await askClaude({ question, language: lang, subject, ncertContext, apiKey })
      setMessages(m => [...m, { role: 'bot', text: reply }])
      speak(reply)
      addSession({
        date: new Date().toLocaleDateString('en-IN'),
        topic: question.slice(0, 60),
        subject,
        language: lang,
        chapter: chapter || null,
        timestamp: Date.now()
      })
    } catch (e) {
      setMessages(m => [...m, { role: 'bot', text: `Error: ${e.message}. Please check your API key in Settings.` }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Language</label>
          <select value={lang} onChange={e => setLang(e.target.value)}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            {LANGUAGES.map(l => <option key={l.code} value={l.label}>{l.native} ({l.label})</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Subject</label>
          <select value={subject} onChange={e => { setSubject(e.target.value); setChapter('') }}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Class</label>
          <select value={cls} onChange={e => { setCls(e.target.value); setChapter('') }}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* NCERT Toggle */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-950/30 border border-purple-800/30">
        <button onClick={() => setUseNcert(v => !v)}
          className={`relative w-10 h-5 rounded-full transition-colors ${useNcert ? 'bg-purple-500' : 'bg-purple-900'}`}>
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${useNcert ? 'translate-x-5' : ''}`} />
        </button>
        <span className="text-sm text-purple-300 flex items-center gap-1.5">
          <BookOpen size={14} /> NCERT Chapter Alignment
        </span>
        {useNcert && chapters.length > 0 && (
          <select value={chapter} onChange={e => setChapter(e.target.value)}
            className="ml-auto bg-purple-950/60 border border-purple-700/50 rounded-lg px-2 py-1 text-xs text-purple-200 outline-none max-w-[200px]">
            <option value="">Select chapter...</option>
            {chapters.map(c => <option key={c}>{c}</option>)}
          </select>
        )}
      </div>

      {/* Quick topics */}
      <div className="flex flex-wrap gap-2">
        {QUICK_TOPICS.map(t => (
          <button key={t} onClick={() => sendMessage(t)}
            className="text-xs px-3 py-1.5 rounded-full border border-purple-800/50 text-purple-400 hover:bg-purple-900/40 hover:text-purple-200 transition-colors">
            {t}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div ref={chatRef} className="bg-purple-950/20 border border-purple-800/30 rounded-xl p-4 h-80 overflow-y-auto flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${m.role === 'bot' ? 'bg-purple-700' : 'bg-teal-700'}`}>
              {m.role === 'bot' ? '🎓' : 'You'}
            </div>
            <div className={`max-w-[82%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed font-vernacular ${
              m.role === 'bot'
                ? 'bg-[#1a1535] border border-purple-800/30 text-purple-100'
                : 'bg-purple-700/60 text-white'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs">🎓</div>
            <div className="bg-[#1a1535] border border-purple-800/30 rounded-xl px-4 py-3 flex gap-1.5">
              <div className="typing-dot w-2 h-2 rounded-full bg-purple-400" />
              <div className="typing-dot w-2 h-2 rounded-full bg-purple-400" />
              <div className="typing-dot w-2 h-2 rounded-full bg-purple-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <button onClick={ttsEnabled ? () => setTtsEnabled(false) : () => setTtsEnabled(true)}
          title={ttsEnabled ? 'Mute voice' : 'Unmute voice'}
          className="p-2.5 rounded-lg border border-purple-800/50 text-purple-400 hover:text-purple-200 hover:bg-purple-900/30 transition-colors">
          {ttsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <div className="relative flex-1">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything, or use 🎤 to speak..."
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-4 py-2.5 text-sm text-purple-100 placeholder-purple-700 outline-none focus:border-purple-500 pr-10" />
        </div>
        <button onClick={isRecording ? stopRecording : startRecording}
          className={`relative p-2.5 rounded-lg border transition-colors ${isRecording ? 'border-red-500 bg-red-900/30 text-red-400 pulse-ring' : 'border-purple-800/50 text-purple-400 hover:bg-purple-900/30 hover:text-purple-200'}`}>
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
          <Send size={15} /> Send
        </button>
      </div>
    </div>
  )
}
