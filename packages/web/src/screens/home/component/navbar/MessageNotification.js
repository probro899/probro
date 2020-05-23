import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { Badge } from '../../../../components';
import SoudComponent from '../../../../common/communication/components/SoundComponent';
import notificationUrl from '../../../../assets/notification.mp3';

class MessageNotification extends React.Component {
  state = {};

  showMessage = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', 1);
  }

  render() {
    const { unreadMessage } = this.props;
    return (
      <Link to="#" onClick={this.showMessage}>
        <div className="navbar-item">
          <Icon icon="chat" iconSize={Icon.SIZE_LARGE} />
          {unreadMessage !== 0 && (
          <div>
            <Badge number={unreadMessage} size={25} />
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
  unreadMessage: PropTypes.number.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

export default MessageNotification;
