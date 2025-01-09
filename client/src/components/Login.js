import React, { useState, useContext } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to manage error messages
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);  // Set token in context
      navigate('/dashboard');       // Redirect to dashboard
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Row className="justify-content-center align-items-center vh-100">
      <Col xs={10} sm={8} md={6} lg={4}>
        <Card className="shadow-lg">
          <Card.Body>
            <h2 className="text-center text-primary mb-4">Welcome Back!</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>
            </Form>
            <div className="mt-4 text-center">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-primary">Register</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
