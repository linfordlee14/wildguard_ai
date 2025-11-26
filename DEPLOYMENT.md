# 🚀 WildGuard AI Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Groq API key
- Git repository

## 📦 Backend Deployment (Vercel)

### Step 1: Prepare Backend
```bash
cd backend
# Ensure requirements.txt is up to date
pip freeze > requirements.txt
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel

# Follow prompts:
# - Set project name: wildguard-ai-backend
# - Link to existing project or create new
```

### Step 3: Set Environment Variables
In Vercel Dashboard:
1. Go to your backend project
2. Settings → Environment Variables
3. Add:
   - `GROQ_API_KEY` = your_groq_api_key
   - `FLASK_ENV` = production
   - `PORT` = 5000

### Step 4: Get Backend URL
After deployment, copy your backend URL:
```
https://wildguard-ai-backend.vercel.app
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update API Base URL
In `frontend/src/store/useStore.ts`, update the default:
```typescript
apiBaseUrl: 'https://your-backend-url.vercel.app',
```

### Step 2: Build Test
```bash
cd frontend
npm run build
# Ensure no errors
```

### Step 3: Deploy to Vercel
```bash
cd frontend
vercel

# Follow prompts:
# - Set project name: wildguard-ai
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

### Step 4: Configure Environment
In Vercel Dashboard (Frontend):
1. Settings → Environment Variables
2. Add:
   - `VITE_API_URL` = your_backend_url (optional)

## 🔧 Post-Deployment Configuration

### Update Frontend Settings
1. Visit your deployed frontend
2. Go to Settings page
3. Update "API Base URL" to your Vercel backend URL
4. Click "Save Changes"

### Test Deployment
1. Check Dashboard loads
2. Verify AI Agents show "Groq AI Active"
3. Test Live Map functionality
4. Check Analytics charts
5. Verify Settings save properly

## 🔐 Security Checklist

- ✅ `.env` files are in `.gitignore`
- ✅ Groq API key is set in Vercel environment variables
- ✅ CORS is enabled in backend (already configured)
- ✅ No sensitive data in frontend code
- ✅ API base URL is configurable

## 📝 Important Notes

### Backend Limitations on Vercel
- Vercel has 10-second timeout for serverless functions
- For long-running AI operations, consider:
  - Railway.app (no timeout)
  - Render.com (free tier available)
  - Fly.io (generous free tier)

### Alternative: Deploy Backend to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up

# Add environment variables in Railway dashboard
```

## 🌐 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

## 🔄 Continuous Deployment

### Automatic Deployments
1. Connect GitHub repository to Vercel
2. Every push to `main` branch auto-deploys
3. Pull requests get preview deployments

### GitHub Integration
```bash
# Push to GitHub
git add .
git commit -m "Deploy WildGuard AI"
git push origin main

# Vercel will auto-deploy
```

## 🐛 Troubleshooting

### Backend Issues
- Check Vercel logs: `vercel logs`
- Verify environment variables are set
- Test API endpoints directly

### Frontend Issues
- Clear browser cache
- Check console for errors
- Verify API base URL in Settings

### CORS Errors
Backend already has CORS enabled. If issues persist:
```python
# In backend/app.py
CORS(app, origins=["https://your-frontend.vercel.app"])
```

## 📊 Monitoring

### Vercel Analytics
- Enable in Vercel Dashboard
- Track page views and performance
- Monitor API response times

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Vercel Analytics for performance

## 🎯 Production Checklist

Before going live:
- [ ] Test all features in production
- [ ] Verify Groq AI agents work
- [ ] Check mobile responsiveness
- [ ] Test all navigation links
- [ ] Verify map loads correctly
- [ ] Test Settings persistence
- [ ] Check Analytics charts
- [ ] Verify Documentation page
- [ ] Test theme switching
- [ ] Check all API endpoints

## 🚀 Quick Deploy Commands

```bash
# Backend
cd backend
vercel --prod

# Frontend  
cd frontend
vercel --prod
```

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Check browser console for errors

---

**Your WildGuard AI platform is ready for the world! 🌍🦏**
