import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-8 w-8" />
          <span className="inline-block font-headline text-2xl font-bold">QuizWhiz</span>
        </Link>
      </div>
    </header>
  );
}
