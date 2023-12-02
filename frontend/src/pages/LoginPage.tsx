import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context';
import { isValidEmail } from '../utils/validationUtils';
import UserAccount from '../components/UserAccount/UserAccount';
import SignupAccount from '../components/SignupAccount/SignupAccount';

interface LoginPageState {
  username: string;
  email: string;
  error: string;
}

const LoginPage: React.FC = () => {
  const [state, setState] = useState<LoginPageState>({
    username: '',
    email: '',
    error: '',
  });

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(state.email)) {
      setState((prevState) => ({ ...prevState, error: 'Invalid email format' }));
      return;
    }

    try {
      loginUser(state.username, state.email);
      navigate('/user');
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: 'Error al iniciar sesión' }));
    }
  };

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 mb-4 text-center'>
          <UserAccount username={state.username} email={state.email} />
        </div>
        <div className='col-md-6 mb-4 text-center'>
          <SignupAccount username={state.username} email={state.email} />
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
