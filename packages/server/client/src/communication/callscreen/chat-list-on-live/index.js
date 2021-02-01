import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ChatList from '../../chatlist';
import { BiChevronsLeft } from "react-icons/bi";

const ScChatList = (props) => {
  const { onClose, onClickItem } = props;

  return (
    <div className="sc-chat-list">
      <div className="sc-cl-header">
        <div />
        <div className="sc-cl-title">Chats</div>
        <div className="icon-con">
          {/* <Icon className="arrow-btn" onClick={onClose} icon="double-chevron-left" /> */}
          <BiChevronsLeft size={20} onClick={onClose} />
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
  onClickItem: PropTypes.func.isRequired,
};

export default ScChatList;
