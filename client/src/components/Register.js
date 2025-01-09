import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      await api.post('/auth/register', { name, email, password });
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Row className="justify-content-center align-items-center vh-100">
      <Col xs={10} sm={8} md={6} lg={4}>
        <Card className="shadow-lg">
          <Card.Body>
            <h2 className="text-center text-success mb-4">Create an Account</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100">
                Register
              </Button>
            </Form>
            <div className="mt-4 text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="text-success">Login</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
