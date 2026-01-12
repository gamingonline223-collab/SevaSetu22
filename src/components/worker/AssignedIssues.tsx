import React, { useEffect, useState } from 'react';
import { getIssuesByWorker, updateIssueStatus } from '../../services/issues.service';
import { useAuth } from '../../hooks/useAuth';
import { Issue } from '../../types';
import { formatDateTime, getStatusColor, getPriorityColor } from '../../utils/helpers';

const AssignedIssues: React.FC = () => {
  const { user } = useAuth();
  const [assignedIssues, setAssignedIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchAssignedIssues = async () => {
      if (user) {
        try {
          const issues = await getIssuesByWorker(user.uid);
          setAssignedIssues(issues);
        } catch (error) {
          console.error('Error fetching assigned issues:', error);
        }
      }
      setLoading(false);
    };

    fetchAssignedIssues();
  }, [user]);

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    try {
      await updateIssueStatus(issueId, newStatus);
      setAssignedIssues(prevIssues =>
        prevIssues.map(issue =>
          issue.id === issueId ? { ...issue, status: newStatus as Issue['status'] } : issue
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Assigned Issues</h2>
      {assignedIssues.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No issues assigned to you.</p>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Priority</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Created</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedIssues.map(issue => (
                <tr key={issue.id} style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }} onClick={() => setSelectedIssue(issue)}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{issue.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{issue.description}</div>
                    {issue.coordinates && (
                      <a 
                        href={`https://www.google.com/maps?q=${issue.coordinates.latitude},${issue.coordinates.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none', marginTop: '0.25rem', display: 'inline-block' }}
                      >
                        📍 View Location
                      </a>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      background: '#6b7280',
                      color: 'white',
                      textTransform: 'capitalize'
                    }}>
                      {issue.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      backgroundColor: getPriorityColor(issue.priority),
                      color: 'white',
                      textTransform: 'capitalize'
                    }}>
                      {issue.priority}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      backgroundColor: getStatusColor(issue.status),
                      color: 'white',
                      textTransform: 'capitalize'
                    }}>
                      {issue.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{formatDateTime(issue.createdAt)}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {issue.status !== 'in-progress' && issue.status !== 'resolved' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(issue.id, 'in-progress'); }}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: '#8b5cf6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          Start
                        </button>
                      )}
                      {issue.status === 'in-progress' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(issue.id, 'resolved'); }}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setSelectedIssue(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>Issue Details</h2>
              <button
                onClick={() => setSelectedIssue(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: 0,
                  width: '32px',
                  height: '32px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', color: '#1f2937' }}>
                  {selectedIssue.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: '#6b7280',
                    color: 'white',
                    textTransform: 'uppercase'
                  }}>
                    {selectedIssue.category}
                  </span>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: getPriorityColor(selectedIssue.priority),
                    color: 'white',
                    textTransform: 'uppercase'
                  }}>
                    {selectedIssue.priority}
                  </span>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: getStatusColor(selectedIssue.status),
                    color: 'white',
                    textTransform: 'uppercase'
                  }}>
                    {selectedIssue.status}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#374151', fontWeight: 600 }}>
                  Description
                </h4>
                <p style={{ margin: '0.5rem 0', color: '#6b7280', lineHeight: 1.6 }}>{selectedIssue.description}</p>
              </div>

              {(selectedIssue.address || selectedIssue.coordinates) && (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#374151', fontWeight: 600 }}>
                    Location
                  </h4>
                  {selectedIssue.address && (
                    <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>📍 {selectedIssue.address}</p>
                  )}
                  {selectedIssue.coordinates && (
                    <>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#9ca3af' }}>
                        Lat: {selectedIssue.coordinates.latitude}, Long: {selectedIssue.coordinates.longitude}
                      </p>
                      <a 
                        href={`https://www.google.com/maps?q=${selectedIssue.coordinates.latitude},${selectedIssue.coordinates.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          marginTop: '0.5rem',
                          padding: '0.5rem 1rem',
                          background: '#3b82f6',
                          color: 'white',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}
                      >
                        Open in Google Maps
                      </a>
                    </>
                  )}
                </div>
              )}

              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#374151', fontWeight: 600 }}>
                  Reporter Information
                </h4>
                <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                  <strong>Name:</strong> {selectedIssue.reportedBy.name || 'Not provided'}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                  <strong>Email:</strong> {selectedIssue.reportedBy.email}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#374151', fontWeight: 600 }}>
                  Timeline
                </h4>
                <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                  <strong>Created:</strong> {formatDateTime(selectedIssue.createdAt)}
                </p>
                {selectedIssue.updatedAt && (
                  <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                    <strong>Last Updated:</strong> {formatDateTime(selectedIssue.updatedAt)}
                  </p>
                )}
              </div>

              {selectedIssue.images && selectedIssue.images.length > 0 && (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#374151', fontWeight: 600 }}>
                    Images
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    {selectedIssue.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Issue ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                {selectedIssue.status !== 'in-progress' && selectedIssue.status !== 'resolved' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedIssue.id, 'in-progress');
                      setSelectedIssue({...selectedIssue, status: 'in-progress'});
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    Start Working
                  </button>
                )}
                {selectedIssue.status === 'in-progress' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedIssue.id, 'resolved');
                      setSelectedIssue({...selectedIssue, status: 'resolved'});
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;