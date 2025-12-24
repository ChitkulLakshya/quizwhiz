# QuizWhiz Deployment Guide

## Quick Start (Development)

1. **Install dependencies**
```bash
npm install
```

2. **Deploy Firestore Rules**
```bash
firebase deploy --only firestore:rules
```

3. **Run development server**
```bash
npm run dev
```

4. **Access the application**
- Admin Dashboard: http://localhost:9002/admin
- Join Page: http://localhost:9002/join
- Home: http://localhost:9002

## Firebase Setup

### 1. Firestore Database

Your Firestore is already configured. The rules in `firestore.rules` allow:
- Anyone to read quizzes and questions
- Anyone to create and update participant data
- Admins to manage quizzes (simplified for demo)

To deploy rules:
```bash
firebase deploy --only firestore:rules
```

### 2. Firestore Indexes

No composite indexes are required for basic functionality. If you encounter index errors:

1. Click the link in the error message, or
2. Create indexes manually in Firebase Console:
   - Collection: `quizzes`
   - Fields: `createdAt` (Descending)

### 3. Firebase Configuration

Your Firebase config is in `src/firebase/config.ts`:
```typescript
{
  projectId: "studio-6002377870-4ac11",
  appId: "1:832050994260:web:ff2397933951a2ab9ca1c1",
  apiKey: "AIzaSyCljrhhL-C_j-MhBaN8ZHxvwNSsXThpz78",
  authDomain: "studio-6002377870-4ac11.firebaseapp.com",
  messagingSenderId: "832050994260"
}
```

## Production Deployment

### Option 1: Firebase Hosting

1. **Build the application**
```bash
npm run build
```

2. **Deploy to Firebase**
```bash
firebase deploy
```

This will deploy:
- Firestore rules
- Hosting (if configured in firebase.json)

### Option 2: Vercel

1. **Connect to Vercel**
   - Push code to GitHub
   - Import project in Vercel
   - Connect repository

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Deploy**
   - Vercel will auto-deploy on push

### Option 3: Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Run

## Environment Variables

No environment variables are required! Firebase config is in the code.

For production, you may want to:
1. Move Firebase config to environment variables
2. Add authentication for admin routes
3. Enable Firebase App Check for security

## Post-Deployment Checklist

- [ ] Firestore rules deployed
- [ ] Application accessible via URL
- [ ] Can create a quiz from admin dashboard
- [ ] Can join quiz via code
- [ ] Real-time updates working
- [ ] QR codes displaying correctly
- [ ] Leaderboard showing results

## Testing the Deployment

### Test Admin Flow
1. Go to `/admin`
2. Click "Create New Quiz"
3. Add title and description
4. Add at least 2 questions
5. Click "Start Quiz Session"
6. Note the 6-digit code

### Test Participant Flow
1. Open `/join` in a different browser/incognito
2. Enter the 6-digit code
3. Enter a name
4. Join the quiz

### Test Real-Time Features
1. In admin panel, click "Open Lobby"
2. Verify participant appears in participant list
3. Click "Start First Question"
4. Answer the question as participant
5. Click "Show Results" in admin panel
6. Verify results display correctly
7. Click "Next Question"
8. Complete all questions
9. View final leaderboard

## Troubleshooting

### Build Errors

**Error: Module not found**
```bash
npm install
```

**TypeScript errors**
```bash
npm run typecheck
```

### Runtime Errors

**Firestore permission denied**
- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Check Firebase Console > Firestore > Rules

**Real-time updates not working**
- Check browser console for errors
- Verify Firestore listeners are active
- Check network tab for WebSocket connections

**QR code not displaying**
- Verify `react-qr-code` is installed
- Check if URL is correct
- Ensure component is client-side rendered

### Performance Issues

**Slow initial load**
- Enable Next.js caching
- Use static generation where possible
- Optimize images

**Firestore costs**
- Monitor Firestore usage in Firebase Console
- Implement pagination for large datasets
- Use Firestore emulator for development

## Security Enhancements (Production)

### 1. Add Firebase Authentication

```typescript
// Protect admin routes
import { getAuth } from 'firebase/auth';

const auth = getAuth();
if (!auth.currentUser) {
  router.push('/login');
}
```

### 2. Update Firestore Rules

```javascript
// Only authenticated admins can create quizzes
match /quizzes/{quizId} {
  allow read: if true;
  allow create, update, delete: if request.auth != null 
    && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
}
```

### 3. Enable Firebase App Check

Protect against abuse:
1. Enable App Check in Firebase Console
2. Add reCAPTCHA or other provider
3. Update client code to use App Check

### 4. Rate Limiting

Use Firebase Cloud Functions to implement rate limiting:
```javascript
// Limit quiz creation to 10 per hour per user
```

## Monitoring

### Firebase Console
- Monitor Firestore reads/writes
- Check for errors in Functions logs
- View usage statistics

### Application Monitoring
- Add error tracking (Sentry, LogRocket)
- Monitor performance (Web Vitals)
- Track user analytics (Google Analytics)

## Backup and Recovery

### Firestore Backup
```bash
# Export Firestore data
gcloud firestore export gs://[BUCKET_NAME]

# Import Firestore data
gcloud firestore import gs://[BUCKET_NAME]/[EXPORT_FOLDER]
```

### Code Backup
- Use Git for version control
- Push to GitHub/GitLab
- Tag releases

## Scaling Considerations

### Current Limits
- Firestore: 1 million reads/day (free tier)
- Hosting: 10 GB storage, 360 MB/day transfer (free tier)
- Concurrent users: ~100-1000 (depends on question frequency)

### Scaling Up
1. Upgrade Firebase plan (Blaze - pay as you go)
2. Implement caching (Redis, CDN)
3. Use Cloud Functions for heavy operations
4. Consider Firestore sharding for very large quizzes

## Cost Estimation

### Free Tier (Spark Plan)
- Suitable for: Development, small events (<100 participants)
- Cost: $0/month

### Paid Tier (Blaze Plan)
- Suitable for: Production, large events (100-1000 participants)
- Estimated cost: $5-50/month depending on usage
- Firestore: $0.06 per 100k reads, $0.18 per 100k writes
- Hosting: $0.15/GB storage, $0.15/GB transfer

### Example: 500 participant quiz with 10 questions
- Reads: ~15,000 (participants × questions × 3)
- Writes: ~5,000 (participants × questions)
- Cost: ~$1.50 per quiz session

## Support

For issues:
1. Check browser console for errors
2. Review Firebase Console logs
3. Check Firestore rules
4. Verify network connectivity
5. Test in incognito mode

---

Happy Quizzing! 🎉
