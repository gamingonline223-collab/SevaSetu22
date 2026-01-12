import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AdminLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar isAdmin={true} />
        <main style={{ flex: 1, minHeight: 'calc(100vh - 60px)', background: '#f3f4f6' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;