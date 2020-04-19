import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { Badge } from '../../../../components';
import { getChatList } from '../../../../common/communication/chatlist/helper-function';
import SoudComponent from '../../../../common/communication/components/SoundComponent';
import notificationUrl from '../../../../assets/notification.mp3';

class MessageNotification extends React.Component {
  state = { unReadMessage: 0 };

  componentDidMount() {
    const { account } = this.props;
    if (!account.user) return;
    const chatList = getChatList(this.props);
    const unReadMessage = chatList.reduce((t, next) => {
      t += next.unSeenNo;
      return t;
    }, 0);
    this.setState({ unReadMessage });
  }

  componentWillReceiveProps(props) {
    const { account } = this.props;
    if (!account.user) return;
    const chatList = getChatList(props);
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
          {unReadMessage !== 0 && (
          <div>
            <Badge number={unReadMessage} size={25} />
            <SoudComponent url={notificationUrl} noLoop />
          </div>
          )
          }
        </div>
      </Link>
    );
  }
}

MessageNotification.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

export default MessageNotification;
