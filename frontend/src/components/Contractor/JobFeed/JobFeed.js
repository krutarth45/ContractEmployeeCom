import { useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useMediaQuery } from 'react-responsive';
import { skills, totalExp } from '../../../data';
import './JobFeed.css';

const JobFeed = () => {
  const [totalExpYear, setTotalExpYear] = useState([]);
  const [relExpYear, setRelExpYear] = useState([]);
  const [skillInfo, setSkillInfo] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const ref = useRef();
  const medium = useMediaQuery({
    query: '(max-width: 768px)'
  });
  return (
    <div>
      <Container>
        <Row className="text-center my-4">
          <Col md={12}>
            <h2
              style={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                color: '#a9a9a9'
              }}
            >
              Profile Details
            </h2>
          </Col>
        </Row>
        <div className="p-4 profileDetailsDiv h-auto">
          <Row>
            <Col className={`${medium ? '' : 'w-50'}`} md={12}>
              <Form.Group>
                <Form.Label>Total Experience: </Form.Label>
                <Typeahead
                  id="basic-typeahead-total-exp-single"
                  labelKey="totalExp"
                  onChange={setTotalExpYear}
                  options={totalExp}
                  placeholder="Total Experience"
                  selected={totalExpYear}
                />
              </Form.Group>
            </Col>
            <Col className={`${medium ? '' : 'w-50'}`} md={12}>
              <Form.Group>
                <Form.Label>Relevant Experience: </Form.Label>
                <Typeahead
                  id="basic-typeahead-single-rel-exp-single"
                  labelKey="relevantExp"
                  onChange={setRelExpYear}
                  options={totalExp}
                  placeholder="Relevant Experience"
                  selected={relExpYear}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className={`${medium ? '' : 'w-50'}`} md={12}>
              <Form.Group>
                <Form.Label>Skills: </Form.Label>
                <Typeahead
                  multiple
                  id="basic-typeahead-multiple"
                  labelKey="skills"
                  options={skills}
                  placeholder="Skills"
                  selected={skillInfo}
                  ref={ref}
                  onChange={(selections) => {
                    setSkillInfo(selections);
                    ref.current.toggleMenu();
                  }}
                />
              </Form.Group>
            </Col>
            <Col className={`${medium ? '' : 'w-50'}`} md={12}>
              <Form.Group controlId="companyName">
                <Form.Label>Current Company: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}></Col>
            <Col md={12}></Col>
          </Row>
          <Row>
            <Col md={12}></Col>
            <Col md={12}></Col>
          </Row>
          <Row>
            <Col className="w-100" md={6}></Col>
            <Col className="w-100" md={6}></Col>
          </Row>
          <Row>
            <Col className="w-100" md={6}></Col>
            <Col className="w-100" md={6}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default JobFeed;
