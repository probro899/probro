import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import mediaSelector from './mediaSelector';
import { ChatElement, Message } from './components';
import { normalTimeStampSorting } from '../../screens/users/utility-functions';

class ChatHistory extends React.Component {
  state = {
    allMessages: [],
  };

  componentDidUpdate(prevState) {
    const { database, webRtc, account } = this.props;
    const messages = [];
    if (webRtc.showCommunication) {
      const userId = account.user.id;
      if (webRtc.peerType === 'user') {
        database.UserMessage.allIds.map((id) => {
          const message = database.UserMessage.byId[id];
          if (message.tuserId === userId || message.fuserId === userId) {
            messages.push(message);
          }
        });
      }
      if (webRtc.peerType === 'board') {
        database.BoardMessage.allIds.map((id) => {
          const message = database.BoardMessage.byId[id];
          if (message.boardId === webRtc.showCommunication) {
            messages.push(message);
          }
        });
      }
      if (database.UserMessage.allIds !== prevState.database.UserMessage.allIds || webRtc.showCommunication !== prevState.webRtc.showCommunication) {
        this.setState({
          allMessages: messages,
        });
      }
    }
  }

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

  appendNewMessage = (obj) => {
    const { allMessages } = this.state;
    allMessages.push(obj);
    this.setState({
      allMessages,
    });
  }

  render() {
    const {
      style,
      webRtc,
      account,
      apis,
      database,
    } = this.props;
    let fullName = '';
    if (webRtc.showCommunication) {
      if (webRtc.peerType === 'user') {
        const id = webRtc.showCommunication;
        fullName = database.User.byId[id].middleName ? `${database.User.byId[id].firstName} ${database.User.byId[id].middleName} ${database.User.byId[id].lastName}` : `${database.User.byId[id].firstName} ${database.User.byId[id].lastName}`;
      }
      if (webRtc.peerType === 'board') {
        fullName = database.Board.byId[webRtc.showCommunication].name;
      }
    }
    const { allMessages } = this.state;
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
            {fullName}
          </div>
          <div className="call-control">
            <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />
            <Button icon="mobile-video" intent="danger" onClick={() => this.toCallScreen('video')} />
          </div>
        </div>
        <ScrollToBottom className="chats">
          {
            allMessages.sort(normalTimeStampSorting).map((obj, index) => {
              const own = account.user && obj.fuserId === account.user.id;
              return (
                <Message
                  key={index}
                  own={own}
                  obj={obj}
                />
              );
            })
          }
        </ScrollToBottom>
        <ChatElement
          apis={apis}
          account={account}
          peerId={webRtc.showCommunication}
          peerType={webRtc.peerType}
          appendNewMessage={this.appendNewMessage}
        />
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatHistory;
