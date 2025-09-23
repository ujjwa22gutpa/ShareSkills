// /src/services/api.js
/**
 * Axios API wrapper for College Marketplace backend
 * Handles authentication and API requests
 */
import axios from 'axios';

// Create axios instance with backend configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend server URL
  timeout: 10000, // Increased timeout for real API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      // Redirect to login (optional - can be handled in components)
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Mocked endpoints (keeping existing functionality)
export const getBooks = async () => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: 1, title: 'Intro to Algorithms', price: 20 },
    { id: 2, title: 'React for Beginners', price: 15 },
  ];
};

export const getSkills = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: 1, name: 'Guitar Lessons', price: 10 },
    { id: 2, name: 'Math Tutoring', price: 12 },
  ];
};

export default api;
