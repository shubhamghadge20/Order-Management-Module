import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import { Container } from 'react-bootstrap';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';  // Import Register page
import Home from './pages/Home';
import AuthContextProvider from './context/AuthContext';
import OrderContextProvider from './context/OrderContext';

const App = () => {
  return (
    <AuthContextProvider>
      <OrderContextProvider>
        <Router>
          <NavBar />
          <Container>
            <Routes>  {/* Use Routes instead of Switch */}
              <Route path="/" element={<Home />} />  {/* Use element */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Use element */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
        </Router>
      </OrderContextProvider>
    </AuthContextProvider>
  );
};

export default App;
