import React, { useState } from 'react';
import './SignupAccount.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface SignupAccountProps {
  email: string;
  pass: string;
}

const SignupAccount: React.FC<SignupAccountProps> = ({ email, pass }) => {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', user);
      const { token } = response.data;
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="box-signup col-md-6">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold text-uppercase">Signup</Form.Label>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            name="pass"
            value={user.pass}
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
