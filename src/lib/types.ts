export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number; // in seconds
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string; // ISO string
};

export type Participant = {
  id:string;
  name: string;
  quizId: string;
};

export type Submission = {
  participantId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timeTaken: number; // in seconds
};

export type LeaderboardEntry = {
  rank: number;
  participantId: string;
  participantName: string;
  score: number;
  totalTime: number;
};
