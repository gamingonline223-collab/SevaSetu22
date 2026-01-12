import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Issue } from '../../types';

const AddCoordinatesHelper: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'issues'));
      const issuesList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Issue));
      setIssues(issuesList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setLoading(false);
    }
  };

  const addSampleCoordinates = async (issueId: string) => {
    setUpdating(issueId);
    try {
      // Add random coordinates around Delhi area
      const sampleCoordinates = {
        latitude: 28.7041 + (Math.random() - 0.5) * 0.1,
        longitude: 77.1025 + (Math.random() - 0.5) * 0.1
      };

      await updateDoc(doc(db, 'issues', issueId), {
        coordinates: sampleCoordinates
      });

      alert(`Coordinates added!\nLat: ${sampleCoordinates.latitude.toFixed(6)}\nLng: ${sampleCoordinates.longitude.toFixed(6)}`);
      fetchIssues(); // Refresh the list
    } catch (error) {
      console.error('Error adding coordinates:', error);
      alert('Error adding coordinates');
    }
    setUpdating(null);
  };

  const addCoordinatesManually = async (issueId: string) => {
    const lat = prompt('Enter Latitude (e.g., 28.7041):');
    const lng = prompt('Enter Longitude (e.g., 77.1025):');

    if (lat && lng) {
      setUpdating(issueId);
      try {
        await updateDoc(doc(db, 'issues', issueId), {
          coordinates: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
          }
        });
        alert('Coordinates added successfully!');
        fetchIssues();
      } catch (error) {
        console.error('Error adding coordinates:', error);
        alert('Error adding coordinates');
      }
      setUpdating(null);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading issues...</div>;
  }

  const issuesWithoutCoords = issues.filter(i => !i.coordinates);
  const issuesWithCoords = issues.filter(i => i.coordinates);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Coordinates to Issues</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#eff6ff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Summary</h3>
        <p style={{ margin: 0 }}>
          ✅ {issuesWithCoords.length} issues with coordinates<br />
          ❌ {issuesWithoutCoords.length} issues without coordinates
        </p>
      </div>

      {issuesWithoutCoords.length > 0 && (
        <>
          <h2>Issues Without Coordinates</h2>
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem' }}>
            {issuesWithoutCoords.map(issue => (
              <div key={issue.id} style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{issue.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                    {issue.category} • {issue.priority}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => addSampleCoordinates(issue.id)}
                    disabled={updating === issue.id}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: updating === issue.id ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {updating === issue.id ? 'Adding...' : 'Add Random'}
                  </button>
                  <button
                    onClick={() => addCoordinatesManually(issue.id)}
                    disabled={updating === issue.id}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: updating === issue.id ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Add Manual
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {issuesWithCoords.length > 0 && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Issues With Coordinates</h2>
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem' }}>
            {issuesWithCoords.map(issue => (
              <div key={issue.id} style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{issue.title}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  📍 {issue.coordinates?.latitude.toFixed(6)}, {issue.coordinates?.longitude.toFixed(6)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddCoordinatesHelper;
