
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
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
    }
    setIsLoading(false);
  }, []);

  const startDemoSessionTimeout = (duration: number) => {
    if (demoSessionTimeout) {
      clearTimeout(demoSessionTimeout);
    }
    
    const timeout = setTimeout(() => {
      logout();
      // You could show a toast here about demo session expiry
    }, duration);
    
    setDemoSessionTimeout(timeout);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Admin özel giriş kontrolü
    if (email === 'sudolens@gmail.com' && password === '123456') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Süper Admin',
        email: email,
        role: 'admin',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setIsLoading(false);
      return;
    }
    
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email: email,
      role: email.includes('admin') ? 'admin' : 'observer',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    
    setIsLoading(false);
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: 'observer'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    if (demoSessionTimeout) {
      clearTimeout(demoSessionTimeout);
      setDemoSessionTimeout(null);
    }
    
    setUser(null);
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
