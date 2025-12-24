# QuizWhiz - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Deploy Firestore Rules (30 seconds)

```bash
firebase deploy --only firestore:rules
```

This deploys the security rules that allow your app to read/write to Firestore.

### Step 2: Start Development Server (10 seconds)

```bash
npm run dev
```

Your app will be running at: **http://localhost:9002**

### Step 3: Create Your First Quiz (2 minutes)

1. **Open Admin Dashboard**
   - Go to: http://localhost:9002/admin
   - Click "Create New Quiz"

2. **Add Quiz Details**
   - Title: "My First Quiz"
   - Description: "A test quiz"
   - Click "Create Quiz & Add Questions"

3. **Add Questions**
   - Question: "What is 2 + 2?"
   - Options: 
     - A: 3
     - B: 4 ✓ (select this as correct)
     - C: 5
     - D: 6
   - Time: 30 seconds
   - Points: 100
   - Click "Add Question"
   
   Add 2-3 more questions the same way.

4. **Start Quiz Session**
   - Click "Start Quiz Session"
   - You'll see a QR code and 6-digit code

### Step 4: Join as Participant (1 minute)

1. **Open Join Page** (in a new browser tab or incognito window)
   - Go to: http://localhost:9002/join
   
2. **Enter Code**
   - Type the 6-digit code from admin panel
   - Click "Find Quiz"
   
3. **Enter Name**
   - Name: "Test Player"
   - Click "Join Quiz"

### Step 5: Run the Quiz (1 minute)

1. **In Admin Panel**
   - Click "Open Lobby" (participant will see "Waiting to Start")
   - Click "Start First Question"
   
2. **In Participant Window**
   - Read the question
   - Select an answer
   - Click "Submit Answer"
   
3. **Back in Admin Panel**
   - Watch the countdown timer
   - Click "Show Results" to see answer statistics
   - Click "Next Question" to continue
   
4. **Complete Quiz**
   - After last question, click "End Quiz"
   - View final leaderboard

## 🎉 Congratulations!

You've successfully created and run your first real-time quiz!

## Next Steps

### Add More Features
- Create multiple quizzes
- Add more questions
- Test with multiple participants
- Customize time limits and points

### Deploy to Production
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment instructions.

### Customize the App
- Update colors in `src/app/globals.css`
- Modify UI components in `src/components/ui/`
- Add your logo to `src/components/header.tsx`

## Common URLs

- **Home**: http://localhost:9002
- **Admin Dashboard**: http://localhost:9002/admin
- **Join Page**: http://localhost:9002/join
- **Create Quiz**: http://localhost:9002/admin/create

## Testing with Multiple Participants

### Option 1: Multiple Browser Windows
1. Open admin panel in normal browser
2. Open join page in incognito window
3. Open join page in different browser

### Option 2: Multiple Devices
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Share URL: `http://YOUR_IP:9002/join`
3. Join from phones/tablets on same network

### Option 3: QR Code
1. Display QR code from admin panel
2. Scan with phone camera
3. Opens join page automatically

## Troubleshooting

### "Permission denied" error
```bash
firebase deploy --only firestore:rules
```

### Port 9002 already in use
```bash
# Kill the process using port 9002
# Windows: netstat -ano | findstr :9002
# Mac/Linux: lsof -ti:9002 | xargs kill
```

### Real-time updates not working
1. Check browser console for errors
2. Refresh both admin and participant pages
3. Verify Firestore rules are deployed

### Can't find quiz by code
1. Check the code is exactly 6 digits
2. Verify quiz was created successfully
3. Check Firebase Console > Firestore > quizzes collection

## Tips for Best Experience

### For Administrators
- ✅ Test quiz before live event
- ✅ Have backup questions ready
- ✅ Display QR code on large screen
- ✅ Wait for all participants before starting
- ✅ Give participants time to read questions

### For Participants
- ✅ Join before quiz starts
- ✅ Use stable internet connection
- ✅ Keep browser tab active
- ✅ Read questions carefully
- ✅ Answer quickly for more points

## Quiz Flow Diagram

```
Admin                          Participant
  |                                |
  | Create Quiz                    |
  | Add Questions                  |
  | Display QR Code                |
  |                                |
  | Open Lobby -----------------> Wait in Lobby
  |                                |
  | Start Question 1 ------------> See Question 1
  |                                | Select Answer
  |                                | Submit Answer
  | Show Results                   | Wait for Results
  |                                |
  | Next Question ---------------> See Question 2
  |                                | ...
  |                                |
  | End Quiz -------------------> See Leaderboard
```

## Sample Quiz Ideas

### General Knowledge
- Geography questions
- History trivia
- Science facts
- Pop culture

### Educational
- Math problems
- Vocabulary
- Grammar
- Foreign language

### Corporate
- Company trivia
- Product knowledge
- Safety training
- Team building

### Fun
- "Would you rather"
- Emoji puzzles
- Picture rounds
- Music lyrics

## Performance Tips

### For Large Events (100+ participants)
1. Use faster time limits (10-15 seconds)
2. Limit to 10-15 questions
3. Test with 10-20 people first
4. Have stable internet connection
5. Consider upgrading Firebase plan

### For Small Events (10-50 participants)
1. Use longer time limits (30-60 seconds)
2. Add more questions (20-30)
3. Include discussion time between questions
4. Show detailed results

## Need Help?

1. Check [QUIZ_APP_README.md](./QUIZ_APP_README.md) for detailed documentation
2. Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture details
3. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help
4. Check browser console for error messages
5. Check Firebase Console for Firestore errors

---

Happy Quizzing! 🎯
