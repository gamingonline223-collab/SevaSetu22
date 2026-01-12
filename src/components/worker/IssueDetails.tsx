import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueById, updateIssueStatus } from '../../services/issues.service';
import { Issue } from '../../types';
import { formatDateTime, getStatusColor, getPriorityColor } from '../../utils/helpers';
import IssueMap from '../common/IssueMap';

const IssueDetails: React.FC = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      if (issueId) {
        try {
          const fetchedIssue = await getIssueById(issueId);
          setIssue(fetchedIssue);
        } catch (error) {
          console.error('Error fetching issue:', error);
        }
      }
      setLoading(false);
    };

    fetchIssue();
  }, [issueId]);

  const handleStatusChange = async (newStatus: string) => {
    if (issue) {
      try {
        await updateIssueStatus(issue.id, newStatus);
        setIssue({ ...issue, status: newStatus as Issue['status'] });
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading issue details...</div>;
  }

  if (!issue) {
    return <div style={{ padding: '2rem' }}>Issue not found</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Issue Details</h2>
      
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>{issue.title}</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            backgroundColor: getStatusColor(issue.status),
            color: 'white'
          }}>
            {issue.status}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            backgroundColor: getPriorityColor(issue.priority),
            color: 'white'
          }}>
            {issue.priority}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            backgroundColor: '#6b7280',
            color: 'white',
            textTransform: 'capitalize'
          }}>
            {issue.category}
          </span>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Description:</strong>
          <p>{issue.description}</p>
        </div>
        
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Reported By:</strong> {issue.reportedBy.email}
        </div>
        
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Created:</strong> {formatDateTime(issue.createdAt)}
        </div>
        
        {issue.address && (
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Location:</strong> {issue.address}
          </div>
        )}
        
        {issue.coordinates && (
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Coordinates:</strong> {issue.coordinates.latitude.toFixed(6)}, {issue.coordinates.longitude.toFixed(6)}
          </div>
        )}
        
        {/* Google Maps showing issue location */}
        {issue.coordinates && (
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.75rem' }}>Issue Location on Map</h4>
            <IssueMap issue={issue} height="350px" zoom={15} />
          </div>
        )}
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {issue.status !== 'in-progress' && issue.status !== 'resolved' && issue.status !== 'closed' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Start Working
            </button>
          )}
          {issue.status === 'in-progress' && (
            <button
              onClick={() => handleStatusChange('resolved')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
               Issue Fixed
            </button>
          )}
          {issue.status === 'resolved' && (
            <div style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#d1fae5', 
              color: '#065f46', 
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '1rem'
            }}>
              ✓ Issue Marked as Fixed
            </div>
          )}
          {issue.status === 'closed' && (
            <div style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#e0e7ff', 
              color: '#3730a3', 
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '1rem'
            }}>
              ✓ Issue Closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;