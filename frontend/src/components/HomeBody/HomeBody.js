import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import './HomeBody.css';
import { useState } from 'react';
const HomeBody = ({ mode, setMode }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const nameRegExp = /^[A-Za-z]+$/;
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('First Name is required')
      .matches(nameRegExp, 'Name can only contain alphabets'),
    lastName: yup
      .string()
      .required('Last Name is required')
      .matches(nameRegExp, 'Name can only contain alphabets'),
    email: yup.string().required('Email is required').email(),
    contact: yup
      .string()
      .required('Phone number is required.')
      .matches(phoneRegExp, 'Phone Number is not Valid.'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    terms: yup.bool().required().oneOf([true], 'terms must be accepted')
  });
  const handleRegisterSubmit = async (values) => {
    try {
      const url = 'http://localhost:8000/contractor/register';
      const { data } = await axios.post(url, values);
      setError('');
      setSuccess(data.message);
    } catch (error) {
      setSuccess('');
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
    <Container className="mb-3">
      <Row>
        <Col md={8}>
          <div className="homeBodyLeft">
            <h2 className="fw-bold mt-4">Contract Jobs</h2>
            <h3 className="mt-3 mb-5 fw-bold" style={{ color: '#a9a9a9' }}>
              A Leading Career Destination For Professionals
            </h3>
            <Row className="d-flex align-items-center justify-content-between mt-3">
              <Col md={1} style={{ transform: 'translateY(1px)' }}>
                <img
                  src="https://salty-falls-45613.herokuapp.com/static/media/employment.23667d27.png"
                  height="30"
                  width="30"
                  alt=""
                />
              </Col>
              <Col md={11}>
                <span className="fw-w-bold">
                  Search for Contract Employees Globally
                </span>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between mt-3">
              <Col md={1} style={{ transform: 'translateY(1px)' }}>
                <img
                  src="https://salty-falls-45613.herokuapp.com/static/media/user.1be71fca.png"
                  height="30"
                  width="30"
                  alt=""
                />
              </Col>
              <Col md={11}>
                <span className="fw-w-bold">
                  Search for Candidates Worldwide.
                </span>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between mt-3">
              <Col md={1} style={{ transform: 'translateY(1px)' }}>
                <img
                  src="https://salty-falls-45613.herokuapp.com/static/media/timer.e3a89b55.png"
                  height="30"
                  width="30"
                  alt=""
                />
              </Col>
              <Col md={11}>
                <span className="fw-w-bold">
                  Post a Job and find Quick Response
                </span>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="homeBodyRight">
            <h2 className="fw-bold mt-4">Candidate Registration</h2>
            <hr />
            <div className="headerBodyRight__modeShift">
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="contractor"
                  value="Contractor"
                  checked={mode}
                  onChange={() => {
                    if (mode) {
                      return;
                    }
                    setMode((prev) => !prev);
                  }}
                />
                <label htmlFor="Contractor">Contractor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="employer"
                  value="Employer"
                  checked={!mode}
                  onChange={() => {
                    if (!mode) {
                      return;
                    }
                    setMode((prev) => !prev);
                  }}
                />
                <label htmlFor="Employer">Employer</label>
              </div>
            </div>
            <div className="mt-3">
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  handleRegisterSubmit(values);
                }}
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  contact: '',
                  password: '',
                  passwordConfirmation: '',
                  terms: false
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Label className="homeBodyRight__formLabel">
                      Name
                    </Form.Label>
                    <div className="d-flex mb-1">
                      <Form.Group
                        controlId="validationFormik101"
                        className="position-relative ps-0 pe-1"
                      >
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={!!errors.firstName}
                          placeholder="First Name"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          tooltip
                          style={{ right: '0px' }}
                        >
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        controlId="validationFormik102"
                        className="position-relative ps-1 pe-0"
                      >
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          tooltip
                          style={{ right: '0px' }}
                        >
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <Form.Group
                      className="mb-1 position-relative"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="homeBodyRight__formLabel">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ right: '0px' }}
                        tooltip
                      >
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-1 position-relative"
                      controlId="formBasicContact"
                    >
                      <Form.Label className="homeBodyRight__formLabel">
                        Contact
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        placeholder="Enter contact number"
                        value={values.contact}
                        onChange={handleChange}
                        isValid={touched.contact && !errors.contact}
                        isInvalid={!!errors.contact}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ right: '0px' }}
                        tooltip
                      >
                        {errors.contact}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-2 position-relative"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="homeBodyRight__formLabel">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ right: '0px' }}
                        tooltip
                      >
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-2 position-relative"
                      controlId="formBasicPasswordConfirm"
                    >
                      <Form.Label className="homeBodyRight__formLabel">
                        Re-enter Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password Confirmation"
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isValid={
                          touched.passwordConfirmation &&
                          !errors.passwordConfirmation
                        }
                        isInvalid={!!errors.passwordConfirmation}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ right: '0px' }}
                        tooltip
                      >
                        {errors.passwordConfirmation}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-2 position-relative"
                      controlId="formBasicCheckbox"
                    >
                      <div className="d-flex align-items-center terms-link">
                        <Form.Check
                          required
                          name="terms"
                          type="checkbox"
                          onChange={handleChange}
                          isInvalid={!!errors.terms}
                          feedback={errors.terms}
                          feedbackType="invalid"
                          id="validationFormik106"
                          feedbackTooltip
                        />
                        <a
                          href="/terms-and-condition"
                          style={{ textDecoration: 'none' }}
                        >
                          Agree to Terms & Conditions
                        </a>
                      </div>
                    </Form.Group>
                    {success && <p className="text-success">{success}</p>}
                    {error && <p className="text-danger">{error}</p>}
                    <Button style={{ background: '#3b5998' }} type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBody;
