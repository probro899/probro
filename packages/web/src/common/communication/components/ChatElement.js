import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from '@blueprintjs/core';

class ChatElement extends React.Component {
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
      const { message } = this.state;
      if (message.replace(/\s/g, '').length === 0) {
        return;
      }
      const {
        account,
        apis,
        peerType,
        peerId,
        appendNewMessage,
      } = this.props;
      try {
        if (peerType === 'board') {
          await apis.addBoardMessage({
            boardId: peerId,
            message,
            userId: account.user.id,
            timeStamp: Date.now(),
            url: null,
            remarks: null,
            broadCastId: `Board-${peerId}`,
            readStatus: 0,
          });
          appendNewMessage(
            {
              boardId: peerId,
              message,
              userId: account.user.id,
              timeStamp: Date.now(),
              url: null,
              remarks: null,
              readStatus: 0,
            }
          );
        } else {
          await apis.addUserMessage({
            tuserId: peerId,
            fuserId: account.user.id,
            timeStamp: Date.now(),
            message,
            url: null,
            readStatus: 0,
            broadCastId: `UserConnection-${account.user.id}`,
            broadCastUserList: [{ userId: peerId }],
          });
          appendNewMessage({
            tuserId: peerId,
            fuserId: account.user.id,
            timeStamp: Date.now(),
            message,
            url: null,
            readStatus: 0,
          });
        }
      } catch (err) {
        console.error('Error in sending message', err);
      }
      this.setState({ message: '' });
    }
  }

  sendMessage = async () => {
    const { message } = this.state;
    if (message.replace(/\s/g, '').length === 0) {
      return;
    }
    const {
      account,
      apis,
      peerType,
      peerId,
      appendNewMessage,
    } = this.props;
    try {
      if (peerType === 'board') {
        await apis.addBoardMessage({
          boardId: peerId,
          message,
          userId: account.user.id,
          timeStamp: Date.now(),
          url: null,
          remarks: null,
          readStatus: 0,
          broadCastId: `Board-${peerId}`,
        });
        appendNewMessage(
          {
            boardId: peerId,
            message,
            userId: account.user.id,
            timeStamp: Date.now(),
            url: null,
            remarks: null,
            readStatus: 0,
          }
        );
      } else {
        await apis.addUserMessage({
          tuserId: peerId,
          fuserId: account.user.id,
          timeStamp: Date.now(),
          message,
          url: null,
          readStatus: 0,
          broadCastId: `UserConnection-${account.user.id}`,
          broadCastUserList: [{ userId: peerId }],
        });
        appendNewMessage({
          tuserId: peerId,
          fuserId: account.user.id,
          timeStamp: Date.now(),
          message,
          url: null,
          readStatus: 0,
        });
      }
    } catch (err) {
      console.error('Error in sending message', err);
    }
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="chat-box">
        <TextArea
          placeholder="Type here something..."
          onChange={this.onMessageType}
          value={message}
          onKeyPress={this.handleKeyPress}
        />
        <Button
          icon="send-to"
          intent="primary"
          text="send"
          onClick={this.sendMessage}
        />
      </div>
    );
  }
}

ChatElement.defaultProps = {
  peerId: 0,
};

ChatElement.propTypes = {
  appendNewMessage: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  peerType: PropTypes.string.isRequired,
  peerId: PropTypes.number,
};

export default ChatElement;
