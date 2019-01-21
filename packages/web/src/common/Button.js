import React from 'react';
import PropTypes from 'prop-types';
import { Button, Intent } from '@blueprintjs/core';

const CustomButton = ({ text }) => (
  <div className="btn-group">
    <Button text={text} intent={Intent.PRIMARY} fill large />
  </div>
);

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
};
export default CustomButton;
