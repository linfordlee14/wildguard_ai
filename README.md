# 🦏 WildGuard AI - Groq-Powered Wildlife Conservation Platform

An autonomous, multi-agent AI system that protects endangered species like the Black Rhino from poaching through real-time threat detection and intelligent data analysis.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AWS Vibe Hackathon 2025](https://img.shields.io/badge/AWS%20Vibe-Hackathon%202025-orange)](https://www.buildonaws.com/)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React 18+](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)

## 🌍 Mission

Protect endangered species using autonomous multi-agent AI systems. WildGuard AI detects poaching threats in real-time, analyzes wildlife data, and guides ranger response to save Black Rhinos and other endangered animals.

**Currently monitoring**: Black Rhino populations  
**Scalable to**: All endangered species (elephants, tigers, cheetahs, etc.)  
**Built in**: 5 days with Kiro + Amazon Q Developer  
---
**Built for:** AWS Global Vibe: AI Coding Hackathon (DoraHacks)  
**Status:** Production-Ready & Deployed  
**Live Demo:** https://wildguard-ai.vercel.app  
**GitHub:** https://github.com/linfordlee14/wildguard-ai

---



## 🚀 Quick Links

- **Live Frontend:** https://wildguard-ai.vercel.app
- **Backend API:** https://wildguard-ai-backend.up.railway.app
- **Demo Video:** [[https://youtu.be/WA7sPtTsx2c]]
- **Developer:** Linford Musiyambodza (@hacker1401)

---

## 🎯 What Problem Does It Solve?

Black Rhino populations have declined by **97.6% since 1960**, with one rhino poached every 26 hours. Wildlife rangers need:
- ✅ Real-time threat detection (not hours later)
- ✅ Actionable intelligence for field response
- ✅ Data-driven decision making
- ✅ Autonomous monitoring 24/7

**WildGuard AI solves this with Groq-powered AI agents.**

---

## ✨ Key Features

### 🤖 5 Autonomous AI Agents (Powered by Groq llama3-8b-8192)

1. **Planner Agent** - Strategic threat assessment and ranger response prioritization
2. **Movement Analyst** - Detects abnormal wildlife behavior and predicts danger zones
3. **Vision Analyst** - Analyzes camera images for poachers, snares, and predators
4. **Risk Scorer** - Calculates threat level (0-100) with confidence scores
5. **Report Generator** - Creates automated ranger briefings with actionable steps

### 📊 Dashboard Components

- **Animated Metrics** - Real-time statistics with smooth transitions
- **Threat Gauge** - Visual risk indicator (LOW/MEDIUM/HIGH)
- **Recent Alerts** - Live alert feed with timestamps
- **Agent Status** - Shows which agents are active and processing

### 🗺️ Live Map

- Interactive Leaflet map showing animal locations
- Hotspot zone highlighting for known poaching areas
- Click markers for detailed animal information
- Movement path visualization

### 📈 Advanced Analytics

- 7-day activity trend charts
- Hourly detection patterns
- Risk heatmaps by location and time
- Species distribution breakdown
- Threat timeline with confidence levels

### ⚙️ Settings & Configuration

- Backend mode toggle (Groq AI / Simulated / Offline)
- API base URL configuration for deployment flexibility
- Live data toggle for testing
- Theme switching (dark/light mode)
- Notification settings

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast builds
- **TailwindCSS v4** for styling
- **Framer Motion** for smooth animations
- **Zustand** for state management with localStorage persistence
- **SWR** for intelligent data fetching with caching
- **Recharts** for beautiful data visualizations
- **Leaflet + React-Leaflet** for interactive mapping
- **Shadcn/ui** for accessible components

### Backend
- **Python 3.11+** with Flask web framework
- **Groq API** (llama3-8b-8192 model) for autonomous agents
- **OpenAI SDK** (compatible with Groq)
- **NumPy** for data processing
- **Flask-CORS** for cross-origin requests
- RESTful API architecture

### Deployment
- **Frontend:** Vercel (global CDN, serverless)
- **Backend:** Railway (Python-optimized, no 10s timeout)
- **Version Control:** GitHub

### Development Tools
- **Kiro IDE** - AI-powered code generation and scaffolding
- **Amazon Q Developer** - In-editor AI assistance for debugging and optimization
- **VS Code** with extensions

---

## 📦 Project Structure

```
wildguard-ai/
├── frontend/                    # React + TypeScript UI
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   ├── maps/          # Leaflet map integration
│   │   │   ├── analytics/     # Chart visualizations
│   │   │   ├── agents/        # Agent monitoring
│   │   │   ├── settings/      # Settings page
│   │   │   ├── layout/        # Header, Sidebar
│   │   │   └── ui/            # Shadcn components
│   │   ├── hooks/             # Custom React hooks (useApi, useStore)
│   │   ├── store/             # Zustand state management
│   │   ├── lib/               # Utilities and constants
│   │   └── App.tsx            # Main component
│   ├── vite.config.js         # Vite configuration
│   └── package.json
│
├── backend/                     # Python + Flask API
│   ├── routes/                 # API endpoints
│   │   ├── movement.py        # Movement analysis
│   │   ├── vision.py          # Vision analysis
│   │   ├── scoring.py         # Risk scoring
│   │   ├── report.py          # Report generation
│   │   ├── orchestrate.py     # Multi-agent pipeline
│   │   └── agents.py          # Agent status endpoints
│   ├── utils/
│   │   ├── agents.py          # **Groq AI agent configuration**
│   │   └── simple_agents.py   # Fallback simulation agents
│   ├── app.py                 # Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile               # Railway deployment config
│   └── vercel.json            # (Legacy) Vercel config
│
├── data/                        # Sample datasets
│   ├── wildguard_simulated_tracks.json
│   └── hotspots.json
│
├── README.md                    # This file
├── PROJECT_SUMMARY.md           # Detailed project overview
├── FINAL_SUBMISSION.md          # DoraHacks submission guide
├── DEPLOYMENT.md                # Deployment instructions
├── .gitignore                   # Git ignore rules
└── .env.example                 # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (frontend)
- Python 3.11+ (backend)
- Groq API key (free from https://console.groq.com)
- Git

### Installation

**Clone the repository:**
```bash
git clone https://github.com/linfordlee14/wildguard-ai.git
cd wildguard-ai
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3001
```

**Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or: venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_groq_key_here" > .env

python app.py
# Runs at http://localhost:5000
```

### Environment Variables

**Backend (.env):**
```env
GROQ_API_KEY=gsk_your_groq_api_key
FLASK_ENV=development
PORT=5000
```

**Frontend (.env.local - optional):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🎬 API Endpoints

### Health & Data
- `GET /api/health` - Backend health check
- `GET /api/data` - Wildlife tracking data
- `GET /api/hotspots` - Poaching hotspot zones

### Groq AI Analysis (llama3-8b-8192)
- `POST /api/movement` - Movement anomaly detection
- `POST /api/vision` - Image threat analysis
- `POST /api/score` - Risk score calculation (0-100)
- `POST /api/report` - Generate ranger briefing

### Agent Management
- `GET /api/agents/status` - Groq agent system status
- `POST /api/agents/analyze` - Multi-agent analysis
- `POST /api/orchestrate` - Full AI pipeline orchestration

---

## 🌐 Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npm i -g vercel
vercel --prod
```

### Deploy Backend to Railway
```bash
cd backend
npm i -g @railway/cli
railway login
railway init
railway variables set GROQ_API_KEY=gsk_your_key
railway up --detach
```

### Update Frontend Backend URL
In `frontend/src/store/useStore.ts`, update the `apiBaseUrl`:
```typescript
apiBaseUrl: 'https://your-railway-backend-url/api'
```

Then redeploy frontend.

---

## 🤖 How Groq AI Powers WildGuard AI

**Why Groq?**
- ⚡ **Ultra-fast inference** (40+ tokens/second) = real-time alerts
- 💰 **Cost-effective** ($0.05 per 1M input tokens) = affordable for nonprofits
- 🔓 **Open-source models** (llama3-8b-8192) = no vendor lock-in
- 🎯 **Reasoning optimized** = accurate threat assessment
- 🔌 **OpenAI-compatible API** = easy integration

**Agent Workflow:**
1. Wildlife data enters the system
2. **Planner Agent** strategizes response priority
3. **Movement Analyst** detects behavioral anomalies
4. **Vision Analyst** analyzes any camera footage
5. **Risk Scorer** calculates threat level
6. **Report Generator** creates ranger briefing
7. Rangers receive actionable intelligence in real-time

---

## 📊 Performance Metrics

- **Frontend Load Time:** < 2 seconds (Vercel CDN)
- **API Response Time:** < 500ms (Groq inference + Flask processing)
- **Agent Processing:** 5-15 seconds per full analysis cycle
- **Data Refresh Rate:** Real-time (SWR caching)

---

## 🔐 Security

- ✅ API keys stored in `.env` (never in code)
- ✅ CORS configured for production domains
- ✅ Input validation on all endpoints
- ✅ `.gitignore` prevents accidental key commits
- ✅ No sensitive data in frontend localStorage
- ✅ Secure state persistence

---

## 📈 Future Enhancements

### Short-term
- [ ] User authentication for rangers
- [ ] Email/SMS alert notifications
- [ ] Real camera integration
- [ ] Ranger mobile app (React Native)

### Long-term
- [ ] Custom ML model fine-tuning
- [ ] Drone surveillance integration
- [ ] Multi-park management system
- [ ] Advanced predictive modeling
- [ ] International deployment

---

## 🙏 Credits & Dedication

**Built by:** Linford Musiyambodza  
**Company:** Linfy Tech Solutions  
**Location:** Cape Town, South Africa  
**Mission:** Using AI & tech to protect endangered species

**Special Thanks:**
- Mr. Segun Lawal - My ML mentor (this project is dedicated to you)
- Ntsane Kutlwano Dikotsi (SIZA) - Introduced me to Groq AI
- David Ndungu - Backend engineering guidance
- William - Frontend & design mentorship
- Muham Harris - For pushing me to do hard things

**Tools & Platforms:**
- Kiro IDE - AI code generation
- Amazon Q Developer - AI-powered debugging
- Groq API - Multi-agent AI orchestration
- Vercel - Frontend deployment
- Railway - Backend deployment

---

## 📄 License

Open source for wildlife conservation. Use, modify, and deploy freely.

---

## 🤝 Contributing

If you're passionate about wildlife conservation and AI:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share this project with conservation organizations
- Connect with me on [LinkedIn](https://linkedin.com/in/linfordlee14)

---

## 💬 Get in Touch

- **GitHub:** @linfordlee14
- **LinkedIn:** linkedin.com/in/linfordlee14
- **Email:** linfordmusiyambodza@gmail.com
- **DoraHacks:** hacker1401

---

## 🦏 Mission Statement

Every line of code in WildGuard AI is written with one goal: **to protect endangered species like the Black Rhino from extinction.**

If we can deploy this to 5,000 wildlife reserves globally, we could save **100-150 endangered animals annually** by reducing threat response time from hours to minutes.

**That's the vision. Let's make it reality.** 🌍✨

---

*Built with ❤️ for wildlife conservation*  
*Deployed on Vercel + Railway*  
*Powered by Groq AI*  
*November 2025*

