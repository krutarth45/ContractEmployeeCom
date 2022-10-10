import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ContractorLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  if (user) {
    if (user.userType === 'contractor') {
      return <Outlet />;
    } else {
      if (user.recruiterName) {
        return <Navigate to="/employer/users-list" />;
      } else {
        return <Navigate to="/employer/employer-details" />;
      }
    }
  }
  return <Navigate to="/" />;
}

export default ContractorLoggedIn;
