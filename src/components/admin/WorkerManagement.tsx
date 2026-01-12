import React, { useEffect, useState } from 'react';
import { getAllWorkers } from '../../services/users.service';
import { Worker } from '../../types';

const WorkerManagement: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersData = await getAllWorkers();
        setWorkers(workersData);
      } catch (err) {
        console.error('Failed to fetch workers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading workers...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Worker Management</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Total Workers: {workers.length}
      </p>
      
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Department</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Specialization</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Completed</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => (
              <tr key={worker.uid} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>{worker.name || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{worker.email}</td>
                <td style={{ padding: '1rem' }}>{worker.department || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{worker.specialization || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{worker.completedIssues || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerManagement;