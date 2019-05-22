import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@blueprintjs/core';

class DeletePopOver extends React.Component {
  state = {};

  render() {
    const { action, isOpen, name } = this.props;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={() => action('cancle')}
      >
        <div className="container-delete-popover">
          Are you sure you want to delete
          <span style={{ color: 'red' }}>{name}</span>
          ?
        </div>
        <div>
          <Button
            text="Delete"
            intent="danger"
            onClick={() => action('confirm')}
          />
          <Button
            text="Cancle"
            onClick={() => action('cancle')}
          />
        </div>
      </Dialog>
    );
  }
}

DeletePopOver.propTypes = {
  action: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default DeletePopOver;
