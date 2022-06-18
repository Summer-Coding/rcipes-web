import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userHasRole } from '../../lib/sessionUtils.js';
import { useEffect } from 'react';

const isAllowed = (user, requiredRole = '') => {
  if (requiredRole.length === 0) {
    return true;
  }

  return userHasRole(user, requiredRole);
};

const ProtectedRoute = ({ children, redirectRoute, requiredRole }) => {
  const user = useSelector((state) => state.user);

  const redirect = () => {
    return <Navigate to={redirectRoute} replace />;
  };

  useEffect(() => {
    if (!user.isLoading && !isAllowed(user, requiredRole)) {
      redirect();
    }
  }, [user]);

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  redirectRoute: PropTypes.string.isRequired,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
