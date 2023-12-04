import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage: React.FC = () => {
  const { user, logout } = useAuth();
  console.log(user)

  return (
    <div className='d-flex flex-column justify-content-center align-items-center p-4'>
      <h3>Welcome {user}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserPage;
