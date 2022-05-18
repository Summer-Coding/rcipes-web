import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

const Feedback = ({ name, rest }) => (
  <ErrorMessage
    component={FormFeedback}
    id={`${name}-feedback`}
    name={name}
    {...rest}
  />
);

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.object,
};

export default Feedback;
