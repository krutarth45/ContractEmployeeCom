import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostedJobs } from '../../functions/employer';
import './ContractorList/ContractorList.css';

const PostedJobsList = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getPostedJobs(user.token);
    setData(result);
  }, []);
  return (
    <div>
      <Container className="mt-5">
        {data && data.message === 'No Jobs Posted.' ? (
          <div className="text-center">NO JOBS POSTED.</div>
        ) : (
          <>
            {data.map((job, index) => (
              <Row className="mb-4" key={index}>
                <Col>
                  <Card
                    className="userDiv px-3 py-2 mx-auto"
                    style={{ width: '90%' }}
                  >
                    <Card.Body>
                      <Card.Title>{job.jobRole}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {job.jobIndustry}
                      </Card.Subtitle>
                      <Card.Text>
                        Contract Length: {job.jobContractDuration}
                      </Card.Text>
                      <Card.Text>
                        Salary: {job.salary} {job.salaryCurrency}
                      </Card.Text>
                      <Card.Text>Location: {job.jobLocation}</Card.Text>
                      <Card.Text>
                        Top Skills: {job.jobSkills[0]}, {job.jobSkills[1]},{' '}
                        {job.jobSkills[2]}.
                      </Card.Text>
                      <Card.Text>
                        <Link to={`/employer/${job._id}/applicants`}>
                          <Button
                            className="btn px-3 py-1"
                            style={{ backgroundColor: '#3b5998' }}
                          >
                            See Applicants
                          </Button>
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

export default PostedJobsList;
