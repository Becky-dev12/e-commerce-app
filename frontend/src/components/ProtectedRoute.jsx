import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useAuth();
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
