import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';

const ScChatList = (props) => {
  const { onClose, onClickItem } = props;
  const chatList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
        {/* here comes the chat list */}
        {
          chatList.map((obj) => {
            return (
              <div key={obj} onClick={() => onClickItem(obj)} className="sc-cl-i-chat">
                Hello Nepal
              </div>
            );
          })
        }
      </div>
      <div className="sc-cl-footer" />
    </div>
  );
};

ScChatList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ScChatList;
