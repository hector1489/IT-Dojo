import { useState } from 'react';
import './userAccount.css';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserAccountProps {

}

const UserAccount: React.FC<UserAccountProps> = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      login(email, pass);
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="box-login col-md-6">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold text-uppercase">Login</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      {token && <div className="token-info">Token: {token}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UserAccount;
