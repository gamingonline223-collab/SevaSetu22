import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import WorkerLayout from './pages/WorkerLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import IssueManagement from './components/admin/IssueManagement';
import UserManagement from './components/admin/UserManagement';
import WorkerManagement from './components/admin/WorkerManagement';
import Analytics from './components/admin/Analytics';
import AddCoordinatesHelper from './components/admin/AddCoordinatesHelper';
import WorkerDashboard from './components/worker/WorkerDashboard';
import AssignedIssues from './components/worker/AssignedIssues';
import IssueDetails from './components/worker/IssueDetails';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="issues" element={<IssueManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="workers" element={<WorkerManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="add-coordinates" element={<AddCoordinatesHelper />} />
          </Route>

          {/* Worker Routes */}
          <Route
            path="/worker"
            element={
              <ProtectedRoute requiredRole="worker">
                <WorkerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkerDashboard />} />
            <Route path="assigned-issues" element={<AssignedIssues />} />
            <Route path="issue/:issueId" element={<IssueDetails />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;