import React from 'react';
import Moment from 'react-moment';
import timeDurationFormater from './timeDurationFormater';
import { FiArrowDownLeft,FiArrowUpRight } from "react-icons/fi";
const callLogHelper = (type, icon, backgroundColor, msg, isList, idx) => {
  return (
    <div key={idx} style={{ width: '95%', display: 'flex', justifyContent: isList ? 'flex-start' : 'center', alignItems: 'center', margin: isList ? 0 : 10 }}>
      <span style={{ padding: 5, border: isList ? null : `1px solid ${backgroundColor}`, borderRadius: 10, fontSize: isList ? 14 : 10, background: isList ? null : backgroundColor, color: isList ? '#757575' : 'white' }}>
        {icon}
        {`${type} ${msg.duration ? timeDurationFormater(msg.duration) : ''}`}
        {isList ? null : <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment> }
      </span>
    </div>
  );
};

export default (msg, account, type, isList, idx) => {
  if (type === 'board') {
    if (msg.userId === account.user.id) {
      return callLogHelper('Outgoing Call', <FiArrowUpRight size={isList ? 13 : 10} style={{ marginRight: 5 }} />, '#A6A9A9', msg, isList, idx);
    }
  }
  if (msg.tuserId === account.user.id && !msg.duration) {
    return callLogHelper('Missed Call', <FiArrowDownLeft size={isList ? 13 : 10} style={{ marginRight: 5 }} />, '#f17d77', msg, isList, idx);
  }
  if (msg.tuserId === account.user.id) {
    return callLogHelper('Incoming Call', <FiArrowDownLeft size={isList ? 13 : 10} style={{ marginRight: 5 }} />, '#A6A9A9', msg, isList, idx);
  }

  if (msg.fuserId === account.user.id) {
    return callLogHelper('Outgoing Call', <FiArrowUpRight size={isList ? 13 : 10} style={{ marginRight: 5 }} />, '#A6A9A9', msg, isList, idx);
  }
};
