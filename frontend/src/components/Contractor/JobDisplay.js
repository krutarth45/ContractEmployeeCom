import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../functions/contractor';
import '../Contractor/ContractorDetails/ContractorDetails.css';
import SingleJob from './SingleJob';
const JobDisplay = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getJobs(user.token);
    setData(result);
  }, []);
  dispatch({ type: 'GETJOBS', payload: data });
  return (
    <div>
      <div className="d-md-flex">
        <div className="jobDisplayLeft" style={{ width: '30%' }}>
          <Container className="mt-5"></Container>
        </div>
        <div className="jobDisplayRight" style={{ width: '70%' }}>
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
      </div>
    </div>
  );
};

export default JobDisplay;
