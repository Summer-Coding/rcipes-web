import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup } from 'reactstrap';
import { FormLabel } from '../shared';
import FormInputWrapper from './FormInputWrapper';
import './form-field.css';
import { ErrorMessage } from 'formik';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const FormField = ({
  append,
  disabled,
  grid,
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
  const col = {};
  const labelCol = {};

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

  if (grid) {
    for (const colSize of colSizes) {
      if (grid[colSize]) {
        // eslint-disable-next-line no-unused-vars
        row = true;
        const sizeNum = Number.parseInt(grid[colSize], 10);
        col[colSize] = sizeNum;
        labelCol[colSize] = 12 - sizeNum;
      }
    }
  }

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
        labelCol={labelCol}
        required={required}
        size={size}
      >
        {name}
      </FormLabel>
      <FormInputWrapper
        append={append}
        inputProps={inputProps}
        prepend={prepend}
      />
      <ErrorMessage component={FormFeedback} name={name} />
    </FormGroup>
  );
};

FormField.propTypes = {
  append: PropTypes.node,
  children: PropTypes.func,
  disabled: PropTypes.bool,
  grid: PropTypes.object,
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
