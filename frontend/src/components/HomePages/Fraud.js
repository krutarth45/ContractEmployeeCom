import { Col, Container, Row } from 'react-bootstrap';
import './index.css';
const Fraud = () => {
  return (
    <Container className="homeSubPages">
      <Row className="text-center my-5">
        <Col md={12}>
          <h2
            style={{
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: '#a9a9a9'
            }}
          >
            Welcome to Contractemploy.com Security Centre
          </h2>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={12}>
          <p className="fw-bold">
            Please do not Pay any money or provide personal / financial
            information (Credit/ debit card number, CVV number, OTP, etc.) to
            anyone. Fraudsters may ask you to pay in the pretext of registration
            fee, Refundable Fee, Document Processing fee or any other excuse.
            Before your respond to any email / call, we suggest you to do a
            discreet enquiry and be sure to verify the authenticity of the
            person with whom you are interacting You can also write to us at
            contact@dharmaworks.in
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Fraud;
