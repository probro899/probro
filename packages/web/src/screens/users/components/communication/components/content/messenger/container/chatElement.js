import React from 'react';
import { Icon } from '@blueprintjs/core';
import Moment from 'react-moment';

export default (obj) => {
  const ownMsg = obj.userId === 1;
  return (
    !ownMsg
      ? (
        <div style={{ display: 'flex', marginLeft: 10, marginBottom: 10 }}>
          {obj.imageUrl
            ? (
              // eslint-disable-next-line
              <img src="http://localhost:4001/images/userImage.jpeg" style={{ height: 50, width: 50, borderRadius: '50%' }} />
            )
            : <Icon icon="person" iconSize={30} style={{ borderRadius: '50%' }} />
          }
          <div style={{ marginLeft: 5 }}>
            <span style={{ fontSize: 8, color: '#757575' }}>{`${obj.name}  on `}</span>
            <Moment style={{ fontSize: 8, color: '#757575' }} format="YYYY-MM-DD hh:mm">{obj.timeStamp}</Moment>
            <div style={{ background: '#f1f5f9', padding: 10, maxWidth: '80%', borderRadius: 10, borderTopLeftRadius: 0 }}><span>{obj.text}</span></div>
          </div>
        </div>
      )
      : (
        <div style={{ display: 'flex', marginRight: 10, marginBottom: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <div style={{ marginLeft: 5, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Moment style={{ fontSize: 8, color: '#757575' }} format="YYYY-MM-DD hh:mm">{obj.timeStamp}</Moment>
            <div style={{ background: '#D6F4FE', padding: 10, maxWidth: '80%', borderRadius: 10, borderTopRightRadius: 0 }}><span>{obj.text}</span></div>
          </div>
        </div>
      )
  );
};
