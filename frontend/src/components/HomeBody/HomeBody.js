import { Container, Row, Col } from 'react-bootstrap';
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
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default HomeBody;
