import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { login as loginService, logout as logoutService, validateSession } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const isValid = validateSession();
        
        if (isValid) {
          const userData = localStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
        // Clear invalid session data
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error || 'Login failed' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  };
  
  const logout = () => {
    logoutService();
    setUser(null);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};