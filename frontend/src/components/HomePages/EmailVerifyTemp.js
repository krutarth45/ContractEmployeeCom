import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';

import './index.css';
const EmailVerifyTemp = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8000/employer/${param.id}/verify/${param.token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <Fragment>
      {validUrl ? (
        <div className="text-center p-5 emailVerifyDiv">
          <h1 className="text-white">Success</h1>
          <p className="text-white">
            You have successfully verified your email. Please log in to find the
            best freelance job.
          </p>
          <Link to="/" className="btn btn-success mt-3" role="button">
            Login
          </Link>
        </div>
      ) : (
        <div className="text-center p-5 emailVerifyDiv">
          <h1 className="text-white">404 Not Found</h1>
        </div>
      )}
    </Fragment>
  );
};

export default EmailVerifyTemp;
