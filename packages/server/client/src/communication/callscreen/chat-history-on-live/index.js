import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ChatHistory from '../../chathistory';
import { BiChevronsRight } from "react-icons/bi";

const ScChatList = (props) => {
  const { onClose } = props;
  const { webRtc, database } = props;
  const { user } = webRtc.chatHistory;

  return (
    <div className="sc-chat-history">
      <div className="sc-ch-header">
        <div className="icon-con">
          {/* <Icon className="arrow-btn" onClick={() => onClose(null)} icon="double-chevron-right" /> */}
          <BiChevronsRight onClick={() => onClose(null)} size={20} />
        </div>
        <div className="sc-ch-title">
          {webRtc.chatHistory.type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.chatHistory.connectionId].name}
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
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScChatList;
