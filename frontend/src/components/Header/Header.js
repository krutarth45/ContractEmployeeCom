import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ background: '#3b5998', padding: '14px 0' }}
      variant="dark"
    >
      <Navbar.Brand href="#home">
        <div className="headerLeft">
          <div className="headerLeft__logo">ContractEmploy.com</div>
          <div className="headerLeft__bottomLogo">
            {'(Product Of DharmaWorks (India) Pvt.Ltd.)'}
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ marginRight: '30px', background: '#fff' }}
      />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ marginLeft: '25px' }}
      >
        <Nav className="ms-auto">
          <div className="headerRight">
            <div className="headerRight__loginForm">
              <form>
                <input type="text" name="email" placeholder="Email Address" />
                <input type="password" name="password" placeholder="Password" />
                <button id="headerForm__Login">Login</button>
              </form>
            </div>
            <div className="headerRight__modeShift">Go To Employer Sign In</div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
