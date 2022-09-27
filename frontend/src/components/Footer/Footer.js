import { Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './Footer.css';
const Footer = () => {
  const medium = useMediaQuery({
    query: '(max-width: 768px)'
  });
  return (
    <div className="pt-4 pb-3 px-3 mt-4 footerDiv">
      <Row>
        <Col md={6} className={`${medium ? 'mb-3' : ''}`}>
          <h4>CONTRACTEMPLOYEE.COM</h4>
          <h4>(Product Of DharmaWorks (India) Pvt.Ltd.)</h4>
        </Col>
        <Col md={3} className={`${medium ? 'mb-3' : ''}`}>
          <h4>LINKS</h4>
          <ul className="footer__links">
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/complaint">Complaint</a>
            </li>
            <li>
              <a href="/">Grievance</a>
            </li>
            <li>
              <a href="/">Fraud Alert</a>
            </li>
          </ul>
        </Col>
        <Col md={3} className={`${medium ? 'mb-3' : ''}`}>
          <h4>LINKS</h4>
          <ul className="footer__links">
            <li>
              <a href="/">Jobseeker Sign Up</a>
            </li>
            <li>
              <a href="/">Employer Sign Up</a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
