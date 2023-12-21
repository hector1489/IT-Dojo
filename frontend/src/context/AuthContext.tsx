import { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';


interface SignupResponse {
  id: string,
  email: string,
  token: string
}
interface AuthContextProps {
  user: { email: string; id: string } | null;
  token: string | null;
  error: string | null;
  login: (email: string, pass: string) => Promise<{ token: string }>;
  logout: () => void;
  signup: (email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; id: string } | null>(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored User:', storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token') ?? null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, pass: string) => {
    try {
      const response = await axios.post(ENDPOINT.login, { email, pass });
      const { token } = response.data;
      setToken(token);
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
      return { token };
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
      throw error;
    }
  };

  const signup = async (inputEmail: string, pass: string) => {
    try {
      const response = await axios.post(ENDPOINT.signup, { email: inputEmail, pass });
      const { token, email, userId } = response.data;
      setToken(token);
      setUser((prevUser) => {
        return { email, id: userId };
      });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, userId }));
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
    localStorage.removeItem('user');
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