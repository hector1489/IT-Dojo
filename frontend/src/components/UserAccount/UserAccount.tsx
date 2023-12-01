import React from 'react';
interface UserAccountProps {
  username: string;
  email: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ username, email }) => {
  return (
    <div>
      <h2>User Account</h2>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
};

export default UserAccount;
