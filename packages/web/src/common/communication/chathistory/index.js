/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@blueprintjs/core';
import Moment from 'react-moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import mediaSelector from '../mediaSelector';
import { MessageSender } from '../components';
import Message from './Message';
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
    const { _callHandler, apis, change, updateWebRtc, webRtc } = this.props;
    const stream = await mediaSelector(mediaType);
    updateWebRtc('localStream', { stream, mediaType, callType: 'Outgoing', callEnd: false });
    updateWebRtc('streams', { ...webRtc.streams, [webRtc.chatHistory.user.user.id]: { stream: [] } });
    _callHandler(apis, stream);
    change('connecting');
  }

  timeDurationFormater = (duration) => {
    const mins = Math.floor(parseInt(duration, 10) / (60 * 1000));
    const secs = Math.floor((parseInt(duration, 10) - (mins * 60 * 1000)) / 1000);
    return `(${mins} : ${secs})  `;
  }

  IncommingHandler = (msg, account) => {
    if (msg.fuserId === account.user.id && !msg.duration) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #f17d77', borderRadius: 10, fontSize: 10, background: '#f17d77', color: 'white' }}>
            <Icon icon="arrow-bottom-left" iconSize={10} style={{ marginRight: 5 }} />
            {`Miss Call`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
    if (msg.tuserId === account.user.id && !msg.duration) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-top-right" iconSize={10} style={{ marginRight: 5 }} />
            {`Outgoing Call ${msg.duration ? this.timeDurationFormater(msg.duration) : ''}`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
    if (msg.fuserId === account.user.id) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-bottom-left" iconSize={10} style={{ marginRight: 5 }} />
            {`Incoming Call ${msg.duration ? this.timeDurationFormater(msg.duration) : ''}`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
    if (msg.tuserId === account.user.id) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-top-right" iconSize={10} style={{ marginRight: 5 }} />
            {`Outgoing Call ${msg.duration ? this.timeDurationFormater(msg.duration) : ''}`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
  }


  outgoingCallHandler = (msg, account) => {

    if (msg.tuserId === account.user.id && !msg.duration) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #f17d77', borderRadius: 10, fontSize: 10, background: '#f17d77', color: 'white' }}>
            <Icon icon="arrow-bottom-left" iconSize={10} style={{ marginRight: 5 }} />
            {`Miss Call`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
    if (msg.tuserId === account.user.id) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-bottom-left" iconSize={10} style={{ marginRight: 5 }} />
            {`Incoming Call ${msg.duration ? this.timeDurationFormater(msg.duration) : ''}`}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }

    if (msg.fuserId === account.user.id) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-top-right" iconSize={10} style={{ marginRight: 5 }} />
            {`Outgoing Call ${msg.duration ? this.timeDurationFormater(msg.duration) : ''}   `}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
  }

  containerHandler = (msg, account) => {
    console.log('message type', msg);
    switch (msg.type) {
      case 'date':
        return (
          <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Moment style={{ color: '#757575', padding: 5, border: '1px solid #757575', borderRadius: 10, fontSize: 10 }} format="YYYY MMM DD">{msg.timeStamp}</Moment>
          </div>
        );
      case 'Incoming':
        return (
          this.IncommingHandler(msg, account)
        );
      case 'Outgoing':
        return (
          this.outgoingCallHandler(msg, account)
        );
      default:
        return <Message own={isOwnFinder(msg, this.props)} obj={msg} props={this.props} />;
    }
  }

  render() {
    const {
      style,
      webRtc,
      database,
      account,
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
            {webRtc.chatHistory.type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.showCommunication].name}
          </div>
          <div className="call-control">
            <Button icon="phone" intent="success" onClick={() => this.toCallScreen('audio')} />
            <Button icon="mobile-video" intent="success" onClick={() => this.toCallScreen('video')} />
          </div>
        </div>
        <ScrollToBottom className="chats">
          {
          messages.sort(normalTimeStampSorting).map(msg => this.containerHandler(msg, account))
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
};

export default ChatHistory;
