import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import { useSelector } from 'react-redux';

function EmployerLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user?.userType === 'employer' ? <Outlet /> : <Home />;
}

export default EmployerLoggedIn;
