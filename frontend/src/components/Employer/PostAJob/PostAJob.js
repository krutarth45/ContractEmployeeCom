import './PostAJob.css';
import '../../Contractor/ContractorDetails/ContractorDetails.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import {
  cityNames,
  contractDuration,
  currency,
  jobCategories,
  jobIndustries,
  skills
} from '../../../data';
import { useRef } from 'react';
import {
  uploadCompanyDetails,
  uploadJobDesc,
  uploadLogo
} from '../../../functions/employer';
import { uploadResume } from '../../../functions/contractor';
import { useSelector } from 'react-redux';

const PostAJob = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [jobRole, setJobRole] = useState('');
  const [jobSkills, setJobSkills] = useState([]);
  const [salary, setSalary] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState([]);
  const [jobCategory, setJobCategory] = useState([]);
  const [jobLocation, setJobLocation] = useState([]);
  const [jobIndustry, setJobIndustry] = useState([]);
  const [jobContractDuration, setJobContractDuration] = useState([]);
  const [jobDescription, setJobDescription] = useState(null);
  const [jobDescriptionLink, setJobDescriptionLink] = useState('');
  const [companyDetails, setCompanyDetails] = useState(null);
  const [companyDetailsLink, setCompanyDetailsLink] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
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
              Post-A-Job
            </h2>
          </Col>
        </Row>
        <div className="p-4 h-auto profileDetailsDiv">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                jobSkills.length === 0 ||
                salaryCurrency.length === 0 ||
                jobCategory.length === 0 ||
                jobLocation.length === 0 ||
                jobIndustry.length === 0 ||
                jobContractDuration.length === 0
              ) {
                return setError3('Please select Value from the Dropdown Menu');
              }
            }}
          >
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group controlId="jobRole">
                  <Form.Label>Job Role: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Job Role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Skills: </Form.Label>
                  <Typeahead
                    multiple
                    inputProps={{
                      required: jobSkills.length === 0 ? true : false
                    }}
                    id="basic-typeahead-multiple"
                    labelKey="skills"
                    options={skills}
                    placeholder="Skills"
                    selected={jobSkills}
                    ref={ref}
                    onChange={(selections) => {
                      setJobSkills(selections);
                      ref.current.toggleMenu();
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Salary (Monthly): </Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Group controlId="salary">
                      <Form.Control
                        required
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </Form.Group>
                    <Typeahead
                      className="ms-3"
                      inputProps={{ required: true }}
                      id="basic-typeahead-current-sal-currency"
                      labelKey="salaryCurrency"
                      onChange={setSalaryCurrency}
                      options={currency}
                      placeholder="Salary Currency"
                      selected={salaryCurrency}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Job Category: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-job-category"
                    labelKey="jobCategory"
                    onChange={setJobCategory}
                    options={jobCategories}
                    placeholder="Job Category"
                    selected={jobCategory}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Job Location: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-job-location"
                    labelKey="jobLocation"
                    onChange={setJobLocation}
                    options={cityNames}
                    placeholder="Job Location"
                    selected={jobLocation}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Job Industry: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-job-industry"
                    labelKey="jobIndustry"
                    onChange={setJobIndustry}
                    options={jobIndustries}
                    placeholder="Job Industry"
                    selected={jobIndustry}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Contract Duration: </Form.Label>
                  <Typeahead
                    inputProps={{ required: true }}
                    id="basic-typeahead-contract-duration"
                    labelKey="jobContractDuration"
                    onChange={setJobContractDuration}
                    options={contractDuration}
                    placeholder="Contract Duration"
                    selected={jobContractDuration}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="formFile1" className="mb-3">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    required={jobDescriptionLink ? false : true}
                    name="jd"
                    onChange={async (e) => {
                      setError2('');
                      setJobDescription(e.target.files[0]);
                      let formData = new FormData();
                      formData.append('jd', e.target.files[0]);
                      // Add user token (Authd route)
                      let secure_url = await uploadJobDesc(
                        formData,
                        user.token
                      );
                      if (secure_url === undefined) {
                        return setError2(
                          'Only PDF, TXT or DOCX files are supported'
                        );
                      }
                      setJobDescriptionLink(secure_url);
                    }}
                    type="file"
                  />
                </Form.Group>
                {error2 && <p className="text-danger">{error2}</p>}
                {jobDescriptionLink && (
                  <a
                    href={jobDescriptionLink}
                    className="btn px-2 py-1 mb-4"
                    role="button"
                    style={{
                      backgroundColor: '#3b5998',
                      color: 'white',
                      fontWeight: '500'
                    }}
                    target="_blank"
                  >
                    View JD
                  </a>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Form.Group controlId="formFile2" className="mb-3">
                  <Form.Label>Company Details</Form.Label>
                  <Form.Control
                    required={companyDetailsLink ? false : true}
                    name="companyDetails"
                    onChange={async (e) => {
                      setError1('');
                      setCompanyDetails(e.target.files[0]);
                      let formData = new FormData();
                      formData.append('companyDetails', e.target.files[0]);
                      let secure_url = await uploadCompanyDetails(
                        formData,
                        user.token
                      );
                      if (secure_url === undefined) {
                        return setError1(
                          'Only PDF, TXT or DOCX format is supported'
                        );
                      }
                      setCompanyDetailsLink(secure_url);
                    }}
                    type="file"
                  />
                </Form.Group>
                {error1 && <p className="text-danger">{error1}</p>}
                {companyDetailsLink && (
                  <a
                    href={companyDetailsLink}
                    className="btn px-2 py-1 mb-4"
                    role="button"
                    style={{
                      backgroundColor: '#3b5998',
                      color: 'white',
                      fontWeight: '500'
                    }}
                    target="_blank"
                  >
                    View Company Details
                  </a>
                )}
              </Col>
            </Row>
            <div className="my-2 text-center">
              {error3 && <p className="text-danger">{error3}</p>}
              {error && <p className="text-danger">{error}</p>}
              <Button
                className="btn px-3 py-1"
                type="submit"
                style={{ backgroundColor: '#3b5998' }}
              >
                <span>Post Job</span>
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default PostAJob;
