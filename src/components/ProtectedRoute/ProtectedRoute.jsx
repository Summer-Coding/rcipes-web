import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userHasRole } from '../../lib/sessionUtils.ts';

const isAllowed = (session, requiredRole = '') => {
  if (!session) {
    return false;
  }

  if (requiredRole.length === 0) {
    return true;
  }

  return userHasRole(session, requiredRole);
};

const ProtectedRoute = ({ children, redirectRoute, session, requiredRole }) => {
  if (!isAllowed(session, requiredRole)) {
    return <Navigate to={redirectRoute} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  redirectRoute: PropTypes.string.isRequired,
  session: PropTypes.object,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
