import React from 'react';
import { TextArea, Button, Icon } from '@blueprintjs/core';
import { sendMessage } from '../helper-functions/webrtc/mesh';

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
    return (
      <div className="chat-box" style={{ marginTop: 10 }}>
        <TextArea
          rows={2}
          placeholder="Message..."
          onChange={this.onMessageType}
          value={message}
          onKeyPress={this.handleKeyPress}
        />
        <Button
          style={{ background: '#154155', color: 'white', width: '10%' }}
          rightIcon={<Icon icon="direction-right" color="white" iconSize={25} />}
          onClick={this.sendMessage}
        />
      </div>
    );
  }
}

MessageSender.defaultProps = {
  peerId: 0,
};


export default MessageSender;
