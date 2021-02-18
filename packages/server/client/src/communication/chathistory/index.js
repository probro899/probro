/* eslint-disable react/prop-types */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MessageSender } from '../components';
import { normalTimeStampSorting, getName } from '../../common/utility-functions';
import { findChatHistory, markLastMessageRead } from './helper-function';
import autoCloseHandler from '../helper-functions/webrtc/mesh/autoCloseHandler';
import fetchedChatHistory from './helper-function/fetchChatHistory';
import isJanusActive from './helper-function/isJanusActive';
import messageTypeProvider from './helper-function/messageTypeProvider';
import { Spinner } from '../../common';
import { BiChevronsLeft } from "react-icons/bi";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import { Button } from '../../common/utility-functions/Button/Button';

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      lastMessageId: null,
      unSeenNo: null,
      showLoader: false,
      scrolling: false,
      currentScrollableHeight: 0,
      finishFetching: false,
      lastOffsetHeight: 0,
    };
    this.scrollToEnd = React.createRef();
    this.messageContainer = React.createRef();
  }

  async componentDidMount() {
    await fetchedChatHistory(this.props);
    const state = findChatHistory(this.props);
    this.setState({ ...state });
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
    const { scrolling, lastOffsetHeight } = this.state;
    if (!scrolling) {
      this.scrollToEnd.current.scrollIntoView({ behavior: 'auto' });
      return;
    }
    if (lastOffsetHeight && this.messageContainer.current.scrollHeight > lastOffsetHeight) {
      this.messageContainer.current.scrollTop = this.messageContainer.current.scrollHeight - lastOffsetHeight;
      this.setState({ lastOffsetHeight: this.messageContainer.current.scrollHeight });
    }
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this.messageContainer.current).removeEventListener('scroll', this.trackScrolling);
  }

  // tracking scroll for pagination
  trackScrolling = async (e) => {
    const { finishFetching, scrolling } = this.state;
    if ((e.target.scrollTop + 10 + e.target.offsetHeight) < e.target.scrollHeight && !scrolling) {
      this.setState({ scrolling: true });
    }
    if ((e.target.scrollTop + 10 + e.target.offsetHeight) > e.target.scrollHeight && scrolling) {
      this.setState({ scrolling: false })
    }
    if (finishFetching) return;
    if (e.target.scrollTop === 0) {
      this.setState({ showLoader: true, lastOffsetHeight: e.target.scrollHeight });
      const res = await fetchedChatHistory(this.props);
      this.setState({ showLoader: false, finishFetching: res.allFetched });
    }
  }

  goBack = () => {
    const { change } = this.props;
    change('list');
  }

  toCallScreen = async (mediaType) => {
    try {
      const { _callHandler, change, updateWebRtc, webRtc, account } = this.props;
      const { apis } = webRtc;
      await updateWebRtc('isCallUpgraded', false);
      await updateWebRtc('isConnecting', true);
      await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [], type: mediaType } });
      await updateWebRtc('localCallHistory', { chatHistory: webRtc.chatHistory, stream: null, mediaType, callType: 'Outgoing', callEnd: false });
      autoCloseHandler(this.props, { apis }, 62000);
      _callHandler(mediaType);
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
    const { messages, showLoader } = this.state;
    let userActiveStatus = false;
    // console.log('props in chatHistory', this.props);
    if (type === 'user') {
      const connectionDetails = database.UserConnection.byId[connectionId] || {};
      userActiveStatus = connectionDetails.activeStatus;
    }
    const { showAudio, showVideo, showJoin } = isJanusActive(this.props);
    return (
      <div
        style={{ ...style, background: '#F9FAFC' }}
        className="chat-history"
        onClick={() => markLastMessageRead(this.props, this.state)}
      >
        {!fromLive && (
          <div className="top" style={{ background: '#f6f7fd' }}>
            <div className="pc-back-btn">
              {/* <Button
                className="arrow-btn"
                minimal
                intent="default"
                icon="double-chevron-left"
                onClick={this.goBack}
              /> */}
              <BiChevronsLeft size={20} onClick={this.goBack} />
            </div>
            <div className="op-name">
              {webRtc.chatHistory.type === 'user' ? getName(user.user) : database.Board.byId[webRtc.chatHistory.connectionId].name}
              {webRtc.chatHistory.type === 'user' && userActiveStatus && <div className="green-dot" />}
            </div>
            <div className="call-control">
              {showAudio && < Button
                onClick={() => this.toCallScreen('audio')}
                icon={<FaPhoneAlt />}
                type="button"
                buttonStyle="btn--circle-icons"
                buttonSize="btn--small"
              />}
              {/* <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} /> */}
              {showVideo && <Button
                icon={<FaVideo />}
                onClick={() => this.toCallScreen('video')}
                type="button"
                buttonStyle="btn--circle-icons"
                buttonSize="btn--small"
              />}
              {/* <Button icon="mobile-video" intent="success" onClick={() => this.toCallScreen('video')} /> */}

              {showJoin && <Button
                onClick={() => this.toCallScreen('audio')}
                type="button"
                buttonStyle="btn--success--solid"
                buttonSize="btn--small"
                title="Join"
              />}
            </div>
          </div>
        )}
        <div ref={this.messageContainer} className="chats" id="pcChats" onScroll={this.trackScrolling}>
          {showLoader && (
            <div style={{ position: 'relative', height: 45 }}>
              <Spinner style={{ top: 0, left: 'calc(50% - 22.5px)', height: '100%', zIndex: 3 }} />
            </div>
          )}
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
