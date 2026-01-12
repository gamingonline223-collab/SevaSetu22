import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Dashboard</h1>
        
        {user && (
          <div className="header-right">
            <span className="user-info">
              {userProfile?.email} ({userProfile?.role})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;