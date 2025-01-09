import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="text-center shadow-lg">
            <Card.Body>
              <h1 className="text-primary">Welcome to the Order Dashboard</h1>
              <p className="mt-3 text-secondary">
                Log in to manage and track your orders efficiently and effortlessly.
              </p>
              <p className="mt-3 text-muted">
                Our platform provides real-time updates and comprehensive order management.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
