/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Moment from 'react-moment';
import mediaSelector from '../mediaSelector';
import { MessageSender } from '../components';
import getName from '../../utility-functions/getName';
import Message from './Message';
import { normalTimeStampSorting } from '../../utility-functions';
import { findChatHistory, isOwnFinder, markLastMessageRead, incomingCallLogHandler, outgoingCallLogHandler } from './helper-function';
import autoCloseHandler from '../helper-functions/webrtc/mesh/autoCloseHandler';
import store from '../../../store';

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], lastMessageId: null, unSeenNo: null };
    this.scrollToEnd = React.createRef();
  }

  async componentDidMount() {
    const { apis, webRtc, database } = this.props;
    const { connectionId, type } = webRtc.chatHistory;
    let isFetchMessage;
    if (type === 'user') {
      isFetchMessage = Object.values(database.UserMessage.byId).find(m => m.connectionId === connectionId);
      if (!isFetchMessage) {
        apis.getChatHistory({ type, connectionId });
      }
    }

    if (type === 'board') {
      isFetchMessage = Object.values(database.BoardMessage.byId).find(bm => bm.boardId === connectionId);
      if (!isFetchMessage) {
        apis.getChatHistory({ type, connectionId });
      }
    }

    const state = findChatHistory(this.props);
    // console.log('chat History', state);
    this.setState({ ...state });
    this.scrollToBottom();
  }

  async componentWillReceiveProps(props) {
    const { apis, webRtc, database } = this.props;
    const { connectionId, type } = webRtc.chatHistory;
    let isFetchMessage = false;

    if (type === 'user') {
      isFetchMessage = Object.values(database.UserMessage.byId).find(m => m.connectionId === connectionId);
      if (!isFetchMessage) {
        apis.getChatHistory({ type, connectionId });
      }
    }

    if (type === 'board') {
      isFetchMessage = Object.values(database.BoardMessage.byId).find(bm => bm.boardId === connectionId);
      if (!isFetchMessage) {
        apis.getChatHistory({ type, connectionId });
      }
    }

    const state = findChatHistory(props);
    // console.log('chat History data', state);
    this.setState({ ...state });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.scrollToEnd.current.scrollIntoView({ behavior: 'auto' });
  }

  goBack = () => {
    const { change } = this.props;
    change('list');
  }

  toCallScreen = async (mediaType) => {
    // console.log('tocallSrean func called', mediaType);
    try {
      const { _callHandler, apis, change, updateWebRtc, webRtc, account, database } = this.props;
      // const stream = await mediaSelector(mediaType);
      await updateWebRtc('isCallUpgraded', false);
      await updateWebRtc('isConnecting', true);
      // await updateWebRtc('streams', { [account.user.id]: { stream: [] } });
      await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [], type: mediaType } });
      await updateWebRtc('localCallHistory', { chatHistory: webRtc.chatHistory, stream: null, mediaType, callType: 'Outgoing', callEnd: false });
      autoCloseHandler(this.props, { apis }, 62000);
      // if (webRtc.chatHistory.type === 'user') {
      //   await updateWebRtc('mainStreamId', webRtc.chatHistory.user.user.id);
      //   await updateWebRtc('streams', { ...webRtc.streams, [webRtc.chatHistory.user.user.id]: { stream: [] } });
      // }
      // if (webRtc.chatHistory.type === 'board') {
      //   if (database.Board.byId[webRtc.chatHistory.connectionId].activeStatus) {
      //     updateWebRtc('mainStreamId', database.Board.byId[webRtc.chatHistory.connectionId].activeStatus);
      //   } else {
      //     updateWebRtc('mainStreamId', account.user.id);
      //   }
      // }
      _callHandler(apis, null, mediaType);
      change('connecting');
    } catch (e) {
      console.error('Error in calling', e);
    }
  }

  containerHandler = (msg, account, type, idx) => {
    const { webRtc } = this.props;
    switch (msg.type) {
      case 'date':
        return (
          <div key={idx} style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Moment style={{ color: '#757575', padding: 5, border: '1px solid #757575', borderRadius: 10, fontSize: 10 }} format="YYYY MMM DD">{msg.timeStamp}</Moment>
          </div>
        );
      case 'Incoming':
        return (
          incomingCallLogHandler(msg, account, webRtc.chatHistory.type, idx)
        );
      case 'Outgoing':
        return (
          outgoingCallLogHandler(msg, account, webRtc.chatHistory.type, idx)
        );
      default:
        return msg.message ? <Message key={msg.id} own={isOwnFinder(msg, this.props)} obj={msg} props={this.props} type={type} /> : null;
    }
  }

  isShowCallerButton = () => {
    const { webRtc, database } = store.getState();
    const { janus } = webRtc;
    let showAudio = false;
    let showVideo = false;
    let showJoin = false;

    if (janus) {
      const { oneToOneCall, conferenceCall } = janus;
      if (webRtc.chatHistory.type === 'board') {
        showAudio = !database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
        showVideo = !database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
        showJoin = database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
      } else {
        showAudio = janus.oneToOneCall;
        showVideo = janus.oneToOneCall;
      }
    }
    return { showVideo, showAudio, showJoin };
  }

  render() {
    const {
      style,
      webRtc,
      database,
      account,
      fromLive,
    } = this.props;
    console.log('props in chat history', this.props);
    const { user } = webRtc.chatHistory;
    const { messages } = this.state;
    const { showAudio, showVideo, showJoin } = this.isShowCallerButton();
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
              className="arrow-btn"
              minimal
              intent="default"
              icon="double-chevron-left"
              onClick={this.goBack}
            />
          </div>
          <div className="op-name">
            {webRtc.chatHistory.type === 'user' ? getName(user.user) : database.Board.byId[webRtc.chatHistory.connectionId].name}
            {webRtc.chatHistory.type === 'user' && user.user.activeStatus && <div className="green-dot" />}
          </div>
          <div className="call-control">
            {showAudio && <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />}
            {showVideo && <Button icon="mobile-video" intent="success" onClick={() => this.toCallScreen('video')} />}
            {showJoin && <Button intent="success" onClick={() => this.toCallScreen('audio')} text="Join" /> }
          </div>
        </div>
        )}
        <div className="chats" id="pcChats">
          {
            messages.sort(normalTimeStampSorting).map((msg, idx, arr) => this.containerHandler(msg, account, idx === 0 ? false : arr[idx - 1].type))
          }
          <div
            className="i-chat left"
            ref={this.scrollToEnd}
          />
        </div>
        <MessageSender {...this.props} />
      </div>
    );
  }
}

ChatHistory.propTypes = {
  _callHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

export default ChatHistory;
