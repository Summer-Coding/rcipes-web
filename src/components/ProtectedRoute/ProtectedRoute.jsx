import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, redirectRoute, session }) => {
  if (!session) {
    return <Navigate to={redirectRoute} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  redirectRoute: PropTypes.string.isRequired,
  session: PropTypes.object,
};

export default ProtectedRoute;
