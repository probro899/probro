/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import moment from 'moment';
import { Icon } from '@blueprintjs/core';
import { ENDPOINT } from '../../../config';

export default ({ clo, idx }) => {
  // console.log('data in chatlist Item', clo);
  const isUser = clo.type === 'user';
  return (
    <div
      key={idx}
      style={
        { cursor: 'pointer', padding: 5, background: clo.mouseHoverId === idx ? '#d6f4fe' : 'white' }
        }
      onClick={() => clo.onClick(clo)}
      onMouseOver={() => clo.onMouseHover(idx)}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            {(isUser ? clo.user.userDetails && clo.user.userDetails.image : clo.boardDetails.image)
              ? <img alt="profile-img" src={`${ENDPOINT}/user/${10000000 + parseInt(clo.user.user.id, 10)}/profile/${clo.user.userDetails.image}`} style={{ height: 30, width: 30, borderRadius: '50%'}} />
              : <Icon icon={isUser ? 'user' : 'application'} iconSize={30} style={{ color: '#757575' }} />
            }
            {isUser ? clo.user.user.activeStatus ? <div style={{ marginLeft: -5, marginTop: 20, height: 8, width: 8, borderRadius: '50%', background: '#A4DE02' }} /> : <div style={{ marginLeft: -5, marginTop: 20, height: 8, width: 8, borderRadius: '50%', background: '#f5f5f5' }} /> : null}
            {/* {!isUser && clo.boardDetails.activeStatus ? <div style={{ marginLeft: -5, marginTop: 20, height: 8, width: 8, borderRadius: '50%', background: '#A4DE02' }} /> : <div style={{ marginLeft: -5, marginTop: 20, height: 8, width: 8, borderRadius: '50%', background: '#f5f5f5' }} />} */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <span style={{ fontWeight: 'bold' }}>{isUser ? clo.user.user.firstName : clo.boardDetails.name}</span>
            <span
              style={{ fontSize: 14, color: '#757575', width: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              {clo.lastMessage}
            </span>
          </div>
          {!isUser && clo.boardDetails.activeStatus && <span style={{ background: 'green', width: 40, height: 20, fontWeight: 'bold', paddingTop: 2, borderRadius: '10%', color: 'white', textAlign: 'center', marginTop: 10 }}>live</span>}
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 12, color: '#757575' }}>{moment(clo.timeStamp).fromNow()}</span>
          {clo.unSeenNo > 0 && (
            <div style={{ marginTop: 5, position: 'relative', backgroundColor: 'green', height: 20, width: 20, borderRadius: '50%', justifyContent: 'center', display: 'flex', color: 'white', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 'bold' }}>{clo.unSeenNo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
