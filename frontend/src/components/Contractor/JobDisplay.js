import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getJobs } from '../../functions/contractor';
import SingleJob from './SingleJob';
const JobDisplay = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getJobs(user.token);
    setData(result);
  }, []);
  return (
    <div>
      <Container className="mt-5">
        {data && data === 'No Jobs Posted.' ? (
          <div className="text-center">NO JOBS POSTED.</div>
        ) : (
          <>
            {data.map((job, index) => (
              <SingleJob user={user} job={job} key={index} />
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

export default JobDisplay;
