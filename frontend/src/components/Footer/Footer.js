import { Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = ({ setMode }) => {
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
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/complaint">Complaint</a>
            </li>
            <li>
              <a href="/grievance">Grievance</a>
            </li>
            <li>
              <a href="/fraud-alert">Fraud Alert</a>
            </li>
          </ul>
        </Col>
        <Col md={3} className={`${medium ? 'mb-3' : ''}`}>
          <h4>LINKS</h4>
          <ul className="footer__links">
            <li onClick={() => setMode(true)}>
              <Link to="/">Jobseeker Sign Up</Link>
            </li>
            <li onClick={() => setMode(false)}>
              <Link to="/">Employer Sign Up</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
