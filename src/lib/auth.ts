import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function isAdminEmail(email: string): Promise<boolean> {
  const q = query(collection(db, 'admins'), where('email', '==', email));
  const snap = await getDocs(q);
  return !snap.empty;
}
