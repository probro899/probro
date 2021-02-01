import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Form, DeletePopOver } from '../common';

class PopoverForm extends React.Component {
  state = { deletePopover: false };

  toggleDeletePopup = (type) => {
    const { deletePopover } = this.state;
    const { onDelete } = this.props;
    this.setState({
      deletePopover: !deletePopover,
    });
    if (type === 'confirm') {
      onDelete();
    }
  }

  render() {
    const {
      isOpen, onClose, structure, callback,
      del,
    } = this.props;
    const { deletePopover } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="popover-form">
          <div className="top">
            Enter the Credentials
          </div>
          <Form data={structure} callback={callback} />
          { del && (
            <div className="pc-pop-delete-button">
              <DeletePopOver
                action={this.toggleDeletePopup}
                isOpen={deletePopover}
                name=" "
              />
              <Button
                onClick={this.toggleDeletePopup}
                minimal
                text="Delete"
                icon="delete"
                large
                fill
              />
            </div>
          )}
        </div>
      </Dialog>
    );
  }
}

PopoverForm.defaultProps = {
  onDelete: null,
  del: null,
};

PopoverForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  structure: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  del: PropTypes.objectOf(PropTypes.any),
};

export default PopoverForm;
