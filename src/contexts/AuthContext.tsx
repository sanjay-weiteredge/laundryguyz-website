import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  mobileNumber: string;
  name: string;
  email?: string;
  photo?: string; // Base64 encoded image or URL
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  storeId: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string, storeId: string) => void;
  logout: () => void;
  switchStore: (newStoreId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedStoreId = localStorage.getItem('storeId');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setStoreId(storedStoreId);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('storeId');
      }
    }
  }, []);

  const login = (userData: User, authToken: string, selectedStoreId: string) => {
    setUser(userData);
    setToken(authToken);
    setStoreId(selectedStoreId);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    localStorage.setItem('storeId', selectedStoreId);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setStoreId(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('storeId');
  };

  const switchStore = (newStoreId: string) => {
    setStoreId(newStoreId);
    localStorage.setItem('storeId', newStoreId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        storeId,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        switchStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

