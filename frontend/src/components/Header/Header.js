import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import { useMediaQuery } from 'react-responsive';

const Header = ({ mode, setMode }) => {
  const large = useMediaQuery({
    query: '(max-width: 992px)'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required')
  });
  const handleLoginSubmit = async (values) => {
    try {
      const url = 'http://localhost:8000/contractor/login';
      const { data } = await axios.post(url, values);
      setError('');
      if (data.message === 'detailsUp') {
        navigate('/contractor/job-feed');
      } else if (data.message === 'detailsDown') {
        navigate('/contractor/user-details');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError('Some Error has Occured, Please try again.');
      }
    }
  };
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
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  handleLoginSubmit(values);
                }}
                initialValues={{
                  email: '',
                  password: ''
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <div className="d-flex" style={{ marginRight: '30px' }}>
                      <Form.Group
                        controlId="validationFormik101"
                        className="position-relative px-1"
                      >
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                          isInvalid={!!errors.email}
                          placeholder="Email"
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        controlId="validationFormik102"
                        className="position-relative px-1"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div>
                        <Button
                          style={{
                            background: '#3b5998',
                            border: 'none',
                            fontWeight: '700'
                          }}
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div
              className="headerRight__modeShift"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setMode((prev) => !prev);
              }}
            >
              {mode ? 'Go To Employer Sign In' : 'Go To Contractor Sign In'}
            </div>
            {!large && error && (
              <h4 className="ps-2 error-text text-danger">{error}</h4>
            )}
          </div>
          {large && error && (
            <h4 className="ps-2 error-text text-danger">{error}</h4>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
