import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" expand="lg" className='box-navbar d-flex '>
      <BootstrapNavbar.Brand href="/" className='fw-bold text-white text-decoration-none text-uppercase ms-4'>IT Dojo.</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="burger-button"/>
      <BootstrapNavbar.Collapse id="basic-navbar-nav" className='ms-4'>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>
          <Nav.Link as={Link} to="/products" className="nav-link">Products</Nav.Link>
          <Nav.Link as={Link} to="/Cart" className="nav-link">
            <div className="cart-icon">
              🛒 <span className="cart-total">$:</span>
            </div>
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
