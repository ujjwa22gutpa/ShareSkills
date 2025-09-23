// /src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'zustand';
import './styles/index.css';
import App from './App';
import authService from './services/authService';

const queryClient = new QueryClient();

// Simple Zustand store for theme
export const useThemeStore = create((set) => ({
  dark: false,
  toggle: () => set((state) => ({ dark: !state.dark })),
}));

// Authentication store
export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  
  // Initialize auth state from token
  initAuth: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Verify token is still valid by attempting to get user info
      // For now, we'll just check if token exists
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.email) {
        // Ensure user data has name property for navbar compatibility
        const formattedUser = {
          ...userData,
          name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
        };
        
        // Update localStorage with formatted data if needed
        if (!userData.name && userData.firstName && userData.lastName) {
          localStorage.setItem('userData', JSON.stringify(formattedUser));
        }
        
        set({ 
          isAuthenticated: true, 
          user: formattedUser 
        });
      } else {
        // Clear invalid token
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  },
  
  // Register function
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.register(userData);
      const { user, accessToken } = response.data; // Backend returns data in response.data from authService
      
      // Format user data for consistent use across app
      const formattedUser = {
        ...user,
        name: `${user.firstName} ${user.lastName}` // Add name property for navbar
      };
      
      // Store token and user data (using accessToken from backend)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(formattedUser));
      
      set({ 
        isAuthenticated: true, 
        user: formattedUser,
        loading: false,
        error: null
      });
      
      return { success: true, user: formattedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ 
        loading: false, 
        error: errorMessage,
        isAuthenticated: false,
        user: null
      });
      return { success: false, error: errorMessage };
    }
  },
  
  // Login function
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(credentials);
      const { user, accessToken } = response.data; // Backend returns data in response.data from authService
      
      // Format user data for consistent use across app
      const formattedUser = {
        ...user,
        name: `${user.firstName} ${user.lastName}` // Add name property for navbar
      };
      
      // Store token and user data (using accessToken from backend)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(formattedUser));
      
      set({ 
        isAuthenticated: true, 
        user: formattedUser,
        loading: false,
        error: null
      });
      
      return { success: true, user: formattedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ 
        loading: false, 
        error: errorMessage,
        isAuthenticated: false,
        user: null
      });
      return { success: false, error: errorMessage };
    }
  },
  
  // Logout function
  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.warn('Logout request failed, but clearing local state');
    } finally {
      // Always clear local state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      set({ 
        isAuthenticated: false, 
        user: null,
        loading: false,
        error: null
      });
    }
  },
  
  // Forgot password function
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.forgotPassword({ email });
      set({ loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
  
  // Verify password reset OTP
  verifyResetOTP: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.verifyResetOTP({ email, otp });
      set({ loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
  
  // Reset password
  resetPassword: async (email, otp, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.resetPassword({ email, otp, newPassword });
      set({ loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
  
  // Clear error
  clearError: () => set({ error: null })
}));

function ThemeProvider({ children }) {
  const dark = useThemeStore((s) => s.dark);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return children;
}

function AuthProvider({ children }) {
  const initAuth = useAuthStore((s) => s.initAuth);
  React.useEffect(() => {
    initAuth();
  }, [initAuth]);
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
