import React, { useState } from 'react';
import './SignupAccount.css';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupAccount: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');
  const [error, setError] = useState<string | null>(null);


  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'pass') {
      setPass(value);
    } else if (name === 'repeatPass') {
      setRepeatPass(value);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (pass !== repeatPass) {
        setError('Passwords do not match.');
        return;
      }
      signup(email, pass);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="box-signup d-flex justify-content-center">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold text-uppercase">Signup</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
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
            value={pass}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            name="repeatPass"
            value={repeatPass}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default SignupAccount;
