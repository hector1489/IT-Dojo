import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserAccount from '../components/UserAccount/UserAccount';
import SignupAccount from '../components/SignupAccount/SignupAccount';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const userCredentials = {
    email: 'correo@example.com',
    pass: 'contraseña',
  };

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 mb-4 text-center'>
          <UserAccount {...userCredentials} />
        </div>
        <div className='col-md-6 mb-4 text-center'>
          <SignupAccount {...userCredentials} />
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12 text-center'>
          <Link to="/">Volver a la página de inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
