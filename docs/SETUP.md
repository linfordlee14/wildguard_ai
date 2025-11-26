# WildGuard AI Setup Guide

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API keys:
# GROQ_API_KEY=gsk_your-groq-key-here
# OPENAI_API_KEY=sk_your-openai-key-here (optional)
```

### 3. Test Groq Integration
```bash
cd backend
python test_agents.py
```

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## API Endpoints

- `GET /api/health` - Backend health check
- `GET /api/agents/status` - Agent system status
- `POST /api/agents/analyze` - Multi-agent analysis
- `POST /api/orchestrate` - Full pipeline with agents

## Features

- 🤖 **Multi-Agent System**: 5 specialized AI agents using Groq
- 📊 **Real-time Dashboard**: React with analytics
- 🗺️ **Interactive Maps**: Wildlife tracking with Leaflet
- 🚨 **Alert System**: Movement anomaly detection
- 📈 **Risk Scoring**: AI-powered threat assessment

## Agent System

The system uses 5 specialized agents:
1. **Planner Agent** - Strategic deployment planning
2. **Movement Analyst** - Animal behavior analysis  
3. **Vision Analyst** - Camera trap forensics
4. **Risk Scorer** - Threat level validation
5. **Report Generator** - Professional briefings

## Next Steps

- Configure camera feeds in `data/`
- Customize agent prompts in `agents/prompts.json`
- Add video processing scripts in `scripts/`
