import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userService } from '../services/userServices';


const UserPage: React.FC = () => {
  const currentUser = userService.getCurrentUser();

  if (!currentUser) {

    return (
      <Navigate to="/" />
    )
  }

  const handleLogout = () => {

    userService.logoutUser();

  };

  return (
    <div>
      <h2>User Page</h2>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default UserPage;
