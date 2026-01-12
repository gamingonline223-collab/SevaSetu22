import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        {isAdmin ? 'Admin Panel' : 'Worker Panel'}
      </h2>
      <nav className="sidebar-nav">
        <ul>
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/issues" className={({ isActive }) => isActive ? 'active' : ''}>
                  Issue Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
                  User Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/workers" className={({ isActive }) => isActive ? 'active' : ''}>
                  Worker Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
                  Analytics
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/worker" end className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/worker/assigned-issues" className={({ isActive }) => isActive ? 'active' : ''}>
                  Past Issues
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;