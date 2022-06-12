import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  return (
    <>
      <h1>Profile</h1>
      <p>{user.email}</p>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
