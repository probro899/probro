import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ChatList from '../../chatlist';

const ScChatList = (props) => {
  const { onClose, onClickItem } = props;

  return (
    <div className="sc-chat-list">
      <div className="sc-cl-header">
        <div />
        <div className="sc-cl-title">CHATS</div>
        <div style={{ cursor: 'pointer' }}>
          <Icon onClick={onClose} icon="double-chevron-left" />
        </div>
      </div>
      <div className="sc-cl-content">
        <ChatList {...props} fromLive showChatHistory={onClickItem} />
      </div>
      <div className="sc-cl-footer" />
    </div>
  );
};

ScChatList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ScChatList;
