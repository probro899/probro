import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@blueprintjs/core';

class DeletePopOver extends React.Component {
  state = {};

  render() {
    const { yesAction, noAction, isOpen, name } = this.props;
    return (
      <Dialog
        isOpen={isOpen}
      >
        <div className="container-delete-popover">
          {`Are you sure to delete ?${name}`}
        </div>
        <div>
          <Button
            text="Delete"
            intent="danger"
            onClick={yesAction}
          />
          <Button
            text="Cancle"
            onClick={noAction}
          />
        </div>
      </Dialog>
    );
  }
}

DeletePopOver.propTypes = {
  yesAction: PropTypes.func.isRequired,
  noAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default DeletePopOver;
