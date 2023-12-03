import { useState } from 'react';
import './userAccount.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface UserAccountProps {
  email: string;
  pass: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ email, pass }) => {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLogin = async () => {
    try {
      const response = await axios.post('/login', user);
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLogin();
  };

  return (
    <div className="box-login col-md-6">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold text-uppercase">Login</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
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
            name="pass"
            value={user.pass}
            onChange={handleUserChange}
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
