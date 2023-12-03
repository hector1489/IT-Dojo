import { ReactNode, useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import  DataContext  from '../context/context';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated  = useContext(DataContext);

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return <Route>{children}</Route>;
};

export default PublicRoute;
