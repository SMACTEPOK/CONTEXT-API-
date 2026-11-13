import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-header">
      <Link to="/" className="nav-brand">✱ CRAFTMARKET</Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Головна</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">Дашборд</Link>
            <Link to="/profile" className="nav-link">Профіль</Link>
            <div className="nav-user">
              <span className="nav-user__email">{user.email}</span>
              <button className="btn btn--small btn--danger" onClick={handleLogout}>Вийти</button>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn--small">Увійти</Link>
        )}
      </div>
    </nav>
  );
}
