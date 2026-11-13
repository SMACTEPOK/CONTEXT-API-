import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="page-container">
      <h1 className="page-title">Дашборд</h1>
      <div className="lab-card">
        <h2 className="lab-card__title">Захищена сторінка</h2>
        <p>Ця сторінка доступна лише авторизованим користувачам.</p>
        <div style={{ marginTop: '20px', padding: '20px', border: '2px dashed var(--color-border)', background: 'var(--color-background)' }}>
          <h3 style={{ margin: '0 0 10px', color: 'var(--color-white)' }}>Дані користувача з Context API:</h3>
          <p style={{ margin: '4px 0' }}>ID: {user.id}</p>
          <p style={{ margin: '4px 0' }}>Ім'я: {user.name}</p>
          <p style={{ margin: '4px 0' }}>Email: {user.email}</p>
          <p style={{ margin: '4px 0' }}>Роль: <span style={{ color: 'var(--color-success)' }}>{user.role}</span></p>
        </div>
      </div>
    </div>
  );
}
