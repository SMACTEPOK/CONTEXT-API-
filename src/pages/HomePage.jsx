import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="page-container">
      <h1 className="page-title">Ласкаво просимо</h1>
      <div className="lab-card">
        <h2 className="lab-card__title">Головна сторінка</h2>
        <p>Ця сторінка доступна всім користувачам.</p>
        {isAuthenticated ? (
          <p style={{ color: 'var(--color-success)' }}>Ви увійшли як <b>{user.name}</b> (Роль: {user.role})</p>
        ) : (
          <p style={{ color: 'var(--color-muted)' }}>Ви не авторизовані. Увійдіть, щоб отримати доступ до Дашборду.</p>
        )}
      </div>
    </div>
  );
}
