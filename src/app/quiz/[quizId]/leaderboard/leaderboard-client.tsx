'use client';

import type { Quiz, LeaderboardEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import { downloadCsv } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function LeaderboardClient({ quiz, leaderboardData }: { quiz: Quiz, leaderboardData: LeaderboardEntry[] }) {
    const { toast } = useToast();

    const handleExport = () => {
        const csvData = leaderboardData.map(({ rank, participantName, score, totalTime }) => ({
            Rank: rank,
            Name: participantName,
            Score: score,
            'Time (s)': totalTime.toFixed(2),
        }));
        
        downloadCsv(csvData, `leaderboard-${quiz.id}.csv`);
        toast({
            title: 'Export Started',
            description: 'Your leaderboard CSV is downloading.',
        });
    };

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="font-headline text-3xl md:text-4xl">Leaderboard</h1>
                        <p className="text-muted-foreground text-lg">{quiz.title}</p>
                    </div>
                    <Button onClick={handleExport}>
                        <Download className="mr-2" />
                        Export as CSV
                    </Button>
                </div>

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24 text-center font-headline">Rank</TableHead>
                                <TableHead className="font-headline">Participant</TableHead>
                                <TableHead className="text-right font-headline">Score</TableHead>
                                <TableHead className="text-right font-headline">Time (s)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map((entry, index) => (
                                <TableRow key={entry.participantId} className={index < 3 ? 'bg-secondary/50' : ''}>
                                    <TableCell className="text-center font-bold text-lg">
                                        {entry.rank === 1 && '🥇'}
                                        {entry.rank === 2 && '🥈'}
                                        {entry.rank === 3 && '🥉'}
                                        {entry.rank > 3 && entry.rank}
                                    </TableCell>
                                    <TableCell className="font-medium">{entry.participantName}</TableCell>
                                    <TableCell className="text-right font-semibold">{entry.score}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{entry.totalTime.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
