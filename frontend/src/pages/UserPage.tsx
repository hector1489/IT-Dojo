import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userService } from '../services/userServices';


const UserPage: React.FC = () => {
  const currentUser = userService.getCurrentUser();

  if (!currentUser) {

    return (
      <Navigate to="/login" />
    )
  }

  return (
    <div>
      <h2>User Page</h2>
      
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default UserPage;
