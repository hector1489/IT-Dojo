import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices';
import { isValidEmail } from '../utils/validationUtils';

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
      await userService.loginUser( username, email );
      navigate('/user');
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default LoginPage;
