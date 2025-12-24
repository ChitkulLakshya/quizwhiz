# QuizWhiz - Project Structure & Architecture

## Overview

QuizWhiz is a real-time quiz application built with Next.js 15 and Firebase Firestore. It enables administrators to create and control live quizzes while participants join via QR codes and compete in real-time.

## Technology Stack

### Frontend
- **Framework**: Next.js 15.3.3 (React 18.3.1)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **QR Codes**: react-qr-code 2.0.15

### Backend
- **Database**: Firebase Firestore 11.9.1
- **Real-time**: Firestore Real-time Listeners
- **Hosting**: Firebase Hosting / Vercel

## Directory Structure

```
quizwhiz/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── admin/                    # Admin Routes
│   │   │   ├── page.tsx             # Dashboard - List all quizzes
│   │   │   ├── create/
│   │   │   │   └── page.tsx         # Create new quiz form
│   │   │   └── quiz/[quizId]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx     # Edit quiz & add questions
│   │   │       ├── control/
│   │   │       │   └── page.tsx     # Real-time control panel
│   │   │       └── leaderboard/
│   │   │           └── page.tsx     # Final results view
│   │   ├── join/
│   │   │   └── page.tsx             # Participant join page
│   │   ├── play/[quizId]/
│   │   │   └── page.tsx             # Participant quiz interface
│   │   ├── page.tsx                 # Home/Landing page
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   │
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── ...
│   │   └── header.tsx               # App header component
│   │
│   ├── firebase/
│   │   ├── config.ts                # Firebase configuration
│   │   ├── index.ts                 # Firebase initialization
│   │   └── ...                      # Other Firebase utilities
│   │
│   ├── lib/
│   │   └── firebase-service.ts      # Firebase service layer
│   │
│   └── types/
│       └── quiz.ts                  # TypeScript type definitions
│
├── firestore.rules                  # Firestore security rules
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind configuration
├── next.config.ts                   # Next.js configuration
├── QUIZ_APP_README.md              # Main documentation
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
└── PROJECT_STRUCTURE.md            # This file
```

## Core Components

### 1. Admin Dashboard (`/admin`)

**Purpose**: Central hub for quiz management

**Features**:
- List all created quizzes
- View quiz status and participant count
- Quick access to edit, control, and results

**Key Files**:
- `src/app/admin/page.tsx`

### 2. Quiz Creator (`/admin/create`)

**Purpose**: Create new quizzes

**Features**:
- Enter quiz title and description
- Generate unique 6-digit join code
- Redirect to question editor

**Key Files**:
- `src/app/admin/create/page.tsx`

### 3. Question Editor (`/admin/quiz/[quizId]/edit`)

**Purpose**: Add and manage questions

**Features**:
- Add multiple-choice questions (4 options)
- Set time limits (5-300 seconds)
- Configure points per question
- Delete questions
- View all questions in order

**Key Files**:
- `src/app/admin/quiz/[quizId]/edit/page.tsx`

### 4. Quiz Control Panel (`/admin/quiz/[quizId]/control`)

**Purpose**: Real-time quiz administration

**Features**:
- Display QR code and join code
- Monitor participants in real-time
- Control quiz flow (start, next, end)
- View live countdown timer
- Show question results with statistics
- Automatic timer synchronization

**Key Files**:
- `src/app/admin/quiz/[quizId]/control/page.tsx`

**Real-time Updates**:
- Quiz status changes
- Participant joins/leaves
- Answer submissions
- Timer synchronization

### 5. Admin Leaderboard (`/admin/quiz/[quizId]/leaderboard`)

**Purpose**: View final results

**Features**:
- Ranked participant list
- Total scores and correct answers
- Visual ranking indicators (🏆 🥈 🥉)

**Key Files**:
- `src/app/admin/quiz/[quizId]/leaderboard/page.tsx`

### 6. Join Page (`/join`)

**Purpose**: Participant entry point

