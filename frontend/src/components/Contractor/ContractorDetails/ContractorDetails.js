import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
  cityNames,
  currency,
  notice,
  salary,
  skills,
  totalExp
} from '../../../data';
import './ContractorDetails.css';

const ContractorDetailsB = () => {
  const [totalExpYear, setTotalExpYear] = useState([]);
  const [relExpYear, setRelExpYear] = useState([]);
  const [skillInfo, setSkillInfo] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState([]);
  const [curMonSal, setCurMonSal] = useState([]);
  const [curMonCurr, setCurMonCurr] = useState([]);
  const [expMonSal, setExpMonSal] = useState([]);
  const [expMonCurr, setExpMonCurr] = useState([]);
  const [noticePeriod, setNoticePeriod] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [preferredCities, setPreferredCities] = useState([]);
  const [bday, setBday] = useState(new Date());
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const ref = useRef();
  const ref2 = useRef();
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);
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
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                preferredCities.length === 0 ||
                skillInfo.length === 0 ||
                totalExpYear.length === 0 ||
                relExpYear.length === 0 ||
                jobType.length === 0 ||
                curMonCurr.length === 0 ||
                curMonSal.length === 0 ||
                expMonCurr.length === 0 ||
                expMonSal.length === 0 ||
                noticePeriod.length === 0 ||
                currentCity.length === 0
              ) {
                return setError('Please select Value from the Dropdown Menu');
              }
              // call the handle function here
              console.log('Success');
            }}
          >
            <Row>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Total Experience: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
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
                    inputProps={{ required: true }}
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
                    inputProps={{
                      required: skillInfo.length === 0 ? true : false
                    }}
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
                    required
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
                    inputProps={{ required: true }}
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
                  <Form.Label>Notice Period: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-notice-period"
                    labelKey="noticePeriod"
                    onChange={setNoticePeriod}
                    options={notice}
                    placeholder="Notice Period"
                    selected={noticePeriod}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Current Monthly Salary: </Form.Label>
                  <div className="d-flex align-items-center">
                    <Typeahead
                      inputProps={{ required: true }}
                      id="basic-typeahead-current-month-salary"
                      labelKey="curMonSal"
                      onChange={setCurMonSal}
                      options={salary}
                      placeholder="Current Monthly Salary"
                      selected={curMonSal}
                    />
                    <Typeahead
                      className="ms-3"
                      inputProps={{ required: true }}
                      id="basic-typeahead-current-sal-currency"
                      labelKey="curMonCurr"
                      onChange={setCurMonCurr}
                      options={currency}
                      placeholder="Current Salary Currency"
                      selected={curMonCurr}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Expected Monthly Salary: </Form.Label>
                  <div className="d-flex align-items-center">
                    <Typeahead
                      inputProps={{ required: true }}
                      id="basic-typeahead-exp-month-salary"
                      labelKey="expMonSal"
                      onChange={setExpMonSal}
                      options={salary}
                      placeholder="Expected Monthly Salary"
                      selected={expMonSal}
                    />
                    <Typeahead
                      className="ms-3"
                      inputProps={{ required: true }}
                      id="basic-typeahead-current-sal-currency"
                      labelKey="expMonCurr"
                      onChange={setExpMonCurr}
                      options={currency}
                      placeholder="Salary Currency"
                      selected={expMonCurr}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Current City: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-current-city"
                    labelKey="currentCity"
                    onChange={setCurrentCity}
                    options={cityNames}
                    placeholder="Current City"
                    selected={currentCity}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Preferred Cities: </Form.Label>
                  <Typeahead
                    multiple
                    inputProps={{
                      required: preferredCities.length === 0 ? true : false
                    }}
                    id="basic-typeahead-preferred-cities"
                    labelKey="preferredCities"
                    options={cityNames}
                    placeholder="Preferred Cities"
                    selected={preferredCities}
                    ref={ref2}
                    onChange={(selections) => {
                      setPreferredCities(selections);
                      ref2.current.toggleMenu();
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="bDay"
                    placeholder="Birthday"
                    value={bday}
                    onChange={(e) => setBday(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => {
                      setResume(e.target.files[0]);
                    }}
                    type="file"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="my-2 text-center">
              {error && <p className="text-danger">{error}</p>}
              <Button
                className="btn px-3 py-1"
                type="submit"
                style={{ backgroundColor: '#3b5998' }}
              >
                <span>Save</span>
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ContractorDetailsB;
