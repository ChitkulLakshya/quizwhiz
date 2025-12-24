'use client';

import { useState, useEffect } from 'react';
import type { Quiz, Question } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Send, LogIn, ChevronsRight, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { useToast } from '@/hooks/use-toast';

type GameState = 'joining' | 'waiting' | 'active' | 'review' | 'finished';

export default function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>('joining');
  const [participantName, setParticipantName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const [timeLeft, setTimeLeft] = useState(currentQuestion?.timeLimit || 30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (gameState === 'active' && !isTimeUp) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, currentQuestionIndex, isTimeUp]);
  
  useEffect(() => {
    if(isTimeUp) {
      handleAnswerSubmit();
    }
  }, [isTimeUp]);


  const handleJoin = () => {
    if (participantName.trim().length < 2) {
      toast({ title: 'Invalid Name', description: 'Please enter a name with at least 2 characters.', variant: 'destructive' });
      return;
    }
    setGameState('waiting');
    toast({ title: `Welcome, ${participantName}!`, description: 'The quiz will begin shortly.' });
    // Simulate host starting the quiz after a delay
    setTimeout(() => setGameState('active'), 3000);
  };
  
  const handleAnswerSelect = (option: string) => {
    if (gameState !== 'active') return;
    setSelectedAnswer(option);
  };
  
  const handleAnswerSubmit = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setGameState('review');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setTimeLeft(quiz.questions[currentQuestionIndex + 1].timeLimit);
      setIsTimeUp(false);
      setGameState('active');
    } else {
      setGameState('finished');
    }
  };

  if (gameState === 'joining') {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header/>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Join Quiz: {quiz.title}</CardTitle>
              <CardDescription>Enter your name to join the fun!</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Your Name" 
                value={participantName} 
                onChange={(e) => setParticipantName(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                autoFocus
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleJoin}>
                <LogIn className="mr-2" /> Join
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }
  
  if (gameState === 'waiting') {
    return (
      <div className="flex flex-col min-h-screen bg-muted/40">
        <Header/>
        <main className="flex-1 flex items-center justify-center p-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <h1 className="font-headline text-3xl">Waiting for host to start...</h1>
                <p className="text-muted-foreground">Get ready, {participantName}!</p>
            </div>
        </main>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header/>
        <main className="flex-1 flex items-center justify-center p-4 text-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
                    <CardDescription>Great job, {participantName}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{score} / {quiz.questions.length}</p>
                    <p className="text-muted-foreground mt-2">Your final score</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => router.push(`/quiz/${quiz.id}/leaderboard`)}>
                        View Leaderboard <ChevronsRight className="ml-2" />
                    </Button>
                </CardFooter>
            </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header/>
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-bold font-headline">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span className="font-bold font-headline">{timeLeft}s</span>
              </div>
              <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-2" />
            </div>

            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-body leading-relaxed">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isSelected = option === selectedAnswer;
                  
                  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
                  if (gameState === 'active' && isSelected) variant = "default";
                  if (gameState === 'review') {
                      if(isCorrect) variant = "default";
                      else if (isSelected && !isCorrect) variant = "destructive";
                      else variant = "secondary";
                  }

                  return (
                    <Button
                      key={option}
                      variant={variant}
                      className="h-auto w-full text-wrap p-4 justify-start text-base md:text-lg"
                      onClick={() => handleAnswerSelect(option)}
                      disabled={gameState !== 'active'}
                    >
                      {gameState === 'review' && (
                        isCorrect ? <CheckCircle className="mr-2 text-primary-foreground" /> :
                        isSelected && !isCorrect ? <XCircle className="mr-2" /> : <span className="mr-2 w-6"/>
                      )}
                      {option}
                    </Button>
                  );
                })}
              </CardContent>
              <CardFooter>
                {gameState === 'active' && (
                  <Button className="w-full md:w-auto ml-auto" onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                    Submit <Send className="ml-2" />
                  </Button>
                )}
                {gameState === 'review' && (
                  <Button className="w-full md:w-auto ml-auto" onClick={handleNextQuestion}>
                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronsRight className="ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
        </div>
      </main>
    </div>
  );
}
