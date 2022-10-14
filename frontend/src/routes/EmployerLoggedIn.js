import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmployerLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  if (user) {
    if (user.userType === 'employer') {
      return <Outlet />;
    } else {
      if (user.skillInfo.length !== 0) {
        return <Navigate to="/contractor/job-feed" />;
      } else {
        return <Navigate to="/contractor/user-details" />;
      }
    }
  }
  return <Navigate to="/" />;
}

export default EmployerLoggedIn;
