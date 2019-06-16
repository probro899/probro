import React from 'react';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Form } from '../common';

class PopoverForm extends React.Component {
  state = {};

  render() {
    const { isOpen, onClose, structure, callback } = this.props;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <Form data={structure} callback={callback} />
      </Dialog>
    );
  }
}

PopoverForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  structure: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default PopoverForm;
