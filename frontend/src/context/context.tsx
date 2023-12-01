import { createContext, useContext, ReactNode, useState, useMemo } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loginUser: (username: string, email: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loginUser = (username: string, email: string) => {
    setCurrentUser({ id: 1, username, email });
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const contextValue: AuthContextType = useMemo(() => ({
    currentUser,
    loginUser,
    logoutUser,
  }), [currentUser]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
