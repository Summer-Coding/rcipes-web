import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { InputGroup } from 'reactstrap';
import FormInputGroupAddon from './FormInputGroupAddon';
import FormInput from './FormInput';

const FormInputWrapper = ({ append, inputProps, prepend }) => {
  const includePrepend = typeof prepend !== 'undefined';
  const includeAppend = typeof append !== 'undefined';
  const includeAddon = includePrepend || includeAppend;

  return (
    <>
      {includeAddon ? (
        <InputGroup>
          {includePrepend && (
            <FormInputGroupAddon>{prepend}</FormInputGroupAddon>
          )}
          <Field
            name={inputProps.name}
            type={inputProps.type}
            render={<FormInput {...inputProps} />}
          />
          {includeAppend && <FormInputGroupAddon>{append}</FormInputGroupAddon>}
        </InputGroup>
      ) : (
        <Field
          name={inputProps.name}
          type={inputProps.type}
          component={FormInput}
          props={inputProps}
        />
      )}
    </>
  );
};

FormInputWrapper.propTypes = {
  inputProps: PropTypes.object,
  prepend: PropTypes.string,
  append: PropTypes.string,
  type: PropTypes.string,
};

FormInputWrapper.defaultProps = {
  prepend: undefined,
  append: undefined,
};

export default FormInputWrapper;
