const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

function getKey(apiKey) {
  const key = apiKey || import.meta.env.VITE_GROQ_API_KEY || ''
  if (!key) throw new Error('No API key found. Add VITE_GROQ_API_KEY to your .env file.')
  return key
}

async function callGroq(apiKey, systemPrompt, userMessage) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getKey(apiKey)}`
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Request failed: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

export async function askClaude({ question, language, subject, ncertContext = null, apiKey }) {
  const ncertNote = ncertContext
    ? `The student is asking about: ${ncertContext.class} ${subject} — Chapter: "${ncertContext.chapter}". Align your explanation to the NCERT syllabus for this chapter.`
    : ''

  const system = `You are a warm, encouraging tutor helping Indian students (Classes 9–12) understand ${subject}.
Always respond in ${language}. If the language is not English, start with a short English heading so the student knows the topic.
Use simple analogies and everyday Indian examples (cricket, chai, auto-rickshaws, festivals, etc.) to explain concepts.
Structure: 1) Concept explanation, 2) Easy example, 3) One quick quiz question at the end.
Keep responses under 220 words. Be friendly and motivating.
${ncertNote}`

  return await callGroq(apiKey, system, question)
}

export async function generateQuiz({ topic, subject, language, difficulty, apiKey }) {
  const system = `You are a quiz generator for Indian students. Generate a quiz in ${language}.
Topic: ${topic}, Subject: ${subject}, Difficulty: ${difficulty}.
Return ONLY valid JSON (no markdown, no backticks, no explanation) in this exact format:
{
  "questions": [
    {
      "question": "question text",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 0,
      "explanation": "brief explanation"
    }
  ]
}
Generate exactly 5 multiple choice questions. The "correct" field is the 0-based index of the correct option.`

  const text = await callGroq(apiKey, system, `Generate a ${difficulty} quiz on "${topic}" for ${subject}.`)
  const clean = text.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(clean)
  } catch {
    const match = clean.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error('Invalid quiz response. Please try again.')
  }
}

export async function generateParentSummary({ sessions, childName, apiKey }) {
  const sessionText = sessions.map(s =>
    `- ${s.date}: Asked about "${s.topic}" in ${s.subject} (${s.language})`
  ).join('\n')

  const system = `You are a friendly academic advisor. Write a short, encouraging parent progress report (150 words max) summarizing the student's study activity, strengths, and gentle suggestions for improvement. Be warm and positive.`

  return await callGroq(apiKey, system, `Generate a parent progress report for ${childName || 'the student'} based on these study sessions:\n${sessionText}`)
}
