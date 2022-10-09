import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompanyDetails from '../pages/Employer/CompanyDetails';
import UserList from '../pages/Employer/UserList';

function ContractorLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user?.userType === 'contractor' ? (
    <Outlet />
  ) : user.recruiterName ? (
    <UserList />
  ) : (
    <CompanyDetails />
  );
}

export default ContractorLoggedIn;
