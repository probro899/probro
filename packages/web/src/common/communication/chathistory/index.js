/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Moment from 'react-moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import mediaSelector from '../mediaSelector';
import { MessageSender } from '../components';
import Message from './Message';
import { normalTimeStampSorting } from '../../utility-functions';
import { findChatHistory, isOwnFinder, markLastMessageRead, incomingCallLogHandler, outgoingCallLogHandler } from './helper-function';

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
    // console.log('tocallSrean func called', mediaType);
    try {
      const { _callHandler, apis, change, updateWebRtc, webRtc } = this.props;
      const stream = await mediaSelector(mediaType);
      updateWebRtc('localCallHistory', { chatHistory: webRtc.chatHistory, stream, mediaType, callType: 'Outgoing', callEnd: false });
      if (webRtc.chatHistory.type === 'user') {
        updateWebRtc('streams', { ...webRtc.streams, [webRtc.chatHistory.user.user.id]: { stream: [] } });
      }
      _callHandler(apis, stream);
      change('connecting');
    } catch (e) {
      console.error('Error in calling', e);
    }
  }

  containerHandler = (msg, account, type) => {
    // console.log('message type', msg);
    const { webRtc } = this.props;
    switch (msg.type) {
      case 'date':
        return (
          <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Moment style={{ color: '#757575', padding: 5, border: '1px solid #757575', borderRadius: 10, fontSize: 10 }} format="YYYY MMM DD">{msg.timeStamp}</Moment>
          </div>
        );
      case 'Incoming':
        return (
          incomingCallLogHandler(msg, account, webRtc.chatHistory.type)
        );
      case 'Outgoing':
        return (
          outgoingCallLogHandler(msg, account, webRtc.chatHistory.type)
        );
      default:
        return <Message own={isOwnFinder(msg, this.props)} obj={msg} props={this.props} type={type} />;
    }
  }

  render() {
    const {
      style,
      webRtc,
      database,
      account,
      fromLive,
    } = this.props;
    // console.log('chat historyList state', this.state);
    const { user, boardDetails } = webRtc.chatHistory;
    const { messages } = this.state;
    return !webRtc.showCommunication ? <div /> : (
      <div
        style={{ ...style, background: '#DDE1E2' }}
        className="chat-history"
        onClick={() => markLastMessageRead(this.props, this.state)}
      >
        {!fromLive && (
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
            {webRtc.chatHistory.type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.chatHistory.connectionId].name}
          </div>
          <div className="call-control">
            <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />
            <Button icon="mobile-video" intent="success" onClick={() => this.toCallScreen('video')} />
          </div>
        </div>
        )}
        <ScrollToBottom className="chats" checkInterval={1}>
          {
          messages.sort(normalTimeStampSorting).map((msg, idx, arr) => this.containerHandler(msg, account, idx === 0 ? false : arr[idx - 1].type))
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
  updateWebRtc: PropTypes.func.isRequired,
  fromLive: PropTypes.bool.isRequired,
};

export default ChatHistory;
