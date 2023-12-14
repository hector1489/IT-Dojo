import { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';

interface AuthContextProps {
  user: { email: string; id: string } | null;
  token: string | null;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') ?? null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, pass: string) => {
    try {
      const response = await axios.post(ENDPOINT.login, { email, pass });
      const { token, id, user } = response.data;
      setToken(token);
      setUser({ ...user, id });
      localStorage.setItem('token', token);
      setError(null);
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
    }
  };

  const signup = async (email: string, pass: string) => {
    try {
      const response = await axios.post(ENDPOINT.signup, { email, pass });
      const { token, user, id } = response.data;
      setToken(token);
      setUser({ ...user, id });
      setError(null);
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to signup. Please try again.');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const contextValue: AuthContextProps = {
    user,
    token,
    error,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
