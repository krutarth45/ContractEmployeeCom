import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import { useSelector } from 'react-redux';

function ContractorLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user?.userType === 'contractor' ? <Outlet /> : <Home />;
}

export default ContractorLoggedIn;
