import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextArea } from '@blueprintjs/core';

const file = require('../../assets/imageUploadIcon.png');

class ChatHistory extends React.Component {
  state = {};

  goBack = () => {
    const { change } = this.props;
    change('list');
  }

  toCallScreen = () => {
    const { change } = this.props;
    change('call');
  }

  render() {
    const { style } = this.props;
    return (
      <div
        style={style}
        className="chat-history"
      >
        <div className="top">
          <div>
            <Button
              // text="Back"
              minimal
              intent="default"
              icon="double-chevron-left"
              onClick={this.goBack}
            />
          </div>
          <div className="op-name">
            Conor Mcgregor
          </div>
          <div>
            <Button icon="phone" intent="success" onClick={this.toCallScreen} />
          </div>
        </div>
        <div className="chats">
          <div className="i-chat left">
            <div className="img-wrap">
              <img src={file} height="50px" width="50px" alt="profile of the user" />
            </div>
            <div className="text">
              Hello how are you buddy?
            </div>
          </div>
        </div>
        <div className="chat-box">
          <TextArea
            placeholder="Type here something..."
          />
          <Button
            icon="send-to"
            intent="primary"
            text="send"
          />
        </div>
      </div>
    );
  }
}

ChatHistory.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatHistory;
