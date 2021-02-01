import React from 'react';
import { Icon } from '@blueprintjs/core';
import Moment from 'react-moment';
import timeDurationFormater from './timeDurationFormater';

const callLogHelper = (type, icon, backgroundColor, msg, isList, idx) => {
  return (
    <div key={idx} style={{ width: '95%', display: 'flex', justifyContent: isList ? 'flex-start' : 'center', alignItems: 'center', margin: isList ? 0 : 10 }}>
      <span style={{ padding: 5, border: isList ? null : `1px solid ${backgroundColor}`, borderRadius: 10, fontSize: isList ? 14 : 10, background: isList ? null : backgroundColor, color: isList ? '#757575' : 'white' }}>
        <Icon icon={icon} iconSize={isList ? 13 : 10} style={{ marginRight: 5 }} />
        {`${type} ${msg.duration ? timeDurationFormater(msg.duration) : '(00:00)'}`}
        {isList ? null : <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment> }
      </span>
    </div>
  );
};

export default (msg, account, type, isList, idx) => {
  // console.log('incoming msg log', type);
  return callLogHelper('Call Ended', '', '#A6A9A9', msg, isList, idx);
  }