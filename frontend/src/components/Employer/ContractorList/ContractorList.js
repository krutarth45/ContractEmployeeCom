import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getUsersList } from '../../../functions/employer';
import './ContractorList.css';
const ContractorList = () => {
  // Grab firstName, lastName, companyName, jobType, curMonSal, curMonCurr, expMonSal, expMonCurr, currentCity, prefferedCities, noticePeriod
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getUsersList();
    setData(result);
  }, []);
  return (
    <div>
      <Container>
        <Row className="mt-4">
          {data &&
            data.map((user, index) => (
              <Col md={12} key={index}>
                <Card className="userDiv" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{user.firstName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Card Subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ContractorList;
