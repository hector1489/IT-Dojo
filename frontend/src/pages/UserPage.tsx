import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage: React.FC = () => {
  const { user, logout } = useAuth();


  return (
    <div className='d-flex flex-column justify-content-center align-items-center p-4'>
      {user ? (
        <>
          <h3>Welcome {user}</h3>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login to view this page.</p>
      )}
    </div>
  );
};

export default UserPage;
