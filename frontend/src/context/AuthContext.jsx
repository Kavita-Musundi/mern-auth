import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';

  // Function to get token from storage
  const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Set auth header for all requests
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthHeader(token);
        const response = await axios.get('/api/auth/me');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setAuthHeader(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('/api/auth/signup', userData);
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthHeader(token);
      setUser(response.data.user);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, rememberMe = false) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('/api/auth/login', userData);
      
      const token = response.data.token;
      
      // Store token based on remember me preference
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      setAuthHeader(token);
      setUser(response.data.user);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setAuthHeader(null);
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.put('/api/auth/profile', userData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signup,
      login,
      logout,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};