**Features**:
- Enter 6-digit quiz code
- Support for QR code scanning (via URL parameter)
- Enter participant name
- Validate quiz exists
- Store participant info in localStorage

**Key Files**:
- `src/app/join/page.tsx`

**URL Parameters**:
- `?code=123456` - Pre-fill quiz code

### 7. Play Interface (`/play/[quizId]`)

**Purpose**: Participant quiz experience

**Features**:
- Wait in lobby until quiz starts
- View questions with countdown timer
- Select and submit answers
- Real-time status updates
- View final leaderboard with personal ranking

**Key Files**:
- `src/app/play/[quizId]/page.tsx`

**Real-time Updates**:
- Quiz status changes
- Question transitions
- Timer synchronization
- Leaderboard updates

## Data Models

### Quiz
```typescript
interface Quiz {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: number;
  status: 'draft' | 'lobby' | 'active' | 'completed';
  currentQuestionIndex: number;
  questionStartTime?: number;
  code: string; // 6-digit join code
}
```

### Question
```typescript
interface Question {
  id: string;
  quizId: string;
  questionText: string;
  options: string[]; // 4 options
  correctOptionIndex: number; // 0-3
  timeLimit: number; // seconds
  order: number;
  points: number;
}
```

### Participant
```typescript
interface Participant {
  id: string;
  quizId: string;
  name: string;
  joinedAt: number;
  totalScore: number;
  answers: ParticipantAnswer[];
}
```

### ParticipantAnswer
```typescript
interface ParticipantAnswer {
  questionId: string;
  selectedOptionIndex: number;
  answeredAt: number;
  isCorrect: boolean;
  pointsEarned: number;
  timeToAnswer: number; // milliseconds
}
```

## Firestore Structure

```
/quizzes/{quizId}
  - id, title, description, createdBy, createdAt
  - status, currentQuestionIndex, questionStartTime
  - code (6-digit)
  
  /questions/{questionId}
    - id, quizId, questionText, options[]
    - correctOptionIndex, timeLimit, order, points
  
  /participants/{participantId}
    - id, quizId, name, joinedAt
    - totalScore, answers[]
```

## Service Layer (`firebase-service.ts`)

### Quiz Operations
- `createQuiz()` - Create new quiz with unique code
- `getQuiz()` - Fetch quiz by ID
- `getQuizByCode()` - Find quiz by 6-digit code
- `updateQuizStatus()` - Change quiz status
- `startQuestion()` - Begin question timer
- `endQuiz()` - Mark quiz as completed

### Question Operations
- `addQuestion()` - Add question to quiz
- `getQuestions()` - Fetch all questions (ordered)
- `deleteQuestion()` - Remove question

### Participant Operations
- `joinQuiz()` - Register participant
- `getParticipants()` - Fetch all participants
- `submitAnswer()` - Record answer and update score

### Real-time Subscriptions
- `subscribeToQuiz()` - Listen to quiz changes
- `subscribeToParticipants()` - Listen to participant updates
- `subscribeToQuestions()` - Listen to question changes

### Analytics
- `calculateQuestionResults()` - Aggregate answer statistics
- `getLeaderboard()` - Generate ranked participant list

## Real-time Architecture

### Admin Control Flow
1. Admin updates quiz status → Firestore
2. Firestore triggers listener in participant clients
3. Participants see updated status immediately

### Question Flow
1. Admin clicks "Start Question" → `startQuestion()`
2. Updates `currentQuestionIndex` and `questionStartTime`
3. All clients receive update via `subscribeToQuiz()`
4. Clients calculate remaining time locally
5. Participants submit answers → `submitAnswer()`
6. Admin clicks "Show Results" → `calculateQuestionResults()`
7. Results displayed to admin

### Timer Synchronization
- Server timestamp stored in `questionStartTime`
- Clients calculate `timeRemaining = timeLimit - (now - questionStartTime)`
- Ensures all clients show same countdown

## Scoring Algorithm

