# QuizWhiz - Real-Time Quiz Application

A complete real-time quiz application built with React (Next.js) and Firebase, featuring admin control, live updates, QR code joining, and dynamic leaderboards.

## Features

### Admin Features
- ✅ Create quizzes with custom titles and descriptions
- ✅ Add multiple-choice questions with 4 options
- ✅ Set custom time limits for each question (5-300 seconds)
- ✅ Configure points for each question
- ✅ Generate unique 6-digit join codes automatically
- ✅ Display QR codes for easy participant joining
- ✅ Real-time participant monitoring
- ✅ Full quiz flow control (start, pause, next question)
- ✅ Live result visualization after each question
- ✅ View final leaderboard with rankings

### Participant Features
- ✅ Join via QR code or 6-digit code
- ✅ Enter name before joining (no account required)
- ✅ Real-time question display
- ✅ Live countdown timer
- ✅ Submit answers with visual feedback
- ✅ Speed-based scoring (faster = more points)
- ✅ View final leaderboard with personal ranking

### Technical Features
- ✅ Real-time synchronization using Firestore listeners
- ✅ Responsive design (mobile-friendly)
- ✅ TypeScript for type safety
- ✅ Clean component architecture
- ✅ Firebase security rules
- ✅ No authentication required for participants

## Project Structure

```
src/
├── app/
│   ├── admin/                    # Admin dashboard and quiz management
│   │   ├── page.tsx             # Admin dashboard (list all quizzes)
│   │   ├── create/              # Create new quiz
│   │   └── quiz/[quizId]/
│   │       ├── edit/            # Edit quiz & add questions
│   │       ├── control/         # Real-time quiz control panel
│   │       └── leaderboard/     # Final results
│   ├── join/                    # Participant join page
│   ├── play/[quizId]/          # Participant quiz interface
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # Reusable UI components
│   └── header.tsx               # App header
├── firebase/                    # Firebase configuration
├── lib/
│   └── firebase-service.ts      # Firebase service layer
└── types/
    └── quiz.ts                  # TypeScript types
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Firebase project created
- Firebase CLI installed: `npm install -g firebase-tools`

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Enable Firebase Hosting (optional)

#### Configure Firestore
1. Go to Firestore Database in Firebase Console
2. Create database in production mode
3. Deploy security rules (see below)

#### Get Firebase Config
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Add a web app or use existing config
4. Copy the configuration object

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

Your Firebase config is already in `src/firebase/config.ts`. If you need to update it:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Deploy Firestore Rules

Update your Firestore security rules in Firebase Console or deploy via CLI:

```bash
firebase deploy --only firestore:rules
```

The rules are already defined in `firestore.rules`.

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:9002`

## Usage Guide

### For Administrators

1. **Access Admin Dashboard**
   - Navigate to `/admin`
   - View all created quizzes

2. **Create a Quiz**
   - Click "Create New Quiz"
   - Enter title and description
   - Click "Create Quiz & Add Questions"

3. **Add Questions**
   - Enter question text
   - Add 4 options (A, B, C, D)
   - Select the correct answer (radio button)
   - Set time limit (default: 30 seconds)
   - Set points (default: 100)
   - Click "Add Question"
   - Repeat for all questions

4. **Start Quiz Session**
   - Click "Start Quiz Session" after adding questions
   - Display the QR code or 6-digit code to participants
   - Click "Open Lobby" to allow participants to join

5. **Control Quiz Flow**
   - Click "Start First Question" when ready
   - Watch the countdown timer
   - Click "Show Results" to display answer statistics
   - Click "Next Question" to proceed
   - Click "End Quiz" to show final leaderboard

### For Participants

1. **Join Quiz**
   - Scan QR code or visit `/join`
   - Enter the 6-digit code
   - Enter your name
   - Click "Join Quiz"

2. **Answer Questions**
   - Wait in lobby until quiz starts
   - Read each question carefully
   - Select your answer (A, B, C, or D)
   - Click "Submit Answer" before time runs out
   - Wait for next question

3. **View Results**
   - See your final ranking
   - View total score and correct answers
   - Compare with other participants

## Firestore Data Structure

```
quizzes/
  {quizId}/
    - id: string
    - title: string
    - description: string
    - createdBy: string
    - createdAt: number
    - status: 'draft' | 'lobby' | 'active' | 'completed'
    - currentQuestionIndex: number
    - questionStartTime: number
    - code: string (6-digit)
    
    questions/
      {questionId}/
        - id: string
        - quizId: string
        - questionText: string
        - options: string[]
        - correctOptionIndex: number
        - timeLimit: number
        - order: number
        - points: number
    
    participants/
      {participantId}/
        - id: string
        - quizId: string
        - name: string
        - joinedAt: number
        - totalScore: number
        - answers: ParticipantAnswer[]
```

## Key Technologies

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Firebase Firestore
- **Real-time**: Firestore real-time listeners
- **UI**: Tailwind CSS, Radix UI components
- **QR Codes**: react-qr-code
- **Styling**: CSS variables with dark mode support

## Real-Time Features

### Admin Control Panel
- Live participant count updates
- Real-time answer submissions
- Automatic timer synchronization
- Live result aggregation

### Participant Interface
- Instant question updates
- Synchronized countdown timer
- Real-time status changes
- Live leaderboard updates

## Scoring System

Points are calculated based on:
1. **Correctness**: Only correct answers earn points
2. **Speed**: Faster answers earn more points
   - Formula: `points = basePoints × max(0.5, 1 - timeRatio)`
   - Minimum: 50% of base points
   - Maximum: 100% of base points

## Security

- Firestore security rules prevent unauthorized access
- Participants can only modify their own data
- Admin operations require proper authentication
- No sensitive data exposed to clients

## Deployment

### Deploy to Firebase Hosting

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables (if needed)
3. Deploy automatically on push

## Troubleshooting

### Participants can't join
- Check Firestore rules are deployed
- Verify quiz status is 'lobby' or 'active'
- Ensure correct quiz code

### Real-time updates not working
- Check Firebase configuration
- Verify Firestore listeners are active
- Check browser console for errors

### Timer not synchronized
- Ensure system clocks are accurate
- Check network latency
- Verify questionStartTime is set correctly

## Future Enhancements

- [ ] Firebase Authentication for admins
- [ ] Image support in questions
- [ ] Multiple question types (true/false, short answer)
- [ ] Quiz templates
- [ ] Export results to CSV
- [ ] Team mode
- [ ] Custom themes
- [ ] Sound effects
- [ ] Analytics dashboard

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please check:
1. Firebase Console for Firestore errors
2. Browser console for client-side errors
3. Network tab for API issues

---

Built with ❤️ using Next.js and Firebase
