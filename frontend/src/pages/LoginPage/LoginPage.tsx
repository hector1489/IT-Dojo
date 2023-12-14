import React from 'react';
import { Link } from 'react-router-dom';
import { UserAccount, SignupAccount } from '../../components/index';

const LoginPage: React.FC = () => {


  return (
    <div className='container mt-4'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 mb-4 text-center'>
          <UserAccount  />
        </div>
        <div className='col-md-6 mb-4 text-center'>
          <SignupAccount  />
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12 text-center'>
          <Link to="/">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
