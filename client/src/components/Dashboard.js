import React, { useEffect, useContext, useState } from 'react';
import { Table, Button, Form, Spinner, Modal, Alert, Row, Col } from 'react-bootstrap';
import { OrderContext } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!authData) {
      navigate('/login');
      return;
    }

    // Fetch orders function
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders', {
          headers: { 'x-auth-token': authData },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    // Initial fetch of orders
    fetchOrders();

    // Polling: Fetch orders every 30 seconds
    const intervalId = setInterval(fetchOrders, 30000);

    // Cleanup polling interval on component unmount
    return () => clearInterval(intervalId);
  }, [authData, navigate, setOrders]);

  const sortOrders = (orders) => {
    return orders.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  };

  const filterOrders = (orders) => {
    if (filterBy === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === filterBy);
  };

  const filteredAndSortedOrders = filterOrders(sortOrders(orders));

  const handleCancelOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}/cancel`, {
        headers: { 'x-auth-token': authData },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      alert('Failed to cancel order');
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>

      {/* Sorting and Filtering */}
      <Row className="mb-3">
        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Filter By Status</Form.Label>
            <Form.Control as="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Processing">Processing</option> {/* New Filter Option */}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Error Handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading Spinner */}
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.status}</td>
                <td className="d-flex flex-wrap">
                  <Button variant="info" onClick={() => handleViewOrderDetails(order)} className="mb-1 me-1">
                    View Details
                  </Button>
                  {order.status !== 'Cancelled' && (
                    <Button variant="danger" onClick={() => handleCancelOrder(order._id)} className="mb-1">
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <h4>Order ID: {selectedOrder._id}</h4>
              <p>Status: {selectedOrder.status}</p>
              <h5>Items:</h5>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item.productId}>
                    Product: {item.productId} | Quantity: {item.quantity} | Price: ${item.price}
                  </li>
                ))}
              </ul>
              <h5>Shipping Details:</h5>
              <p>Address: {selectedOrder.shippingAddress}</p>
              <p>
                Shipping Date:{' '}
                {selectedOrder.shippingDate
                  ? new Date(selectedOrder.shippingDate).toLocaleDateString()
                  : 'Not available'}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
