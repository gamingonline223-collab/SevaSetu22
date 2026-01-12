import React, { useEffect, useState } from 'react';
import { getAllIssues } from '../../services/issues.service';
import { getAllWorkers } from '../../services/users.service';
import { Issue, Worker } from '../../types';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [issuesData, workersData] = await Promise.all([
          getAllIssues(),
          getAllWorkers()
        ]);
        setIssues(issuesData);
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const pendingIssues = issues.filter(i => i.status === 'open');
  const urgentCount = issues.filter(i => i.priority === 'urgent').length;
  const mediumCount = issues.filter(i => i.priority === 'medium').length;
  const lowCount = issues.filter(i => i.priority === 'low').length;

  const issuesByCategory = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const freeWorkers = workers.filter(w => !w.assignedIssues || w.assignedIssues.length === 0).length;
  const onSiteWorkers = workers.filter(w => w.assignedIssues && w.assignedIssues.length > 0).length;
  const onBreakWorkers = 2; // Mock data

  return (
    <div className="modern-dashboard">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="workers-section">
          <div className="section-header">
            <h3>Available Workers</h3>
          </div>
          <p className="workers-total">Total: {workers.length} Workers Online</p>
          
          <div className="worker-status">
            <div className="status-item">
              <span className="status-icon free">✓</span>
              <span>Free</span>
              <span className="count">{freeWorkers}</span>
            </div>
            <div className="status-item">
              <span className="status-icon onsite">👤</span>
              <span>On-site</span>
              <span className="count">{onSiteWorkers}</span>
            </div>
            <div className="status-item">
              <span className="status-icon break">⏰</span>
              <span>On Break</span>
              <span className="count">{onBreakWorkers}</span>
            </div>
          </div>

          <button className="view-all-btn">
            👥 View All Workers ({workers.length})
          </button>
        </div>

        <div className="department-section">
          <h4>Department-wise</h4>
          {Object.entries(issuesByCategory).map(([dept, count]) => (
            <div key={dept} className="dept-item">
              <span className="dept-name">{dept.charAt(0).toUpperCase() + dept.slice(1)}</span>
              <span className="dept-count">{count}</span>
              <span className="dept-icon">✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="issues-header">
          <h2>
            <span className="alert-icon">!</span>
            New Issues <span className="pending-count">({pendingIssues.length} Pending)</span>
          </h2>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, description, location, reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-icon">🔍</button>
        </div>

        <div className="action-buttons">
          <button className="action-btn">☰ Filter</button>
          <button className="action-btn">⇅ Sort</button>
          <button className="action-btn">↻ Refresh</button>
        </div>

        <div className="issues-list">
          {pendingIssues.slice(0, 5).map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-image">
                <div className="placeholder">📷</div>
                <div className="image-count">1/1</div>
              </div>
              <div className="issue-details">
                <div className="issue-header-row">
                  <h3>{issue.title}</h3>
                  <span className={`priority-badge ${issue.priority}`}>
                    {issue.priority === 'urgent' && '!'} {issue.priority}
                  </span>
                </div>
                <div className="issue-location">
                  {issue.coordinates ? (
                    <a 
                      href={`https://www.google.com/maps?q=${issue.coordinates.latitude},${issue.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'none' }}
                    >
                      📍 View on Google Maps
                    </a>
                  ) : (
                    <span>📍 {issue.address || 'Location not specified'}</span>
                  )}
                </div>
                <p className="issue-description">{issue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="status-section">
          <h3>Issue Status</h3>
          <div className="status-list">
            <div className="status-row">
              <span className="status-label">📋 Pending</span>
              <span className="status-value">{pendingIssues.length}</span>
            </div>
            <div className="status-row urgent">
              <span className="status-label">! Urgent</span>
              <span className="status-value">{urgentCount}</span>
            </div>
            <div className="status-row">
              <span className="status-label">ℹ Medium</span>
              <span className="status-value">{mediumCount}</span>
            </div>
            <div className="status-row">
              <span className="status-label">✓ Low</span>
              <span className="status-value">{lowCount}</span>
            </div>
          </div>
          <div className="total-issues">Total: {issues.length} Issues</div>
        </div>

        <div className="dept-issues-section">
          <h3>Department-wise Issues</h3>
          {Object.entries(issuesByCategory).map(([dept, count]) => (
            <div key={dept} className="dept-bar">
              <div className="dept-label">
                <span className="dept-icon">💡</span>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </div>
              <div className="bar-container">
                <div className="bar" style={{ width: `${(count / issues.length) * 100}%` }}></div>
              </div>
              <span className="dept-value">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;