```typescript
// Base points for correct answer
const basePoints = question.points;

// Time ratio (0 = timeout, 1 = instant)
const timeRatio = 1 - (timeToAnswer / (timeLimit * 1000));

// Calculate points (minimum 50% of base)
const pointsEarned = Math.round(basePoints * Math.max(0.5, timeRatio));
```

**Example**:
- Question: 100 points, 30 seconds
- Answer in 5 seconds: 100 × (1 - 5/30) = 83 points
- Answer in 15 seconds: 100 × (1 - 15/30) = 50 points
- Answer in 30 seconds: 100 × 0.5 = 50 points (minimum)

## Security Model

### Firestore Rules (Simplified for Demo)
```javascript
// Quizzes: Read by all, write by all (add auth later)
match /quizzes/{quizId} {
  allow read: if true;
  allow write: if true;
}

// Questions: Read by all, write by all (add auth later)
match /quizzes/{quizId}/questions/{questionId} {
  allow read: if true;
  allow write: if true;
}

// Participants: Read/write by all
match /quizzes/{quizId}/participants/{participantId} {
  allow read, write: if true;
}
```

### Production Security (TODO)
- Add Firebase Authentication
- Restrict quiz creation to authenticated admins
- Validate participant IDs match auth UIDs
- Implement rate limiting
- Enable Firebase App Check

## State Management

### Admin Control Panel
- **Local State**: UI state, loading states
- **Firestore State**: Quiz, questions, participants
- **Derived State**: Current question, time remaining, results

### Participant Interface
- **Local Storage**: Participant ID, name, quiz ID
- **Local State**: Selected option, has answered
- **Firestore State**: Quiz status, current question
- **Derived State**: Time remaining, leaderboard position

## Performance Considerations

### Firestore Reads
- Quiz control panel: ~10 reads/second (real-time listeners)
- Participant interface: ~5 reads/second
- Optimization: Use local state for countdown timers

### Firestore Writes
- Answer submission: 1 write per participant per question
- Quiz control: 1 write per question transition
- Optimization: Batch writes where possible

### Scalability
- Current: 100-1000 concurrent participants
- Bottleneck: Firestore real-time listener connections
- Solution: Use Firebase Realtime Database for very large events

## Testing Strategy

### Manual Testing
1. Create quiz with 3 questions
2. Join as 3 different participants
3. Start quiz and answer questions
4. Verify real-time updates
5. Check final leaderboard

### Automated Testing (TODO)
- Unit tests for service layer
- Integration tests for Firestore operations
- E2E tests for quiz flow
- Load testing for concurrent users

## Future Enhancements

### Short-term
- [ ] Firebase Authentication for admins
- [ ] Edit existing questions
- [ ] Duplicate quiz functionality
- [ ] Export results to CSV

### Medium-term
- [ ] Image support in questions
- [ ] Multiple question types (true/false, short answer)
- [ ] Team mode
- [ ] Custom themes and branding

### Long-term
- [ ] AI-generated questions
- [ ] Video/audio in questions
- [ ] Live video streaming
- [ ] Mobile apps (React Native)
- [ ] Analytics dashboard

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run typecheck    # Check TypeScript
npm run lint         # Lint code
```

### Deployment
```bash
npm run build        # Build for production
firebase deploy      # Deploy to Firebase
```

### Git Workflow
1. Create feature branch
2. Make changes
3. Test locally
4. Commit and push
5. Deploy to production

## Troubleshooting

### Common Issues

**Real-time updates not working**
- Check Firestore listeners are active
- Verify network connectivity
- Check browser console for errors

**Timer desynchronization**
- Ensure system clocks are accurate
- Check `questionStartTime` is set correctly
- Verify client-side calculation logic

**Participants can't join**
- Check quiz status is 'lobby' or 'active'
- Verify quiz code is correct
- Check Firestore rules allow writes

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Real-time Updates](https://firebase.google.com/docs/firestore/query-data/listen)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

---

Built with Next.js 15 + Firebase Firestore
