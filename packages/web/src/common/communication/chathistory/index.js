/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import mediaSelector from '../mediaSelector';
import { MessageSender, Message } from '../components';
import { normalTimeStampSorting } from '../../utility-functions';
import { findChatHistory, isOwnFinder, markLastMessageRead } from './helper-function';

class ChatHistory extends React.Component {
  state = { messages: [], lastMessageId: null, unSeenNo: null };

  componentDidMount() {
    const state = findChatHistory(this.props);
    this.setState({ ...state });
  }

  componentWillReceiveProps(props) {
    const state = findChatHistory(props);
    this.setState({ ...state });
  }

  goBack = () => {
    const { change } = this.props;
    change('list');
  }

  toCallScreen = async (mediaType) => {
    const { _callHandler, apis, change } = this.props;
    const stream = await mediaSelector(mediaType);
    _callHandler(apis, stream);
    change('connecting');
  }

  render() {
    const {
      style,
      webRtc,
    } = this.props;
    console.log('chat historyList state', this.state);
    const { user, boardDetails } = webRtc.chatHistory;
    const { messages } = this.state;
    return !webRtc.showCommunication ? <div /> : (
      <div
        style={{ ...style, background: '#DDE1E2' }}
        className="chat-history"
        onClick={() => markLastMessageRead(this.props, this.state)}
      >
        <div className="top" style={{ background: 'white' }}>
          <div>
            <Button
              minimal
              intent="default"
              icon="double-chevron-left"
              onClick={this.goBack}
            />
          </div>
          <div className="op-name">
            {user ? `${user.user.firstName} ${user.user.lastName}` : boardDetails.name}
          </div>
          <div className="call-control">
            <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />
            <Button icon="mobile-video" intent="danger" onClick={() => this.toCallScreen('video')} />
          </div>
        </div>
        <ScrollToBottom className="chats">
          {
          messages.sort(normalTimeStampSorting).map(msg => <Message own={isOwnFinder(msg, this.props)} obj={msg} props={this.props} />)
          }
        </ScrollToBottom>
        <MessageSender {...this.props} />
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
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default ChatHistory;