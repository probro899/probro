import React from 'react';
import { Icon } from '@blueprintjs/core';
import Moment from 'react-moment';
import timeDurationFormater from './timeDurationFormater';

export default (msg, account, type) => {
  if (type === 'board') {
    if (msg.userId === account.user.id) {
      return (
        <div style={{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <span style={{ padding: 5, border: '1px solid #A6A9A9', borderRadius: 10, fontSize: 10, background: '#A6A9A9', color: 'white' }}>
            <Icon icon="arrow-top-right" iconSize={10} style={{ marginRight: 5 }} />
            {`Outgoing Call ${msg.duration ? timeDurationFormater(msg.duration) : ''}   `}
            <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
          </span>
        </div>
      );
    }
  }
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
          {`Incoming Call ${msg.duration ? timeDurationFormater(msg.duration) : ''}`}
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
          {`Outgoing Call ${msg.duration ? timeDurationFormater(msg.duration) : ''}   `}
          <Moment format="h:mm:a" style={{ marginLeft: 10 }}>{msg.timeStamp}</Moment>
        </span>
      </div>
    );
  }
};
