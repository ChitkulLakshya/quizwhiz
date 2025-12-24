# QuizWhiz - Real-Time Quiz Application

A complete real-time quiz application built with Next.js 15 and Firebase Firestore.

## 🚀 Quick Start

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Start development server
npm run dev
```

Visit: **http://localhost:9002**

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes
- **[Full Documentation](./QUIZ_APP_README.md)** - Complete feature guide
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Architecture details
- **[Features Checklist](./FEATURES_CHECKLIST.md)** - All features

## ✨ Key Features

- ✅ Real-time quiz control and synchronization
- ✅ QR code joining for participants
- ✅ Live countdown timers
- ✅ Speed-based scoring system
- ✅ Dynamic leaderboards
- ✅ Mobile-responsive design
- ✅ No authentication required for participants

## 🎯 Main Routes

- `/admin` - Admin dashboard
- `/admin/create` - Create new quiz
- `/join` - Participant join page
- Home page with feature overview

## 🛠️ Tech Stack

- Next.js 15 + React 18 + TypeScript
- Firebase Firestore (real-time database)
- Tailwind CSS + Radix UI
- QR Code generation

## 📖 How It Works

1. **Admin creates quiz** with questions and time limits
2. **Participants join** via QR code or 6-digit code
3. **Admin controls flow** - start questions, show results, advance
4. **Real-time updates** keep everyone synchronized
5. **Final leaderboard** shows rankings and scores

---

For detailed setup and usage instructions, see [QUICK_START.md](./QUICK_START.md)
