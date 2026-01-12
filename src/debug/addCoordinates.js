// Test script to check and add coordinates to issues
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const checkAndAddCoordinates = async () => {
  try {
    console.log('Fetching all issues...');
    const issuesSnapshot = await getDocs(collection(db, 'issues'));
    
    console.log(`Found ${issuesSnapshot.docs.length} issues`);
    
    issuesSnapshot.docs.forEach(async (issueDoc) => {
      const issueData = issueDoc.data();
      console.log(`\nIssue: ${issueDoc.id}`);
      console.log(`Title: ${issueData.title}`);
      console.log(`Has coordinates: ${!!issueData.coordinates}`);
      
      if (issueData.coordinates) {
        console.log(`  Lat: ${issueData.coordinates.latitude}, Lng: ${issueData.coordinates.longitude}`);
      } else {
        console.log('  ❌ No coordinates found!');
        
        // Add sample coordinates (Delhi area with some random offset)
        const sampleCoordinates = {
          latitude: 28.7041 + (Math.random() - 0.5) * 0.1,
          longitude: 77.1025 + (Math.random() - 0.5) * 0.1
        };
        
        console.log(`  Adding sample coordinates: Lat ${sampleCoordinates.latitude}, Lng ${sampleCoordinates.longitude}`);
        
        await updateDoc(doc(db, 'issues', issueDoc.id), {
          coordinates: sampleCoordinates,
          address: issueData.address || `Sample Address for ${issueData.title}`
        });
        
        console.log('  ✅ Coordinates added!');
      }
    });
    
    console.log('\n✅ Done checking all issues!');
    console.log('Refresh your browser to see the markers on the map.');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

checkAndAddCoordinates();
