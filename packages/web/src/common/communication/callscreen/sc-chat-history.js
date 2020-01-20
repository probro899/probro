import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ChatHistory from '../chathistory';

const ScChatList = (props) => {
  const { onClose } = props;
  const { webRtc, database } = props;
  const { user, boardDetails } = webRtc.chatHistory;

  return (
    <div className="sc-chat-history">
      <div className="sc-ch-header">
        <div style={{ cursor: 'pointer' }}>
          <Icon onClick={() => onClose(null)} icon="double-chevron-right" />
        </div>
        <div className="sc-ch-title">
          {webRtc.chatHistory.type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.showCommunication].name}
        </div>
        <div />
      </div>
      <div className="sc-ch-content">
        <ChatHistory {...props} fromLive />
      </div>
      <div className="sc-ch-footer" />
    </div>
  );
};

ScChatList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ScChatList;
