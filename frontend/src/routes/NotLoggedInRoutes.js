import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';

function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Home /> : <Outlet />;
}

export default NotLoggedInRoutes;
