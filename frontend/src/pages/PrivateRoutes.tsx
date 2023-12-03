import { ReactNode, useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import DataContext from '../context/context';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useContext(DataContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route>{children}</Route>;
};

export default PrivateRoute;
