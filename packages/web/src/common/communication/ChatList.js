import React from 'react';
import PropTypes from 'prop-types';

class ChatList extends React.Component {
  state = {};

  onClick = () => {
    const { change } = this.props;
    change('history');
  }

  render() {
    const { style } = this.props;
    return (
      <div
        style={style}
        className="chat-list"
      >
        <div className="i-chat unseen" onClick={this.onClick}>
          <div className="name">
            Conor Mcgregor
          </div>
          <div className="short-msg">
            Some Kind of New Message to you.
          </div>
        </div>
        <div className="i-chat" onClick={this.onClick}>
          <div className="name">
            Dustin Poirer
          </div>
          <div className="short-msg">
            Some Kind of old Message to you.
          </div>
        </div>
      </div>
    );
  }
}

ChatList.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatList;
