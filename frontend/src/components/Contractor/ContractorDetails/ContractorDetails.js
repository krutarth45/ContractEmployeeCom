import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
import { uploadResume } from '../../../functions/contractor';
import './ContractorDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContractorDetails = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalExpYear, setTotalExpYear] = useState(
    user.totalExpYear.length !== 0 ? user.totalExpYear : []
  );
  const [relExpYear, setRelExpYear] = useState(
    user.relExpYear.length !== 0 ? user.relExpYear : []
  );
  const [skillInfo, setSkillInfo] = useState(
    user.skillInfo.length !== 0 ? user.skillInfo : []
  );
  const [companyName, setCompanyName] = useState(
    user.companyName ? user.companyName : ''
  );
  const [jobType, setJobType] = useState(
    user.jobType.length !== 0 ? user.jobType : []
  );
  const [curMonSal, setCurMonSal] = useState(
    user.curMonSal.length !== 0 ? user.curMonSal : []
  );
  const [curMonCurr, setCurMonCurr] = useState(
    user.curMonCurr.length !== 0 ? user.curMonCurr : []
  );
  const [expMonSal, setExpMonSal] = useState(
    user.expMonSal.length !== 0 ? user.expMonSal : []
  );
  const [expMonCurr, setExpMonCurr] = useState(
    user.expMonCurr.length !== 0 ? user.expMonCurr : []
  );
  const [noticePeriod, setNoticePeriod] = useState(
    user.noticePeriod.length !== 0 ? user.noticePeriod : []
  );
  const [currentCity, setCurrentCity] = useState(
    user.currentCity.length !== 0 ? user.currentCity : []
  );
  const [preferredCities, setPreferredCities] = useState(
    user.preferredCities.length !== 0 ? user.preferredCities : []
  );
  const [bday, setBday] = useState(user.bday);
  const [resume, setResume] = useState(null);
  const [resumeLink, setResumeLink] = useState(
    user.resumeLink ? user.resumeLink : ''
  );
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const ref = useRef();
  const ref2 = useRef();
  const handleContractorDetails = async (
    totalExpYear,
    relExpYear,
    skillInfo,
    companyName,
    jobType,
    curMonSal,
    curMonCurr,
    expMonSal,
    expMonCurr,
    noticePeriod,
    currentCity,
    preferredCities,
    bday,
    resumeLink
  ) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/contractor/updatecontractordetails`,
        {
          totalExpYear,
          relExpYear,
          skillInfo,
          companyName,
          jobType,
          curMonSal,
          curMonCurr,
          expMonSal,
          expMonCurr,
          noticePeriod,
          currentCity,
          preferredCities,
          bday,
          resumeLink
        },
        {
          headers: { 'x-auth-token': user.token }
        }
      );
      console.log(data.message);
      navigate('/contractor/job-feed');
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError1('');
    }, 3000);
  }, [error1]);
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
                return setError1('Please select Value from the Dropdown Menu');
              }
              // call the handle function here
              dispatch({
                type: 'UPDATE',
                payload: {
                  totalExpYear,
                  relExpYear,
                  skillInfo,
                  companyName,
                  jobType,
                  curMonSal,
                  curMonCurr,
                  expMonSal,
                  expMonCurr,
                  noticePeriod,
                  currentCity,
                  preferredCities,
                  bday,
                  resumeLink
                }
              });
              Cookies.set(
                'user',
                JSON.stringify({
                  ...user,
                  totalExpYear,
                  relExpYear,
                  skillInfo,
                  companyName,
                  jobType,
                  curMonSal,
                  curMonCurr,
                  expMonSal,
                  expMonCurr,
                  noticePeriod,
                  currentCity,
                  preferredCities,
                  bday,
                  resumeLink
                })
              );
              handleContractorDetails(
                totalExpYear,
                relExpYear,
                skillInfo,
                companyName,
                jobType,
                curMonSal,
                curMonCurr,
                expMonSal,
                expMonCurr,
                noticePeriod,
                currentCity,
                preferredCities,
                bday,
                resumeLink
              );
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
                    name="bday"
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
                    name="resume"
                    onChange={async (e) => {
                      setError2('');
                      setResume(e.target.files[0]);
                      let formData = new FormData();
                      formData.append('resume', e.target.files[0]);
                      let secure_url = await uploadResume(formData);
                      if (secure_url === undefined) {
                        return setError2('Only PDF format is supported');
                      }
                      setResumeLink(secure_url);
                    }}
                    type="file"
                  />
                </Form.Group>
                {error2 && <p className="text-danger">{error2}</p>}
                {resumeLink && (
                  <a
                    href={resumeLink}
                    className="btn px-2 py-1 mb-4"
                    role="button"
                    style={{
                      backgroundColor: '#3b5998',
                      color: 'white',
                      fontWeight: '500'
                    }}
                    target="_blank"
                  >
                    View Resume
                  </a>
                )}
              </Col>
            </Row>
            <div className="my-2 text-center">
              {error1 && <p className="text-danger">{error1}</p>}
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

export default ContractorDetails;
