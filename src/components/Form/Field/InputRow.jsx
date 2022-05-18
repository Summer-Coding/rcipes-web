import React from 'react';
import PropTypes from 'prop-types';
import Col from 'reactstrap';

const InputRow = ({ children, col, row }) => (
  <>{row ? <Col {...col}>{children}</Col> : { children }}</>
);

InputRow.propTypes = {
  children: PropTypes.node.isRequired,
  col: PropTypes.object,
  row: PropTypes.bool.isRequired,
};

export default InputRow;
