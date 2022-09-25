import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HomeBody.css';
const HomeBody = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="homeBodyLeft">
            <h2 className="fw-bold mt-5">Contract Jobs</h2>
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
            <h2 className="fw-bold mt-5">Candidate Registration</h2>
            <hr />
            <div className="headerBodyRight__modeShift">
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="contractor"
                  value="Contractor"
                  checked
                />
                <label htmlFor="Contractor">Contractor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="employer"
                  value="Employer"
                />
                <label htmlFor="Employer">Employer</label>
              </div>
            </div>
            <div className="mt-3">
              <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label className="homeBodyRight__formLabel">
                    Email address
                  </Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicUsername">
                  <Form.Label className="homeBodyRight__formLabel">
                    Username
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicContact">
                  <Form.Label className="homeBodyRight__formLabel">
                    Contact
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter contact number"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label className="homeBodyRight__formLabel">
                    Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicCheckbox">
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      // label="Agree to Terms & Conditions"
                    />
                    <a href="/" style={{ textDecoration: 'none' }}>
                      Agree to Terms & Conditions
                    </a>
                  </div>
                </Form.Group>
                <Button style={{ background: '#3b5998' }} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBody;
