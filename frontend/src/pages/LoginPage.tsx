import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices';
import { isValidEmail } from '../utils/validationUtils';
import UserAccount from '../components/UserAccount/UserAccount';
import SignupAccount from '../components/SignupAccount/SignupAccount';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await userService.loginUser(username, email);
      navigate('/user');
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
<div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <UserAccount username={username} email={email} />
        </div>
        <div className='col-md-6'>
          <SignupAccount username={username} email={email} />
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12 text-center'>
          <Link to="/">Go back to Home</Link>
        </div>
      </div>
    </div>


  );
};

export default LoginPage;
