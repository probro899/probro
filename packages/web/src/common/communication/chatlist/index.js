import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem';
import { chatItemClickHandler, getChatList } from './helper-function';

class ChatList extends React.Component {
  state = { mouseHoverId: null, chatList: [] };

  componentDidMount() {
    const chatList = getChatList(this.props);
    this.setState({ chatList });
  }

  componentWillReceiveProps(props) {
    const chatList = getChatList(props);
    this.setState({ chatList });
  }

  onMouseHover = (id) => {
    this.setState({ mouseHoverId: id });
  }

  render() {
    const { style } = this.props;
    const { mouseHoverId, chatList } = this.state;
    // console.log('props in chatList main', this.props);
    return (
      <div
        style={style}
        className="chat-list"
      >
        {chatList.map(uc => <ChatListItem clo={{ ...uc, onClick: chatItemClickHandler, onMouseHover: this.onMouseHover, mouseHoverId, props: this.props }} />)}
      </div>
    );
  }
}

ChatList.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatList;
