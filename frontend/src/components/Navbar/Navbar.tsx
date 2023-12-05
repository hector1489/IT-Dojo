import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import './Navbar.css';
import DataContext, { DataContextProps } from '../../context/context';

const Navbar: React.FC = () => {
  const { shopCart, formatNumber } = useContext(DataContext) as DataContextProps;
  const location = useLocation();

  const setActiveClass = (path: string) =>
    location.pathname === path
      ? "text-warning fw-bold text-decoration-none me-3"
      : "text-secondary text-decoration-none me-3";

  const calculateTotal = () => {
    return shopCart.reduce((total, { count, price }) => total + price * count, 0);
  };

  return (
    <BootstrapNavbar expand="lg" className='box-navbar d-flex '>
      <BootstrapNavbar.Brand href="/" className='fw-bold text-white text-decoration-none text-uppercase ms-4'>IT Dojo.</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="burger-button"/>
      <BootstrapNavbar.Collapse id="basic-navbar-nav" className='ms-4'>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className={`nav-link ${setActiveClass('/')}`}>Home</Nav.Link>
          <Nav.Link as={Link} to="/login" className={`nav-link ${setActiveClass('/login')}`}>Login</Nav.Link>
          <Nav.Link as={Link} to="/profile" className={`nav-link ${setActiveClass('/profile')}`}>Profile</Nav.Link>
          <Nav.Link as={Link} to="/products" className={`nav-link ${setActiveClass('/products')}`}>Products</Nav.Link>
          <Nav.Link as={Link} to="/cart" className={`nav-link ${setActiveClass('/Cart')}`}>
            <div className="cart-icon">
              🛒 <span className="cart-total">{formatNumber(calculateTotal())}</span>
            </div>
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
