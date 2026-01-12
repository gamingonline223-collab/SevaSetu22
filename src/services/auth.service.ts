import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from '../types';

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    // Check ward-admin collection
    const adminDoc = await getDoc(doc(db, 'ward-admin', uid));
    if (adminDoc.exists()) {
      return adminDoc.data() as UserProfile;
    }
    
    // Check workers collection
    const workerDoc = await getDoc(doc(db, 'workers', uid));
    if (workerDoc.exists()) {
      return workerDoc.data() as UserProfile;
    }
    
    // Check users collection (legacy)
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};