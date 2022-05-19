import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import cn from 'classnames';

const FormLabel = ({
  children,
  attributes,
  className,
  disabled,
  hidden,
  inputId,
  required,
  size,
}) => (
  <Label
    className={cn('text-capitalize', className)}
    disabled={disabled}
    for={inputId}
    hidden={hidden}
    id={`${inputId}-label`}
    required={required}
    size={size}
    {...attributes}
  >
    {children}
  </Label>
);

FormLabel.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

FormLabel.defaultProps = {
  required: false,
};

export default FormLabel;
