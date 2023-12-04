import { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';

export interface AuthContextProps {
  user: string | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
  signup: (email: string, pass: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, pass: string) => {
    try {
      const response = await axios.post('/login', { email, pass });
      const { token, user } = response.data;
      console.log(response.data)
      setToken(token);
      setUser( user );
      console.log( user )
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
    }
  };

  const signup = async (email: string, pass: string) => {
    try {
      const response = await axios.post('/register', { email, pass });
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextProps = {
    user,
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
