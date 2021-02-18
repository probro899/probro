import React from 'react';
import PropTypes from 'prop-types';
import { sendMessage } from '../helper-functions/webrtc/mesh';
import { FiSend } from "react-icons/fi";
import { FormTextArea } from '../../common/Form/FormTextArea';
import { Button } from '../../common/utility-functions/Button/Button';

class MessageSender extends React.Component {
  state = {
    message: '',
  };

  onMessageType = (e) => {
    this.setState({
      message: e.target.value,
    });
  }

  handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage = async () => {
    const { message } = this.state;
    if (message.replace(/\s/g, '').length === 0) {
      return;
    }
    this.setState({ message: '' });
    try { await sendMessage({ ...this.props, message }); } catch { console.log('Error'); }
  }

  render() {
    const { message } = this.state;
    const { webRtc, database } = this.props;
    const connetion = database.UserConnection.byId[webRtc.chatHistory.connectionId] || {};
    const isDeleted = connetion.status === 'deleted' || connetion.status === 'pending';

    return (
      <div className="chat-box" style={{ marginTop: 10, marginBottom: 0 }}>
        <FormTextArea
          rows={2}
          disabled={isDeleted}
          placeholder="Enter your message here..."
          onChange={this.onMessageType}
          value={message}
          onKeyPress={this.handleKeyPress}
        />
        <div className="pc-send-btn">
          <Button
            icon={<FiSend />}
            disabled={isDeleted}
            onClick={this.sendMessage}
            type="button"
            buttonStyle="btn--circle-icons"
            buttonSize="btn--small"
          />
        </div>

      </div>
    );
  }
}

MessageSender.defaultProps = {
  peerId: 0,
};


export default MessageSender;
MessageSender.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};
