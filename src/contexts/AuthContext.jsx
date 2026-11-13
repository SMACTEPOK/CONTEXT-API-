import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { mockLogin, mockVerifyToken, mockUpdateProfile } from '../api/mockApi';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userData = await mockVerifyToken(token);
          setUser(userData);
        } catch (err) {
          localStorage.removeItem('authToken');
          setError('Сесія закінчилася. Увійдіть знову.');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user: userData } = await mockLogin(email, password);
      localStorage.setItem('authToken', token);
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  };

  const updateProfile = async (data) => {
    try {
      const updatedUser = await mockUpdateProfile(user.id, { ...user, ...data });
      setUser(updatedUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, updateProfile, clearError, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
