import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  Query,
  DocumentData
} from 'firebase/firestore';

interface UseFirestoreResult<T> {
  documents: T[];
  loading: boolean;
  error: Error | null;
  addDocument: (data: Partial<T>) => Promise<void>;
  updateDocument: (id: string, data: Partial<T>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useFirestore = <T extends { id?: string }>(
  collectionName: string,
  firestoreQuery?: Query<DocumentData>
): UseFirestoreResult<T> => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const q = firestoreQuery || query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as T));
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [collectionName]);

  const addDocument = async (data: Partial<T>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data as any);
      setDocuments(prev => [...prev, { id: docRef.id, ...data } as T]);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateDocument = async (id: string, data: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data as any);
      setDocuments(prev => 
        prev.map(doc => (doc.id === id ? { ...doc, ...data } : doc))
      );
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { 
    documents, 
    loading, 
    error, 
    addDocument, 
    updateDocument, 
    deleteDocument,
    refresh: fetchDocuments
  };
};

export default useFirestore;