/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem';
import { chatItemClickHandler, getChatList } from './helper-function';

class ChatList extends React.Component {
  state = { mouseHoverId: null, chatList: [] };

  async componentDidMount() {
    const { apis } = this.props;
    const chatList = await apis.getChatlist();
    // console.log('chatList', chatList);
    this.setState({ chatList });
  }

  async componentWillReceiveProps(props) {
    const { apis } = this.props;
    const chatList = await apis.getChatlist();
    // console.log('Chatlist', chatList);
    this.setState({ chatList });
  }

  onMouseHover = (id) => {
    this.setState({ mouseHoverId: id });
  }

  render() {
    const { style } = this.props;
    const { mouseHoverId, chatList } = this.state;
    // console.log('chatlist', chatList);
    return (
      <div
        style={style}
        className="chat-list"
      >
        {chatList.length === 0 && <div className="no-msg">You do not have any conversations</div>}
        {chatList.map((uc, idx) => <ChatListItem key={idx} clo={{ ...uc, onClick: chatItemClickHandler, onMouseHover: this.onMouseHover, mouseHoverId, props: this.props }} idx={idx} />)}
      </div>
    );
  }
}

ChatList.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
};

export default ChatList;
