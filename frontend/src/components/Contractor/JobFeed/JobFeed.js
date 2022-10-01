import { useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { salary, skills, totalExp } from '../../../data';
import './JobFeed.css';

const JobFeed = () => {
  const [totalExpYear, setTotalExpYear] = useState([]);
  const [relExpYear, setRelExpYear] = useState([]);
  const [skillInfo, setSkillInfo] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState([]);
  const [curMonSal, setCurMonSal] = useState([]);
  const [curMonCurr, setCurMonCurr] = useState([]);
  const [expMonSal, setExpMonSal] = useState([]);
  const [expMonCurr, setExpMonCurr] = useState([]);
  const ref = useRef();
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
            <Col sm={12} md={6}>
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
            <Col sm={12} md={6}>
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
            <Col sm={12} md={6}>
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
            <Col sm={12} md={6}>
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
          <Row className="mt-2">
            <Col sm={12} md={6}>
              <Form.Group>
                <Form.Label>Current Job Type: </Form.Label>
                <Typeahead
                  id="basic-typeahead-current-job-type"
                  labelKey="jobType"
                  onChange={setJobType}
                  options={['Permanent', 'Contract']}
                  placeholder="Current Job Type"
                  selected={jobType}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group>
                <Form.Label>Current Job Type: </Form.Label>
                <div className="d-flex align-items-center">
                  <Typeahead
                    id="basic-typeahead-current-month-salary"
                    labelKey="curMonSal"
                    onChange={setCurMonSal}
                    options={salary}
                    placeholder="Current Monthly Salary"
                    selected={curMonSal}
                  />
                  <Typeahead
                    className="ms-3"
                    id="basic-typeahead-current-sal-currency"
                    labelKey="curMonCurr"
                    onChange={setCurMonCurr}
                    options={salary}
                    placeholder="Current Salary Currency"
                    selected={curMonCurr}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12} md={6}></Col>
            <Col sm={12} md={6}></Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12} md={6}></Col>
            <Col sm={12} md={6}></Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12} md={6}></Col>
            <Col sm={12} md={6}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default JobFeed;
