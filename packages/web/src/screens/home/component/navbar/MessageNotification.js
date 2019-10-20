import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { Badge } from '../../../../components';

class MessageNotification extends React.Component {
  state = {};

  showMessage = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', 1);
  }

  getUnread = () => {
    const { database, account } = this.props;
    const userMessages = {};
    const boardMessages = {};
    Object.values(database.BoardMessage.byId).map((obj) => {
      boardMessages[obj.boardId] = boardMessages[obj.boardId]
        ? [...boardMessages[obj.boardId], obj] : [obj];
    });
    Object.values(database.UserMessage.byId).map((obj) => {
      if (account.user && obj.tuserId === account.user.id) {
        userMessages[obj.fuserId] = userMessages[obj.fuserId]
          ? [...userMessages[obj.fuserId], obj] : [obj];
      } else {
        userMessages[obj.tuserId] = userMessages[obj.tuserId]
          ? [...userMessages[obj.tuserId], obj] : [obj];
      }
    });
    // console.log(database);
  }

  render() {
    this.getUnread();
    return (
      <Link to="#" onClick={this.showMessage}>
        <div className="navbar-item">
          <Icon icon="chat" iconSize={Icon.SIZE_LARGE} />
          <Badge number={2} size={25} />
        </div>
      </Link>
    );
  }
}

MessageNotification.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MessageNotification;
