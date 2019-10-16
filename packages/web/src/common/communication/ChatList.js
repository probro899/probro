import React from 'react';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../screens/users/utility-functions';

class ChatList extends React.Component {
  state = {};

  getChatList = () => {
    const { database, webRtc, account } = this.props;
    const chats = [];
    if (webRtc.showCommunication) {
      // first create user message list
      const userId = account.user.id;
      database.UserMessage.allIds.map((id) => {
        const message = database.UserMessage.byId[id];
        let alter = false;
        if (message.tuserId === userId) {
          chats.map((obj) => {
            if (obj.type === 'user' && obj.id === message.fuserId) {
              alter = true;
              if (obj.timeStamp < message.timeStamp) {
                obj.message = message.message;
                obj.timeStamp = message.timeStamp;
              }
            }
            return obj;
          });
          if (!alter) chats.push({ type: 'user', id: message.fuserId, timeStamp: message.timeStamp, message: message.message });
        }
        if (message.fuserId === userId) {
          chats.map((obj) => {
            if (obj.type === 'user' && obj.id === message.tuserId) {
              alter = true;
              if (obj.timeStamp < message.timeStamp) {
                obj.message = message.message;
                obj.timeStamp = message.timeStamp;
              }
            }
            return obj;
          });
          if (!alter) chats.push({ type: 'user', id: message.tuserId, timeStamp: message.timeStamp, message: message.message });
        }
      });
      // now for board message list
      database.BoardMessage.allIds.map((id) => {
        const message = database.BoardMessage.byId[id];
        let alt = false;
        chats.map((obj) => {
          if (obj.type === 'board' && obj.id === message.boardId) {
            alt = true;
            if (obj.timeStamp < message.timeStamp) {
              obj.message = message.message;
              obj.timeStamp = message.timeStamp;
            }
          }
          return obj;
        });
        if (!alt) chats.push({ type: 'board', id: message.boardId, timeStamp: message.timeStamp, message: message.message });
      });
    }
    return chats;
  }

  onClick = (type, id) => {
    const { change, updateWebRtc } = this.props;
    change('history');
    updateWebRtc('peerType', type);
    updateWebRtc('showCommunication', id);
  }

  getNewChatList = () => {
    const { database, account } = this.props;
    const { user } = account;
    const toMessage = [];
    const fromMessage = [];
    Object.values(database.UserMessage.byId).forEach((msg) => {
      if (user.id === msg.fuserId) {
        // eslint-disable-next-line no-param-reassign
        fromMessage.push({ ...msg, type: 'f' });
      } else {
        toMessage.push({ ...msg, type: 't' });
      }
    });
    return { toMessage, fromMessage };
  }

  render() {
    const { style, database, account } = this.props;
    const chatList = this.getChatList();
    const newChatList = account.user ? this.getNewChatList() : {};
    console.log('database in communication', newChatList);
    return (
      <div
        style={style}
        className="chat-list"
      >
        {chatList.sort(timeStampSorting).map((obj, index) => {
          let fullName = '';
          if (obj.type === 'user') {
            database.User.allIds.map((id) => {
              if (obj.id === id) {
                fullName = database.User.byId[id].middleName ? `${database.User.byId[id].firstName} ${database.User.byId[id].middleName} ${database.User.byId[id].lastName}` : `${database.User.byId[id].firstName} ${database.User.byId[id].lastName}`;
              }
            });
          }
          if (obj.type === 'board') {
            database.Board.allIds.map((id) => {
              if (obj.id === id) {
                fullName = database.Board.byId[id].name;
              }
            });
          }
          return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              key={index}
              className="i-chat unseen"
              onClick={() => this.onClick(obj.type, obj.id)}
              onKeyPress={() => this.onClick(obj.type, obj.id)}
            >
              <div className="name">
                {fullName}
              </div>
              <div className="short-msg">
                {obj.message}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ChatList.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  change: PropTypes.func.isRequired,
};

export default ChatList;
