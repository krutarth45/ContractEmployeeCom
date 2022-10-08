import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default NotLoggedInRoutes;
