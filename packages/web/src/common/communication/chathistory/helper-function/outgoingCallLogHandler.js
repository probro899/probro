import React from 'react';
import { Icon } from '@blueprintjs/core';
import Moment from 'react-moment';
import timeDurationFormater from './timeDurationFormater';

const callLogHelper = (type, icon, backgroundColor, msg, isList) => {
  return (
    <div style={{ width: '95%', display: 'flex', justifyContent: isList ? 'flex-start' : 'center', alignItems: 'center', margin: isList ? 0 : 10 }}>
      <span style={{ padding: 5, border: isList ? null : `1px solid ${backgroundColor}`, borderRadius: 10, fontSize: isList ? 14 : 10, background: isList ? null : backgroundColor, color: isList ? '#757575' : 'white' }}>
        <Icon icon={icon} iconSize={isList ? 13 : 10} style={{ marginRight: 5 }} />
        {`${type} ${msg.duration ? timeDurationFormater(msg.duration) : ''}`}
        {isList ? null : <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment> }
      </span>
    </div>
  );
};

export default (msg, account, type, isList) => {
  if (type === 'board') {
    if (msg.userId === account.user.id) {
      return callLogHelper('Outgoing Call', 'arrow-top-right', '#A6A9A9', msg, isList);
    }
  }
  if (msg.tuserId === account.user.id && !msg.duration) {
    return callLogHelper('Missed Call', 'arrow-bottom-left', '#f17d77', msg, isList);
  }
  if (msg.tuserId === account.user.id) {
    return callLogHelper('Incoming Call', 'arrow-bottom-left', '#A6A9A9', msg, isList);
  }

  if (msg.fuserId === account.user.id) {
    return callLogHelper('Outgoing', 'arrow-top-right', '#A6A9A9', msg, isList);
  }
};
