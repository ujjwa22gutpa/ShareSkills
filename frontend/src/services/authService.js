// /src/services/authService.js
/**
 * Authentication service for handling all auth-related API calls
 * Connects to the backend authentication endpoints
 */
import api from './api';

/**
 * Authentication API endpoints
 */
export const authService = {
  
  /**
   * Register a new user and auto-login
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name  
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} User data and tokens
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store tokens and user data
      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, user } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Login user with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} User data and tokens
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store tokens and user data
      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, user } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user and clear all stored data
   * @returns {Promise<Object>} Logout confirmation
   */
  logout: async () => {
    try {
      // Call backend logout endpoint
      const response = await api.post('/auth/logout');
      
      // Clear all stored data regardless of backend response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      return response.data;
    } catch (error) {
      // Clear data even if backend call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      throw error.response?.data || error;
    }
  },

  /**
   * Request password reset OTP
   * @param {string} email - User's email
   * @returns {Promise<Object>} Reset request confirmation
   */
  forgotPassword: async (email) => {
    try {
      console.log('🌐 AuthService: Making API call to /auth/forgot-password with payload:', { email });
      
      const response = await api.post('/auth/forgot-password', { email });
      
      console.log('🌐 AuthService: API response received:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('🌐 AuthService: API call failed:', error);
      console.error('🌐 AuthService: Error details:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Verify password reset OTP
   * @param {Object} otpData - OTP verification data
   * @param {string} otpData.email - User's email
   * @param {string} otpData.otp - 6-digit OTP
   * @returns {Promise<Object>} OTP verification confirmation
   */
  verifyResetOTP: async (otpData) => {
    try {
      const response = await api.post('/auth/verify-password-reset-otp', otpData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Reset password with verified OTP
   * @param {Object} resetData - Password reset data
   * @param {string} resetData.email - User's email
   * @param {string} resetData.otp - Verified OTP
   * @param {string} resetData.password - New password
   * @returns {Promise<Object>} Reset confirmation and auto-login
   */
  resetPassword: async (resetData) => {
    try {
      console.log('🌐 AuthService: Making API call to /auth/reset-password with payload:', resetData);
      
      const response = await api.post('/auth/reset-password', resetData);
      
      console.log('🌐 AuthService: Reset password API response received:', response.data);
      
      // Store tokens from auto-login after password reset
      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, user } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get current user data from localStorage
   * @returns {Object|null} User data or null if not authenticated
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    const isAuth = localStorage.getItem('isAuthenticated');
    return !!(token && isAuth === 'true');
  },

  /**
   * Get stored access token
   * @returns {string|null} Access token or null
   */
  getToken: () => {
    return localStorage.getItem('accessToken');
  }
};

export default authService;