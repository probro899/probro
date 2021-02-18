/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import moment from 'moment';
import { ENDPOINT } from '../../config';
import store from '../../store';
import { incomingCallLogHandler, outgoingCallLogHandler } from '../chathistory/helper-function';
import { RoundPicture } from '../../components';

export default ({ clo, idx }) => {
  const isUser = clo.type === 'user';
  let userActive = {};
  let isBoardLive;
  if (isUser) {
    userActive = clo.props.database.UserConnection.byId[clo.connectionId] || {};
  }
  if (!isUser) {
    isBoardLive = clo.props.database.Board.byId[clo.boardDetails.id].activeStatus;
  }

  return (
    <div
      className="pc-chat-indi-wrap"
      key={idx}
      style={
        { cursor: 'pointer', padding: '5px 10px 5px 5px', background: clo.mouseHoverId === idx ? '#d6f4fe' : 'white' }
      }

      onClick={() => clo.onClick(clo)}
      onMouseOver={() => clo.onMouseHover(idx)}
    >
      <div className="pc-chat-indi" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className="pc-chat-user" style={{ display: 'flex', position: 'relative' }}>
          {isUser
            ? <div className="profile-icon"><RoundPicture imgUrl={clo.user.userDetails && clo.user.userDetails.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(clo.user.user.id, 10)}/profile/${clo.user.userDetails.image}` : '/assets//graphics/user.svg'} /></div>
            : <div className="class-icon">
              <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
            </div>
          }
          {isUser && userActive.activeStatus && <div className="green-dot" />}
          <div className="pc-chat-user-detail" style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <div className="pc-chat-username" style={{ fontWeight: 'bold' }}>
              <span>{isUser ? clo.user.user.firstName : clo.boardDetails.name}</span>
              {!isUser && isBoardLive && <span style={{ background: 'green', padding: 3, fontSize: 10, marginLeft: 5, fontWeight: 'lighter', borderRadius: 5, color: 'white' }}>Live</span>}
            </div>
            <span
              className="last-text"
            >
              {clo.lastMessage && (clo.lastMessage.type
                ? (clo.lastMessage.type === 'Incoming' ? incomingCallLogHandler(clo.lastMessage, store.getState().account, clo.type, true) : outgoingCallLogHandler(clo.lastMessage, store.getState().account, clo.type, true))
                : clo.lastMessage.message)}
            </span>
          </div>
        </div>
        <div className="pc-chat-time" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 12, color: '#757575' }}>{moment(clo.timeStamp).fromNow()}</span>
          {clo.unSeenNo > 0 && (
            <div className="pc-chat-unread-num" style={{ marginTop: 5, position: 'relative', backgroundColor: 'green', height: 20, width: 20, borderRadius: '50%', justifyContent: 'center', display: 'flex', color: 'white', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 'bold' }}>{clo.unSeenNo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
