import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';
import { FormFeedback, FormGroup } from 'reactstrap';
import { FormLabel } from '../shared';
import FormInputWrapper from './FormInputWrapper';
import FormInput from './FormInput';
import './form-field.css';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const FormField = ({
  append,
  disabled,
  groupAttributes,
  helpMessage,
  inline,
  inputAttributes,
  inputClass,
  labelAttributes,
  labelClass,
  labelHidden,
  name,
  prepend,
  readOnly,
  required,
  size,
  tag,
  type,
}) => {
  let row = false;
  const inputId = name;

  const inputProps = {
    attributes: inputAttributes,
    className: inputClass,
    disabled,
    feedback: helpMessage,
    id: inputId,
    name,
    readOnly,
    required,
    size,
    type,
  };

  return (
    <FormGroup
      disabled={disabled}
      inline={inline}
      row={row}
      tag={tag}
      {...groupAttributes}
    >
      <FormLabel
        attributes={labelAttributes}
        className={labelClass}
        disabled={disabled}
        hidden={labelHidden}
        inputId={`${inputId}-label`}
        required={required}
        size={size}
      >
        {name}
      </FormLabel>
      <FormInputWrapper append={append} prepend={prepend}>
        <Field
          name={name}
          type={type}
          component={FormInput}
          props={inputProps}
        />
      </FormInputWrapper>
      <ErrorMessage component={FormFeedback} name={name} />
    </FormGroup>
  );
};

FormField.propTypes = {
  append: PropTypes.node,
  children: PropTypes.func,
  disabled: PropTypes.bool,
  groupAttributes: PropTypes.object,
  helpMessage: PropTypes.node,
  inline: PropTypes.bool,
  inputAttributes: PropTypes.object,
  inputClass: PropTypes.string,
  labelAttributes: PropTypes.object,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  name: PropTypes.string.isRequired,
  prepend: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf([...colSizes]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.oneOf(['text', 'password', 'file', 'phone', 'email']),
};

FormField.defaultProps = {
  required: false,
  inline: false,
};

export default FormField;
