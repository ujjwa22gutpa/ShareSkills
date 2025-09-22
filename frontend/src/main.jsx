// /src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'zustand';
import './styles/index.css';
import App from './App';

const queryClient = new QueryClient();

// Simple Zustand store for theme
export const useThemeStore = create((set) => ({
  dark: false,
  toggle: () => set((state) => ({ dark: !state.dark })),
}));

// Authentication store
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  
  // Initialize auth state from localStorage
  initAuth: () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userName = localStorage.getItem('userName');
    if (isAuthenticated && userName) {
      set({ 
        isAuthenticated: true, 
        user: { name: userName } 
      });
    }
  },
  
  // Login function
  login: (userData) => {
    set({ 
      isAuthenticated: true, 
      user: userData 
    });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', userData.name);
  },
  
  // Logout function
  logout: () => {
    set({ 
      isAuthenticated: false, 
      user: null 
    });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
  }
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
