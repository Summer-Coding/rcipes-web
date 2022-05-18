import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const FormInput = ({ field, form: { touched, errors }, props }) => (
  <Input
    invalid={!!touched[field.name] && !!errors[field.name]}
    {...field}
    {...props}
  />
);

FormInput.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  props: PropTypes.object,
};

export default FormInput;
