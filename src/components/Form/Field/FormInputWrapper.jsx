import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'reactstrap';
import FormInputGroupAddon from './FormInputGroupAddon';

const FormInputWrapper = ({ children, append, prepend }) => (
  <InputGroup>
    {typeof prepend !== 'undefined' && (
      <FormInputGroupAddon>{prepend}</FormInputGroupAddon>
    )}
    {children}
    {typeof append !== 'undefined' && (
      <FormInputGroupAddon>{append}</FormInputGroupAddon>
    )}
  </InputGroup>
);

FormInputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  prepend: PropTypes.string,
  append: PropTypes.string,
};

FormInputWrapper.defaultProps = {
  prepend: undefined,
  append: undefined,
};

export default FormInputWrapper;
