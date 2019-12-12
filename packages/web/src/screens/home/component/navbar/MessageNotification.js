import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { Badge } from '../../../../components';
import { getChatList } from '../../../../common/communication/chatlist/helper-function';

class MessageNotification extends React.Component {
  state = { unReadMessage: null };

  componentDidMount() {
    const chatList = getChatList(this.props);
    console.log('chat list in notification component', chatList);
    const unReadMessage = chatList.reduce((t, next) => {
      t += next.unSeenNo;
      return t;
    }, 0);
    this.setState({ unReadMessage });
  }

  componentWillReceiveProps(props) {
    const chatList = getChatList(props);
    console.log('chat list in will recieve props', chatList);
    const unReadMessage = chatList.reduce((t, next) => {
      t += next.unSeenNo;
      return t;
    }, 0);
    this.setState({ unReadMessage });
  }

  showMessage = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', 1);
  }

  render() {
    const { unReadMessage } = this.state;
    return (
      <Link to="#" onClick={this.showMessage}>
        <div className="navbar-item">
          <Icon icon="chat" iconSize={Icon.SIZE_LARGE} />
         {unReadMessage !== 0 && <Badge number={unReadMessage} size={25} />}
        </div>
      </Link>
    );
  }
}

MessageNotification.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
};

export default MessageNotification;
