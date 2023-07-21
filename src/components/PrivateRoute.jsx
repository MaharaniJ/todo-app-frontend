import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { auth } = useAuth();

  if (auth === null) return 'Loading...';

  return auth ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;


