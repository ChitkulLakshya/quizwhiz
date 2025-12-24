/**
 * Firebase initialization - Singleton pattern for Next.js 15 + Turbopack
 * Initializes Firebase app ONCE and exports Firestore and Auth as constants
 * Safe for Hot Module Replacement (HMR) and multiple imports
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
};

// Validate required environment variables
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error(
    'Missing Firebase configuration. Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set in .env.local'
  );
}

// Singleton Firebase app instance
// Safe for Turbopack HMR - getApps() checks for existing instances
let app: FirebaseApp;

if (typeof window !== 'undefined') {
  // Client-side: Use singleton pattern
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('🔥 Firebase initialized (client-side)');
  } else {
    app = getApp();
    console.log('🔥 Firebase app reused (client-side)');
  }
} else {
  // Server-side: Always create new instance (Next.js handles this)
  app = initializeApp(firebaseConfig);
  console.log('🔥 Firebase initialized (server-side)');
}

// Export Firestore and Auth as constants (singleton instances)
// These are safe to use across the entire app
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

// Export app for advanced use cases
export { app };

// Debug: Make db available in window for browser console testing
if (typeof window !== 'undefined') {
  (window as any).db = db;
  console.log('🔧 db available in window.db for debugging');
}
