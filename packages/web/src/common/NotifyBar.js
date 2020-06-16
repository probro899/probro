import React from 'react';
import PropTypes from 'prop-types';
import { Position, Toast, Toaster } from '@blueprintjs/core';

class NotifyBar extends React.Component {
  state = {
    dismiss: false,
  };

  onDismiss = () => {
    const { onClose } = this.props;
    this.setState({
      dismiss: true,
    });
    onClose();
  }

  render() {
    const { dismiss } = this.state;
    const { message, intent } = this.props;
    return (
      <Toaster
        position={Position.TOP}
      >
        { !dismiss
          && (
            <Toast
              message={message}
              intent={intent}
              onDismiss={this.onDismiss}
              timeout={5000}
            />
          )
        }
      </Toaster>
    );
  }
}

NotifyBar.propTypes = {
  message: PropTypes.string.isRequired,
  intent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotifyBar;
