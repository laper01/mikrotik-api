// src/context/AuthContext.tsx
import { User } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import CryptoJS from 'crypto-js';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const SECRET_KEY = '7JmjekXy/J0tsSZ029VGs1iyd+8zfMaZ+RgVagSrKAM='; // Use a strong and unique key, securely stored

const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

const decryptToken = (encryptedToken: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt token:', error);
    return null;
  }
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const encryptedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (encryptedToken && storedUser) {
      try {
        const decryptedToken = decryptToken(encryptedToken);
        const parsedUser = JSON.parse(storedUser) as User;
        if (decryptedToken && isTokenValid(decryptedToken)) {
          setIsAuthenticated(true);
          setUser(parsedUser);
          setToken(decryptedToken);
        }
      } catch (error) {
        console.error('Failed to parse user data or decrypt token:', error);
      }
    }
  }, []);

  const isTokenValid = (token: string): boolean => {
    // Implement token validation logic here, e.g., JWT verification
    return true;
  };

  const login = (token: string, userData: User) => {
    const encryptedToken = encryptToken(token);
    localStorage.setItem('token', encryptedToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  const getToken = (): string | null => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
