import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  useEffect(() => {
    if (auth.token) {
      api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setAuth({ token: response.data.token, isAuthenticated: true });
    localStorage.setItem('token', response.data.token);
  };

  const register = async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    setAuth({ token: response.data.token, isAuthenticated: true });
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setAuth({ token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
