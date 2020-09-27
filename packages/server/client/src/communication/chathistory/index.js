/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from '@blueprintjs/core';
import { MessageSender } from '../components';
import { normalTimeStampSorting, getName } from '../../common/utility-functions';
import { findChatHistory, markLastMessageRead } from './helper-function';
import autoCloseHandler from '../helper-functions/webrtc/mesh/autoCloseHandler';
import fetchedChatHistory from './helper-function/fetchChatHistory';
import isJanusActive from './helper-function/isJanusActive';
import messageTypeProvider from './helper-function/messageTypeProvider';

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], lastMessageId: null, unSeenNo: null };
    this.scrollToEnd = React.createRef();
  }

  async componentDidMount() {
    await fetchedChatHistory(this.props);
    const state = findChatHistory(this.props);
    this.setState({ ...state });
    this.scrollToBottom();
  }

  async componentWillReceiveProps(newProps) {
    const { database } = newProps;
    const preDatabase = this.props.database;
    if (
      !_.isEqual(preDatabase.UserMessage.byId, database.UserMessage.byId)
      || !_.isEqual(preDatabase.UserMessageSeenStatus.byId, database.UserMessageSeenStatus.byId)
      || !_.isEqual(preDatabase.BoardMessage.byId, database.BoardMessage.byId)
      || !_.isEqual(preDatabase.BoardMessageSeenStatus.byId, database.BoardMessageSeenStatus.byId)
    ) {
      const state = findChatHistory(newProps);
      this.setState({ ...state });
    }
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
      const { _callHandler, apis, change, updateWebRtc, webRtc, account } = this.props;
      await updateWebRtc('isCallUpgraded', false);
      await updateWebRtc('isConnecting', true);
      await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [], type: mediaType } });
      await updateWebRtc('localCallHistory', { chatHistory: webRtc.chatHistory, stream: null, mediaType, callType: 'Outgoing', callEnd: false });
      autoCloseHandler(this.props, { apis }, 62000);
      _callHandler(apis, null, mediaType);
      change('connecting');
    } catch (e) {
      console.error('Error in calling', e);
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
    const { user, connectionId, type } = webRtc.chatHistory;
    const { messages } = this.state;
    let userActiveStatus = false;
    if (type === 'user') {
      userActiveStatus = database.UserConnection.byId[connectionId].activeStatus;
    }
    const { showAudio, showVideo, showJoin } = isJanusActive(this.props);
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
            {webRtc.chatHistory.type === 'user' && userActiveStatus && <div className="green-dot" />}
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
            messages.sort(normalTimeStampSorting).map((msg, idx, arr) => messageTypeProvider(this.props, msg, account, idx === 0 ? false : arr[idx - 1].type))
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