import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, Worker } from '../types';

export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const usersQuery = query(collection(db, 'users'));
    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as UserProfile));
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error(error.message);
  }
};

export const getAllWorkers = async (): Promise<Worker[]> => {
  try {
    const workersQuery = query(collection(db, 'workers'));
    const snapshot = await getDocs(workersQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as Worker));
  } catch (error: any) {
    console.error('Error fetching workers:', error);
    throw new Error(error.message);
  }
};

export const getUserById = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { ...userDoc.data(), uid: userDoc.id } as UserProfile;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getWorkerById = async (uid: string): Promise<Worker | null> => {
  try {
    const workerDoc = await getDoc(doc(db, 'workers', uid));
    if (workerDoc.exists()) {
      return { ...workerDoc.data(), uid: workerDoc.id } as Worker;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching worker:', error);
    return null;
  }
};

export const updateUserRole = async (uid: string, role: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { role });
  } catch (error: any) {
    console.error('Error updating user role:', error);
    throw new Error(error.message);
  }
};

export const getWorkersByDepartment = async (department: string): Promise<Worker[]> => {
  try {
    const workersQuery = query(
      collection(db, 'workers'),
      where('department', '==', department)
    );
    const snapshot = await getDocs(workersQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as Worker));
  } catch (error: any) {
    console.error('Error fetching workers by department:', error);
    throw new Error(error.message);
  }
};