
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'observer' | 'demo';
  avatar?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isDemoMode: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [demoSessionTimeout, setDemoSessionTimeout] = useState<NodeJS.Timeout | null>(null);

  const isDemoMode = user?.isDemo || false;

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // If it's a demo user, check if session is still valid
        if (parsedUser.isDemo) {
          const demoLoginTime = localStorage.getItem('demoLoginTime');
          if (demoLoginTime) {
            const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
            const timeElapsed = Date.now() - parseInt(demoLoginTime);
            
            if (timeElapsed >= thirtyMinutes) {
              // Demo session expired
              logout();
            } else {
              // Set timeout for remaining time
              const remainingTime = thirtyMinutes - timeElapsed;
              startDemoSessionTimeout(remainingTime);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
    
    setIsLoading(false);
  }, []);

  const startDemoSessionTimeout = (duration: number) => {
    if (demoSessionTimeout) {
      clearTimeout(demoSessionTimeout);
    }
    
    const timeout = setTimeout(() => {
      logout();
      // Show notification about demo session expiry
    }, duration);
    
    setDemoSessionTimeout(timeout);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.login({ email, password });
      const { user: userData, token } = response;
      
      setUser(userData);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    try {
      // For demo mode, we can either call the backend or use local demo data
      const demoUser: User = {
        id: 'demo-user',
        name: 'Demo Kullanıcı',
        email: 'demo@example.com',
        role: 'demo',
        isDemo: true,
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face`
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('demoLoginTime', Date.now().toString());
      
      // Start 30-minute session timeout
      startDemoSessionTimeout(30 * 60 * 1000); // 30 minutes
    } catch (error) {
      console.error('Demo login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await apiService.register(data);
      const { user: userData, token } = response;
      
      setUser(userData);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (demoSessionTimeout) {
      clearTimeout(demoSessionTimeout);
      setDemoSessionTimeout(null);
    }
    
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('demoLoginTime');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      loginAsDemo, 
      logout, 
      isLoading, 
      isDemoMode 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
