import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { uploadLogo } from '../../functions/employer';
import '../Contractor/ContractorDetails/ContractorDetails.css';
const EmployerDetails = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterDesignation, setRecruiterDesignation] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoLink, setCompanyLogoLink] = useState(null);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

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
              Company Details
            </h2>
          </Col>
        </Row>
        <div className="p-4 profileDetailsDiv h-auto">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Success');
            }}
          >
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="companyAddress">
                  <Form.Label>Company Address: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company Address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group controlId="recruiterName">
                  <Form.Label>Recruiter Name: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Recruiter Name"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="recruiterDesignation">
                  <Form.Label>Recruiter Designation: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Resignation Designation"
                    value={recruiterDesignation}
                    onChange={(e) => setRecruiterDesignation(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={12} md={6}>
                <Form.Group controlId="companyUrl">
                  <Form.Label>Company Site: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company Site"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    required
                    name="logo"
                    onChange={async (e) => {
                      setError2('');
                      setCompanyLogo(e.target.files[0]);
                      let formData = new FormData();
                      formData.append('logo', e.target.files[0]);
                      let secure_url = await uploadLogo(formData);
                      if (secure_url === undefined) {
                        return setError2('Only Images are supported');
                      }
                      setCompanyLogoLink(secure_url);
                    }}
                    type="file"
                  />
                </Form.Group>
                {error2 && <p className="text-danger">{error2}</p>}
                {companyLogo && companyLogoLink && (
                  <a
                    href={companyLogoLink}
                    className="btn px-2 py-1 mb-4"
                    role="button"
                    style={{
                      backgroundColor: '#3b5998',
                      color: 'white',
                      fontWeight: '500'
                    }}
                    target="_blank"
                  >
                    View Logo
                  </a>
                )}
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

export default EmployerDetails;
