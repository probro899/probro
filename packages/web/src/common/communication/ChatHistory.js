import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import mediaSelector from './mediaSelector';
import { ChatElement, Message } from './components';

const file = require('../../assets/imageUploadIcon.png');

class ChatHistory extends React.Component {
  state = {};

  goBack = () => {
    const { change } = this.props;
    change('list');
  }

  toCallScreen = async (mediaType) => {
    const { _callHandler, apis, change } = this.props;
    const stream = await mediaSelector(mediaType);
    _callHandler(apis, stream);
    change('call');
  }

  render() {
    const { style, webRtc, account, apis } = this.props;
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
          <div className="call-control">
            <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />
            <Button icon="mobile-video" intent="danger" onClick={() => this.toCallScreen('video')} />
          </div>
        </div>
        <ScrollToBottom className="chats">
          {
            webRtc.messages.map((obj, index) => {
              const own = account.user && obj.userId === account.user.id;
              return (
                <Message
                  key={index}
                  own={own}
                  file={file}
                  obj={obj}
                />
              );
            })
          }
        </ScrollToBottom>
        <ChatElement apis={apis} account={account} />
      </div>
    );
  }
}

ChatHistory.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  _callHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatHistory;
