'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';
import { isAdminEmail, registerAdmin } from '@/lib/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Redirect if already logged in (admin status already verified during login)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ User already logged in, redirecting to admin dashboard...');
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        const emailToCheck = user.email.toLowerCase();
        const isAdmin = await isAdminEmail(emailToCheck);

        if (!isAdmin) {
          console.log(`ℹ️ User ${emailToCheck} not in admins collection. Auto-registering...`);
          await registerAdmin(emailToCheck);
          // Allow to proceed automatically
        }

        console.log('✅ Admin verification passed. Redirecting...');
        router.push('/admin');
      }
    } catch (error: any) {
      console.error('❌ Google Login failed:', error);
      if (error.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled in the Firebase Console. Please enable it in Authentication > Sign-in method.');
      } else {
        setError(error.message || 'Google Login failed.');
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log(isSignUp ? '🔐 Attempting registration...' : '🔐 Attempting login...');

      let user;
      if (isSignUp) {
        // 1. Perform Firebase Auth Registration
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        console.log('✅ Registration successful for:', user.email);
      } else {
        // 1. Perform Firebase Auth Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        console.log('✅ Auth successful for:', user.email);
      }

      // 2. Perform Firestore Admin Check / Registration
      if (user.email) {
        const emailToCheck = user.email.toLowerCase();
        
        if (isSignUp) {
           // If signing up, always register as admin (based on current open policy)
           await registerAdmin(emailToCheck);
        } else {
           const isAdmin = await isAdminEmail(emailToCheck);
           if (!isAdmin) {
             console.log(`ℹ️ User ${emailToCheck} not in admins collection. Auto-registering...`);
             await registerAdmin(emailToCheck);
           }
        }

        console.log('✅ Admin verification passed. Redirecting...');
        router.push('/admin');
      } else {
        throw new Error('User email is missing');
      }
    } catch (error: any) {
      console.error(isSignUp ? '❌ Registration failed:' : '❌ Login failed:', error);

      // Map Firebase errors to user-friendly messages
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/email-already-in-use':
          setError('Email is already in use. Please sign in instead.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use a stronger password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/Password Sign-In is not enabled in the Firebase Console. Please enable it in Authentication > Sign-in method.');
          break;
        default:
          setError(error.message || (isSignUp ? 'Registration failed. Please try again.' : 'Login failed. Please try again.'));
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{isSignUp ? 'Admin Sign Up' : 'Admin Login'}</CardTitle>
          <CardDescription>
            {isSignUp ? 'Create an admin account to access the quiz management panel' : 'Sign in with your admin email to access the quiz management panel'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@quizwhiz.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                required
                disabled={loading}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email || !password}
            >
              {loading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Google
            </Button>

            <div className="mt-2 text-center text-sm text-gray-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  New User?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
