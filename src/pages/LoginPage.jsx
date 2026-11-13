import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Очищаємо помилку при зміні полів
    if (error) clearError();
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) errors.email = 'Email обов\'язковий';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Некоректний email';
    if (!password) errors.password = 'Пароль обов\'язковий';
    
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      await login(email, password);
    }
  };

  return (
    <div className="page-container">
      <div className="login-wrapper">
        <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '30px' }}>ВХІД</h1>
        
        {error && <div className="status-msg status-msg--error" style={{ marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="lab-card" style={{ padding: '30px' }}>
          <div className="form-field">
            <label>Email (admin@test.com / user@test.com)</label>
            <input 
              type="email" 
              className={`lab-input ${validationErrors.email ? 'input-error' : ''}`}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              disabled={loading}
            />
            {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
          </div>

          <div className="form-field">
            <label>Пароль (admin / user)</label>
            <input 
              type="password" 
              className={`lab-input ${validationErrors.password ? 'input-error' : ''}`}
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              disabled={loading}
            />
            {validationErrors.password && <span className="error-text">{validationErrors.password}</span>}
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
}
