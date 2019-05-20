import React from 'react';
import PropTypes from 'prop-types';
import { Position, Toast, Toaster } from '@blueprintjs/core';

class NotifyBar extends React.Component {
  state = {
    dismiss: false,
  };

  onDismiss = () => {
    this.setState({
      dismiss: true,
    });
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
              timeout={500000}
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
};

export default NotifyBar;
