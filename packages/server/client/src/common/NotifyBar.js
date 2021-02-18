import React from 'react';
import PropTypes from 'prop-types';
import Toaster from '../common/Toast';

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
      <>
      <Toaster
       onDismiss={this.onDismiss}
       message={message}
       intent={intent}
       position="top"
       timeOut="5000"
      />
      </>
    );
  }
}

NotifyBar.propTypes = {
  message: PropTypes.string.isRequired,
  intent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotifyBar;
