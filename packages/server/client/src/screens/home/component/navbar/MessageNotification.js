import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiMessage } from "react-icons/bi";
import { Badge } from '../../../../components';
import SoudComponent from '../../../../communication/components/SoundComponent';
// import notificationUrl from '../../../../assets/notification.mp3';

class MessageNotification extends React.Component {
  state = {};

  showMessage = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', 1);
    updateWebRtc('minimize', false);
  }

  render() {
    const { unreadMessage, msgSound } = this.props;
    return (
        <Link to="#" onClick={this.showMessage}>
          <div className="navbar-item">
          <BiMessage className = "message-icon" />
            {unreadMessage !== 0 && (
            <div>
              <Badge number={unreadMessage} size={25} />
              {msgSound && <SoudComponent url="/assets/media/notification.mp3" noLoop />}
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
  msgSound: PropTypes.bool.isRequired,
};

export default MessageNotification;
