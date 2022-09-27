import { Col, Container, Row } from 'react-bootstrap';
import './index.css';
const Complaints = () => {
  return (
    <Container className="homeSubPages">
      <Row className="text-center my-5">
        <Col md={12}>
          <h2 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Complaint/Status
          </h2>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={12}>
          <p className="fw-bold">
            Please tell us the reason for your complaint/concern. Write to us
            with your complaint/concern in detail. contact@dharmaworks.in
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Complaints;
