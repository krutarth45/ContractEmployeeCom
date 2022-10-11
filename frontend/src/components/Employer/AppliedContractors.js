import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { getAppliedUsersList } from '../../functions/employer';
import './ContractorList/ContractorList.css';

const AppliedContractors = () => {
  const { user } = useSelector((state) => ({ ...state }));
  let { jobId } = useParams();
  const large = useMediaQuery({
    query: '(max-width: 992px)'
  });
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getAppliedUsersList(jobId, user.token);
    setData(result);
  }, []);
  return (
    <div>
      <Container>
        <Row className="mt-3">
          {data && data === 'No Applicants for this Job Post' ? (
            <div className="text-center">No Applicants for this Job Post</div>
          ) : (
            <>
              {data.map((user, index) => (
                <Col className="mb-3" key={index}>
                  <Card
                    className={`${large ? 'userDiv mx-auto' : 'userDiv'}`}
                    style={{ width: '18rem' }}
                  >
                    <Card.Body>
                      <Card.Title>
                        {user.firstName} {user.lastName}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {user.currentCompany} - {user.jobType}
                      </Card.Subtitle>
                      <Card.Text>
                        Total Experience: {user.totalExperience}
                      </Card.Text>
                      <Card.Text>
                        Relevant Experience: {user.relevantExperience}
                      </Card.Text>
                      <Card.Text>
                        Expected Salary: {user.expMonSal} {user.expMonCurr}
                      </Card.Text>
                      <Card.Text>Notice Period: {user.noticePeriod}</Card.Text>
                      <Card.Text>Current City: {user.currentCity}</Card.Text>
                      <Card.Link href={user.resumeLink} target="_blank">
                        Resume Link
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AppliedContractors;
