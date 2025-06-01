import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from './types';
import { checkAuthStatus } from './utils'; // Adjust the import path as necessary

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, redirectPath = '/login' }) => {
  const isAuthenticated = checkAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;