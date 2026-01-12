import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Issue } from '../../types';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Set up real-time listener for assigned issues
    // Try with orderBy first, fall back to without if index not ready
    const issuesQueryWithOrder = query(
      collection(db, 'issues'),
      where('assignedTo', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const issuesQuerySimple = query(
      collection(db, 'issues'),
      where('assignedTo', '==', user.uid)
    );

    let currentQuery = issuesQueryWithOrder;
    let useSimpleQuery = false;

    const unsubscribe = onSnapshot(
      currentQuery,
      (snapshot) => {
        const assignedIssues = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as Issue[];
        
        // Sort manually if using simple query
        if (useSimpleQuery) {
          assignedIssues.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        
        setIssues(assignedIssues);
        setLoading(false);
        
        console.log(`Worker Dashboard: Found ${assignedIssues.length} assigned issues`);
      },
      (error) => {
        console.error('Error fetching assigned issues:', error);
        
        // If error is about missing index, try simple query
        if (error.message.includes('index') && !useSimpleQuery) {
          console.log('Index not ready, using simple query without orderBy...');
          useSimpleQuery = true;
          unsubscribe();
          // Retry with simple query
          return onSnapshot(issuesQuerySimple, 
            (snapshot) => {
              const assignedIssues = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
              })) as Issue[];
              
              // Sort manually
              assignedIssues.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              
              setIssues(assignedIssues);
              setLoading(false);
              
              console.log(`Worker Dashboard (simple query): Found ${assignedIssues.length} assigned issues`);
            },
            (err) => {
              console.error('Error with simple query:', err);
              setLoading(false);
            }
          );
        }
        
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  const openIssues = issues.filter(i => i.status === 'open').length;
  const inProgressIssues = issues.filter(i => i.status === 'in-progress').length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Worker Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Welcome, {userProfile?.name || userProfile?.email}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>TOTAL ASSIGNED</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{issues.length}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>OPEN</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{openIssues}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>IN PROGRESS</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{inProgressIssues}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>RESOLVED</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{resolvedIssues}</p>
        </div>
      </div>

      <h2>Recent Assigned Issues</h2>
      {issues.length === 0 ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <h3 style={{ color: '#64748b', marginTop: 0, marginBottom: '0.5rem' }}>No Issues Assigned Yet</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
            Your assigned work will appear here. Check back later or contact your admin.
          </p>
          <p style={{ color: '#cbd5e1', margin: '1rem 0 0', fontSize: '0.875rem' }}>
            Worker ID: {user?.uid}
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem' }}>
          {issues.slice(0, 10).map(issue => (
            <div 
              key={issue.id} 
              onClick={() => navigate(`/worker/issue/${issue.id}`)}
              style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{issue.title}</h3>
              <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>{issue.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'white',
                  backgroundColor: getStatusColor(issue.status)
                }}>
                  {issue.status}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'white',
                  backgroundColor: getPriorityColor(issue.priority)
                }}>
                  {issue.priority}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: '#f3f4f6',
                  color: '#374151'
                }}>
                  {issue.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;