import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/context';

const UserPage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>User Page</h2>
      <p>Bienvenido, {currentUser.username}.</p>
      <br />
      <Link to="/">Ir a la página de inicio</Link>
    </div>
  );
};

export default UserPage;
