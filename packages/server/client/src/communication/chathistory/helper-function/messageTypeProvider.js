import React from 'react';
import Moment from 'react-moment';
import Message from '../Message';
import { incomingCallLogHandler, outgoingCallLogHandler, isOwnFinder, callEndLogHandler } from './index';

const messageTypeProvider = (props, msg, account, type, idx) => {
  const { webRtc } = props;
  switch (msg.type) {
    case 'date':
      return (
        <div className="pc-date-indicator" key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <Moment style={{ color: '#757575', padding: 7, border: '1px solid #757575', borderRadius: 10, fontSize: 10 }} format="YYYY MMM DD">{msg.timeStamp}</Moment>
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
    case 'CallEnd':
      return (
        callEndLogHandler(msg, account, webRtc.chatHistory.type, idx)
      );
    default:
      return msg.message ? <Message key={msg.id} own={isOwnFinder(msg, props)} obj={msg} props={props} type={type} /> : null;
  }
};
export default messageTypeProvider;
