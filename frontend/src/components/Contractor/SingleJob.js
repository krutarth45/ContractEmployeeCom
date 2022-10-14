import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import '../Employer/ContractorList/ContractorList.css';
const SingleJob = ({ job, user }) => {
  const [appliedFlag, setAppliedFlag] = useState(
    job.applicantIds.includes(user._id)
  );
  const handleApplyJob = async () => {
    try {
      await axios.put(
        `http://localhost:8000/contractor/${job._id}/apply`,
        {},
        {
          headers: {
            'x-auth-token': user.token
          }
        }
      );
    } catch (error) {
      return error.response.data.message;
    }
  };
  const handleRevokeJob = async () => {
    try {
      await axios.put(
        `http://localhost:8000/contractor/${job._id}/revoke`,
        {},
        {
          headers: {
            'x-auth-token': user.token
          }
        }
      );
    } catch (error) {
      return error.response.data.message;
    }
  };
  return (
    <Row className="mb-4">
      <Col>
        <Card className="userDiv px-3 py-2 mx-auto" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>{job.jobRole}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {job.postedBy.companyName} {job.jobIndustry}
            </Card.Subtitle>
            <Card.Text>Contract Length: {job.jobContractDuration}</Card.Text>
            <Card.Text>
              Salary: {job.salary} {job.salaryCurrency}
            </Card.Text>
            <Card.Text>Location: {job.jobLocation}</Card.Text>
            <Card.Text>
              Top Skills: {job.jobSkills[0]}, {job.jobSkills[1]},{' '}
              {job.jobSkills[2]}.
            </Card.Text>
            <div className="mb-3">
              <Card.Link href={job.jobDescriptionLink} target="_blank">
                Job Role
              </Card.Link>
              <Card.Link href={job.companyDetailsLink} target="_blank">
                Company Description
              </Card.Link>
            </div>
            <Card.Text>
              {appliedFlag && (
                <Button
                  className="btn px-3 py-1"
                  style={{ backgroundColor: '#3b5998' }}
                  onClick={() => {
                    handleRevokeJob();
                    setAppliedFlag((prev) => !prev);
                  }}
                >
                  Applied
                </Button>
              )}
              {!appliedFlag && (
                <Button
                  className="btn px-3 py-1"
                  style={{ backgroundColor: '#3b5998' }}
                  onClick={() => {
                    handleApplyJob();
                    setAppliedFlag((prev) => !prev);
                  }}
                >
                  Apply
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SingleJob;
