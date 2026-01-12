import React, { useEffect, useState } from 'react';
import { getAllIssues } from '../../services/issues.service';
import { calculateAnalytics } from '../../utils/helpers';
import { Analytics as AnalyticsType } from '../../types';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../hooks/useAuth';

const Analytics: React.FC = () => {
  const { userProfile } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const issues = await getAllIssues();
        const stats = calculateAnalytics(issues);
        setAnalytics(stats);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const FIXED_PASSCODE = "SevaSetu-Admin-Pass";
  const qrData = {
    passcode: FIXED_PASSCODE,
    wardNumber: `Ward-${userProfile?.ward || 0}`
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading analytics...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Analytics Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Detailed statistics and insights</p>

      {/* QR Code Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Citizen Login QR Code</h3>
        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
          Scan this QR code with the mobile app to log in as a citizen for Ward {userProfile?.ward}
        </p>
        <div style={{
          display: 'inline-block',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          border: '2px solid #e0e0e0'
        }}>
          <QRCodeSVG 
            value={JSON.stringify(qrData)}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
          <p><strong>Ward:</strong> Ward-{userProfile?.ward}</p>
          <p><strong>Passcode:</strong> SevaSetu-Admin-Pass</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>TOTAL ISSUES</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{analytics?.totalIssues || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>OPEN</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{analytics?.openIssues || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>IN PROGRESS</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{analytics?.inProgressIssues || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>RESOLVED</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{analytics?.resolvedIssues || 0}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Issues by Category</h3>
          {analytics && Object.entries(analytics.issuesByCategory).map(([category, count]) => (
            <div key={category} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f9fafb', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <span style={{ textTransform: 'capitalize' }}>{category}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Issues by Priority</h3>
          {analytics && Object.entries(analytics.issuesByPriority).map(([priority, count]) => (
            <div key={priority} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f9fafb', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <span style={{ textTransform: 'capitalize' }}>{priority}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;