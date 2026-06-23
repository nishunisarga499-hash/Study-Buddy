#  Vernacular AI Study Buddy

An AI-powered study assistant for Indian students (Class 9–12) that explains concepts in 7 regional languages with voice input/output, NCERT chapter alignment, interactive quizzes, and a parent dashboard.

##  Features

| Feature | Description |
|---|---|
|  **7 Indian Languages** | English, Hindi, Kannada, Tamil, Telugu, Bengali, Marathi |
|  **Voice Input** | Speak your question using the Web Speech API |
|  **Voice Output (TTS)** | Hear explanations read aloud in your language |
|  **NCERT Alignment** | Choose Class 9–12 chapters across 5 subjects |
|  **AI Quiz Generator** | Auto-generates 5 MCQs on any topic or chapter |
| **Parent Dashboard** | Charts showing study habits + AI-generated progress report |
|  **Local Storage** | All data stays on your device, nothing sent to external servers |

##  Quick Start

### Prerequisites
- Node.js 18+ installed
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

Then go to **Settings** and enter your Anthropic API key.

### Build for Production

```bash
npm run build
# Deploy the dist/ folder to Vercel / Netlify / GitHub Pages
```

##  Project Structure

```
vernacular-study-buddy/
├── src/
│   ├── pages/
│   │   ├── ChatPage.jsx        # Main chat with voice I/O + NCERT
│   │   ├── QuizPage.jsx        # AI quiz generator
│   │   ├── DashboardPage.jsx   # Parent dashboard + charts
│   │   └── SettingsPage.jsx    # API key + student name
│   ├── utils/
│   │   ├── claudeApi.js        # All Claude API calls
│   │   └── ncertData.js        # NCERT chapters + language data
│   ├── App.jsx                 # Routing + layout
│   └── index.css               # Global styles + fonts
├── public/
│   └── index.html
├── package.json
└── vite.config.js
```

##  Tech Stack

- **React 18** + Vite (fast development)
- **Tailwind CSS** (styling)
- **Claude Sonnet 4.6** (AI explanations, quiz generation, reports)
- **Web Speech API** (voice input — built into Chrome/Edge)
- **SpeechSynthesis API** (text-to-speech — built into browsers)
- **Recharts** (dashboard charts)
- **React Router** (multi-page navigation)

##  Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Chat + Quiz | ✅ | ✅ | ✅ | ✅ |
| Voice Input (STT) | ✅ | ❌ | ⚠️ | ✅ |
| Voice Output (TTS) | ✅ | ✅ | ✅ | ✅ |

> Voice input works best in Chrome. Firefox does not support the Web Speech API.

##  Future Enhancements

- [ ] WhatsApp bot integration for farmer/rural student access
- [ ] Offline mode with cached explanations
- [ ] Teacher portal with class-wide analytics
- [ ] Image upload for solving handwritten problems
- [ ] JEE/NEET exam-specific modes
- [ ] Weekly email reports to parents


*This project demonstrates: React, LLM API integration, Web Speech API, multi-language NLP, data visualization, and full-stack product thinking.*
