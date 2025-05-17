import { apiRequest } from '../utils/api';
import { LoginCredentials, User, ApiResponse } from '../types';

// Mock function to simulate API call for login
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<User>> => {
  try {
    // In a real app, this would make an actual API call
    // For this example, we'll mock a successful response for demo credentials
    if (credentials.email === 'hdfc@abcd.com' && credentials.password === 'Exrgo@12345') {
      // Mock database ID for the user
      return {
        success: true,
        data: {
          id: 1,
          email: credentials.email,
        },
      };
    }
    
    // Return error for invalid credentials
    return {
      success: false,
      error: 'Invalid email or password',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during login',
    };
  }
};

/**
 * In a real application, this would validate a token with the backend
 * For this example, we'll just check if user data exists in localStorage
 */
export const validateSession = (): boolean => {
  const userData = localStorage.getItem('user');
  return !!userData;
};

/**
 * Clear authentication data from localStorage
 */
export const logout = (): void => {
  localStorage.removeItem('user');
};