import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const OrderItem = ({ item }) => {
  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} sm={8}>
            <h5 className="text-primary">{item.productId}</h5>
            <p className="mb-1">
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> ${item.price}
            </p>
          </Col>
          <Col xs={12} sm={4} className="text-end">
            <h6 className="text-success">
              <strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}
            </h6>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderItem;
