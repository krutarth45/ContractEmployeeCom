import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobFeed from '../pages/Contractor/JobFeed';
import UserDetails from '../pages/Contractor/UserDetails';

function EmployerLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user?.userType === 'employer' ? (
    <Outlet />
  ) : user.skillInfo.length !== 0 ? (
    <JobFeed />
  ) : (
    <UserDetails />
  );
}

export default EmployerLoggedIn;
