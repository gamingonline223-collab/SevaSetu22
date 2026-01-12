import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Issue } from '../types';

export const getAllIssues = async (): Promise<Issue[]> => {
  try {
    const issuesQuery = query(
      collection(db, 'issues'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(issuesQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Issue));
  } catch (error: any) {
    console.error('Error fetching issues:', error);
    throw new Error(error.message);
  }
};

export const getIssueById = async (id: string): Promise<Issue | null> => {
  try {
    const docRef = doc(db, 'issues', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Issue;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching issue:', error);
    return null;
  }
};

export const getIssuesByWorker = async (workerId: string): Promise<Issue[]> => {
  try {
    const issuesQuery = query(
      collection(db, 'issues'),
      where('assignedTo', '==', workerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(issuesQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Issue));
  } catch (error: any) {
    console.error('Error fetching worker issues:', error);
    throw new Error(error.message);
  }
};

export const updateIssueStatus = async (
  issueId: string, 
  status: string, 
  updates?: Partial<Issue>
): Promise<void> => {
  try {
    const issueRef = doc(db, 'issues', issueId);
    await updateDoc(issueRef, {
      status,
      updatedAt: new Date().toISOString(),
      ...updates
    });
  } catch (error: any) {
    console.error('Error updating issue:', error);
    throw new Error(error.message);
  }
};

export const assignIssueToWorker = async (
  issueId: string, 
  workerId: string
): Promise<void> => {
  try {
    const issueRef = doc(db, 'issues', issueId);
    await updateDoc(issueRef, {
      assignedTo: workerId,
      status: 'in-progress',
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error assigning issue:', error);
    throw new Error(error.message);
  }
};

export const getIssuesByStatus = async (status: string): Promise<Issue[]> => {
  try {
    const issuesQuery = query(
      collection(db, 'issues'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(issuesQuery);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Issue));
  } catch (error: any) {
    console.error('Error fetching issues by status:', error);
    throw new Error(error.message);
  }
};