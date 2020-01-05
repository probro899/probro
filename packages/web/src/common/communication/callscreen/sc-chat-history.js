import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';

const ScChatList = (props) => {
  const { onClose } = props;
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="sc-chat-history">
      <div className="sc-ch-header">
        <div style={{ cursor: 'pointer' }}>
          <Icon onClick={() => onClose(null)} icon="double-chevron-right" />
        </div>
        <div className="sc-ch-title">Name of Chat History</div>
        <div />
      </div>
      <div className="sc-ch-content">
        {/* here comes the chat list */}
        {
          messages.map((obj) => {
            return (
              <div key={obj} className="sc-cl-i-chat">
                message
              </div>
            );
          })
        }
      </div>
      <div className="sc-ch-footer" />
    </div>
  );
};

ScChatList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ScChatList;
