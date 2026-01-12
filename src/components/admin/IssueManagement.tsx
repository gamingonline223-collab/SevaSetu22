import React, { useEffect, useState } from 'react';
import { getAllIssues, updateIssueStatus, assignIssueToWorker } from '../../services/issues.service';
import { getAllWorkers } from '../../services/users.service';
import { Issue, Worker } from '../../types';
import { formatDateTime, getStatusColor, getPriorityColor } from '../../utils/helpers';
import './IssueManagement.css';

const IssueManagement: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedIssues, fetchedWorkers] = await Promise.all([
          getAllIssues(),
          getAllWorkers()
        ]);
        setIssues(fetchedIssues);
        setWorkers(fetchedWorkers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    try {
      await updateIssueStatus(issueId, newStatus);
      setIssues(prevIssues =>
        prevIssues.map(issue =>
          issue.id === issueId ? { ...issue, status: newStatus as Issue['status'] } : issue
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssignWorker = async (issueId: string, workerId: string) => {
    try {
      await assignIssueToWorker(issueId, workerId);
      setIssues(prevIssues =>
        prevIssues.map(issue =>
          issue.id === issueId ? { ...issue, assignedTo: workerId, status: 'in-progress' } : issue
        )
      );
    } catch (error) {
      console.error('Error assigning worker:', error);
    }
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === filter);

  if (loading) {
    return <div className="loading">Loading issues...</div>;
  }

  return (
    <div className="issue-management">
      <h1>Issue Management</h1>
      
      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({issues.length})
        </button>
        <button 
          className={filter === 'open' ? 'active' : ''} 
          onClick={() => setFilter('open')}
        >
          Open ({issues.filter(i => i.status === 'open').length})
        </button>
        <button 
          className={filter === 'in-progress' ? 'active' : ''} 
          onClick={() => setFilter('in-progress')}
        >
          In Progress ({issues.filter(i => i.status === 'in-progress').length})
        </button>
        <button 
          className={filter === 'resolved' ? 'active' : ''} 
          onClick={() => setFilter('resolved')}
        >
          Resolved ({issues.filter(i => i.status === 'resolved').length})
        </button>
      </div>

      <div className="issues-table-container">
        <table className="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reported By</th>
              <th>Created</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map(issue => (
              <tr key={issue.id} onClick={() => setSelectedIssue(issue)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="issue-title">{issue.title}</div>
                  <div className="issue-description">{issue.description}</div>
                </td>
                <td>
                  <span className="category-badge">{issue.category}</span>
                </td>
                <td>
                  <span 
                    className="priority-badge" 
                    style={{ backgroundColor: getPriorityColor(issue.priority) }}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>{issue.reportedBy.email}</td>
                <td>{formatDateTime(issue.createdAt)}</td>
                <td>
                  <select
                    value={issue.assignedTo || ''}
                    onChange={(e) => handleAssignWorker(issue.id, e.target.value)}
                    className="worker-select"
                  >
                    <option value="">Unassigned</option>
                    {workers.map(worker => (
                      <option key={worker.uid} value={worker.uid}>
                        {worker.name || worker.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="action-buttons">
                    {issue.status !== 'resolved' && (
                      <button 
                        onClick={() => handleStatusChange(issue.id, 'resolved')}
                        className="btn-resolve"
                      >
                        Resolve
                      </button>
                    )}
                    {issue.status !== 'closed' && (
                      <button 
                        onClick={() => handleStatusChange(issue.id, 'closed')}
                        className="btn-close"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Issue Details</h2>
              <button className="close-modal" onClick={() => setSelectedIssue(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>{selectedIssue.title}</h3>
                <div className="badges">
                  <span className="category-badge">{selectedIssue.category}</span>
                  <span 
                    className="priority-badge" 
                    style={{ backgroundColor: getPriorityColor(selectedIssue.priority) }}
                  >
                    {selectedIssue.priority}
                  </span>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(selectedIssue.status) }}
                  >
                    {selectedIssue.status}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Description</h4>
                <p>{selectedIssue.description}</p>
              </div>

              {selectedIssue.address && (
                <div className="detail-section">
                  <h4>Location</h4>
                  <p>📍 {selectedIssue.address}</p>
                  {selectedIssue.coordinates && (
                    <p className="coordinates">
                      Lat: {selectedIssue.coordinates.latitude}, 
                      Long: {selectedIssue.coordinates.longitude}
                    </p>
                  )}
                </div>
              )}

              <div className="detail-section">
                <h4>Reporter Information</h4>
                <p><strong>Name:</strong> {selectedIssue.reportedBy.name || 'Not provided'}</p>
                <p><strong>Email:</strong> {selectedIssue.reportedBy.email}</p>
                <p><strong>User ID:</strong> {selectedIssue.reportedBy.userId}</p>
              </div>

              <div className="detail-section">
                <h4>Timeline</h4>
                <p><strong>Created:</strong> {formatDateTime(selectedIssue.createdAt)}</p>
                {selectedIssue.updatedAt && (
                  <p><strong>Last Updated:</strong> {formatDateTime(selectedIssue.updatedAt)}</p>
                )}
              </div>

              {selectedIssue.images && selectedIssue.images.length > 0 && (
                <div className="detail-section">
                  <h4>Images</h4>
                  <div className="image-grid">
                    {selectedIssue.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`Issue ${idx + 1}`} className="issue-image" />
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h4>Assignment</h4>
                {selectedIssue.assignedTo ? (
                  <p>
                    <strong>Assigned to:</strong> {
                      workers.find(w => w.uid === selectedIssue.assignedTo)?.name || 
                      workers.find(w => w.uid === selectedIssue.assignedTo)?.email || 
                      'Unknown Worker'
                    }
                  </p>
                ) : (
                  <p className="unassigned">Not assigned to any worker</p>
                )}
              </div>

              <div className="modal-actions">
                <select
                  value={selectedIssue.assignedTo || ''}
                  onChange={(e) => {
                    handleAssignWorker(selectedIssue.id, e.target.value);
                    setSelectedIssue({...selectedIssue, assignedTo: e.target.value});
                  }}
                  className="worker-select"
                >
                  <option value="">Assign Worker</option>
                  {workers.map(worker => (
                    <option key={worker.uid} value={worker.uid}>
                      {worker.name || worker.email}
                    </option>
                  ))}
                </select>
                
                {selectedIssue.status !== 'resolved' && (
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedIssue.id, 'resolved');
                      setSelectedIssue({...selectedIssue, status: 'resolved'});
                    }}
                    className="btn-resolve"
                  >
                    Mark as Resolved
                  </button>
                )}
                
                {selectedIssue.status !== 'closed' && (
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedIssue.id, 'closed');
                      setSelectedIssue(null);
                    }}
                    className="btn-close"
                  >
                    Close Issue
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

export default IssueManagement;