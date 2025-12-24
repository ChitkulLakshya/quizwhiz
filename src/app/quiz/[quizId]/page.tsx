import { mockQuizzes } from '@/lib/mock-data';
import QuizClient from './quiz-client';
import Header from '@/components/header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function TakeQuizPage({ params }: { params: { quizId: string } }) {
  const quiz = mockQuizzes.find(q => q.id === params.quizId);

  if (!quiz) {
    return (
        <div className="flex flex-col w-full">
            <Header />
            <main className="flex-1 p-8 flex items-center justify-center">
                 <Alert variant="destructive" className="max-w-md">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="font-headline">Quiz Not Found</AlertTitle>
                    <AlertDescription>
                        The quiz you are looking for does not exist or may have been moved.
                    </AlertDescription>
                </Alert>
            </main>
        </div>
    );
  }

  return <QuizClient quiz={quiz} />;
}
