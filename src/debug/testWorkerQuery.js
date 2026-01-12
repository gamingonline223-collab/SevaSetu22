// Debug script to test Firestore queries
// Run this in browser console after logging in as a worker

import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';

async function testWorkerQuery(workerId) {
  console.log('Testing worker query for UID:', workerId);
  
  try {
    // Test 1: Simple query without orderBy
    console.log('\n=== Test 1: Query without orderBy ===');
    const simpleQuery = query(
      collection(db, 'issues'),
      where('assignedTo', '==', workerId)
    );
    const simpleSnapshot = await getDocs(simpleQuery);
    console.log('Found issues (no orderBy):', simpleSnapshot.size);
    simpleSnapshot.docs.forEach(doc => {
      console.log('- Issue:', doc.id, doc.data().title);
    });
    
    // Test 2: Query with orderBy (requires index)
    console.log('\n=== Test 2: Query with orderBy (needs index) ===');
    const indexedQuery = query(
      collection(db, 'issues'),
      where('assignedTo', '==', workerId),
      orderBy('createdAt', 'desc')
    );
    const indexedSnapshot = await getDocs(indexedQuery);
    console.log('Found issues (with orderBy):', indexedSnapshot.size);
    indexedSnapshot.docs.forEach(doc => {
      console.log('- Issue:', doc.id, doc.data().title);
    });
    
    console.log('\n✅ Both queries work! Indexes are ready.');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('index')) {
      console.log('\n⏳ The Firestore index is still building.');
      console.log('Check your email or Firebase Console for index status.');
      console.log('Firebase Console: https://console.firebase.google.com/project/seva-setu1/firestore/indexes');
    }
  }
}

// To use: Copy worker UID from Firebase Console and run:
// testWorkerQuery('WORKER_UID_HERE');

export { testWorkerQuery };
