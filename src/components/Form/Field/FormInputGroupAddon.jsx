import React from 'react';
import PropTypes from 'prop-types';
import { InputGroupText } from 'reactstrap';

const FormInputGroupAddon = ({ children }) => (
  <>
    {typeof children === 'string' ? (
      <InputGroupText>{children}</InputGroupText>
    ) : (
      { children }
    )}
  </>
);

FormInputGroupAddon.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default FormInputGroupAddon;
