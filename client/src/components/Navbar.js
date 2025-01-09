import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Order Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {authData ? (
              <>
                <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
                <Button 
                  variant="outline-light" 
                  onClick={logout} 
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link text-white">Login</NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
