import React, { useState } from 'react'
import { Brain, CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react'
import { LANGUAGES, SUBJECTS, CLASSES, NCERT_CHAPTERS } from '../utils/ncertData'
import { generateQuiz } from '../utils/claudeApi'

export default function QuizPage({ apiKey, addSession }) {
  const [lang, setLang] = useState('English')
  const [subject, setSubject] = useState('Physics')
  const [cls, setCls] = useState('Class 11')
  const [chapter, setChapter] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const chapters = NCERT_CHAPTERS[subject]?.[cls] || []

  const generateNew = async () => {
    if (!apiKey) { alert('Please add your API key in Settings.'); return }
    setLoading(true)
    setQuiz(null)
    setAnswers({})
    setSubmitted(false)
    const topic = chapter || subject
    try {
      const data = await generateQuiz({ topic, subject, language: lang, difficulty, apiKey })
      setQuiz(data)
      addSession({ date: new Date().toLocaleDateString('en-IN'), topic: `Quiz: ${topic}`, subject, language: lang, timestamp: Date.now() })
    } catch (e) {
      alert('Could not generate quiz: ' + e.message)
    }
    setLoading(false)
  }

  const score = quiz ? quiz.questions.filter((q, i) => answers[i] === q.correct).length : 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Brain className="text-purple-400" size={20} />
        <h2 className="text-lg font-semibold text-purple-100">AI Quiz Generator</h2>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Language</label>
          <select value={lang} onChange={e => setLang(e.target.value)}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            {LANGUAGES.map(l => <option key={l.code} value={l.label}>{l.label}</option>)}
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
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Difficulty</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {chapters.length > 0 && (
        <div>
          <label className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Chapter (optional)</label>
          <select value={chapter} onChange={e => setChapter(e.target.value)}
            className="w-full bg-purple-950/40 border border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-100 outline-none focus:border-purple-500">
            <option value="">Entire {subject}</option>
            {chapters.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      )}

      <button onClick={generateNew} disabled={loading}
        className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors">
        {loading ? <><RefreshCw size={16} className="animate-spin" /> Generating Quiz...</> : <><Brain size={16} /> Generate Quiz</>}
      </button>

      {/* Quiz */}
      {quiz && (
        <div className="flex flex-col gap-4">
          {submitted && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-900/40 border border-purple-700/50">
              <Trophy size={24} className={score >= 4 ? 'text-yellow-400' : score >= 3 ? 'text-purple-400' : 'text-red-400'} />
              <div>
                <p className="font-semibold text-purple-100">Score: {score} / {quiz.questions.length}</p>
                <p className="text-sm text-purple-400">{score === 5 ? '🎉 Perfect! Outstanding!' : score >= 3 ? '👍 Good job! Keep it up!' : '📚 Review the topics and try again!'}</p>
              </div>
            </div>
          )}

          {quiz.questions.map((q, qi) => (
            <div key={qi} className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
              <p className="text-sm font-medium text-purple-100 mb-3 font-vernacular">{qi + 1}. {q.question}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  let cls = 'border-purple-800/40 text-purple-300 hover:bg-purple-900/30 hover:border-purple-600'
                  if (submitted) {
                    if (oi === q.correct) cls = 'border-green-600 bg-green-900/30 text-green-300'
                    else if (answers[qi] === oi) cls = 'border-red-600 bg-red-900/30 text-red-300'
                    else cls = 'border-purple-900/30 text-purple-600'
                  } else if (answers[qi] === oi) {
                    cls = 'border-purple-500 bg-purple-800/40 text-purple-100'
                  }
                  return (
                    <button key={oi} disabled={submitted}
                      onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                      className={`text-left text-sm px-3.5 py-2.5 rounded-lg border transition-colors font-vernacular ${cls}`}>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div className="mt-3 flex items-start gap-2 text-xs text-purple-400 bg-purple-900/20 rounded-lg p-2.5">
                  {answers[qi] === q.correct
                    ? <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    : <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />}
                  <span className="font-vernacular">{q.explanation}</span>
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < quiz.questions.length}
              className="py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors">
              Submit Answers ({Object.keys(answers).length}/{quiz.questions.length} answered)
            </button>
          )}

          {submitted && (
            <button onClick={generateNew}
              className="py-2.5 border border-purple-700 text-purple-300 hover:bg-purple-900/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <RefreshCw size={15} /> Try Another Quiz
            </button>
          )}
        </div>
      )}
    </div>
  )
}
