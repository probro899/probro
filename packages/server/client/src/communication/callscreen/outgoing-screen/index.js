/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FaPhoneSlash } from 'react-icons/fa';
import { MdHourglassEmpty } from 'react-icons/md';
import RoundPicture from '../../../components/RoundPicture';
import { ENDPOINT } from '../../../config';
import SoundComponent from '../../components/SoundComponent';
import DeviceNotFoundError from '../error-screen/DeviceNotFoundError';
import { Button } from '../../../common/utility-functions/Button/Button';

const IconOrImage = ({ isUser, database, webRtc }) => {
  let user;
  let userDetail;
  let userId;
  if (isUser) {
    if (webRtc.localCallHistory.chatHistory) {
      if (webRtc.localCallHistory.chatHistory.user) {
        userId = webRtc.localCallHistory.chatHistory.user.user.id;
        if (userId) {
          const connection = Object.values(database.UserConnection.byId).find(c => c.user.user.id === userId);
          if (connection) {
            user = connection.user.user;
            userDetail = connection.user.userDetail || {};
          }
        }
      }
    }
  }

  if (isUser && userDetail && userDetail.image) {
    return (
      <div className="img-container">
        <RoundPicture imgUrl={`${ENDPOINT}/assets/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}`} />
      </div>
    );
  }

  if (!isUser) {
    return (
      <div className="icon-container">
        <img src="/assets/graphics/classroom.svg"  style={{ height: '130px', width:'130px' }} />
      </div>
    );
  }

  return (
    <div className="img-container">
      <RoundPicture imgUrl="/assets/graphics/user.svg" />
    </div>
  );
};

IconOrImage.propTypes = {
  isUser: PropTypes.bool.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Index extends React.Component {
  state = { autoClose: null, callStatus: 'connecting' };

  async componentWillReceiveProps(nextProps) {
    // console.log('Out going call', nextProps);
    const { webRtc } = this.props;
    const { autoClose } = this.state;
    const localCallHistory = nextProps.webRtc.localCallHistory;
    if (localCallHistory) {
      const chatHistory = localCallHistory.chatHistory;
      if (chatHistory && !_.isEqual(webRtc, nextProps.webRtc)) {
        // console.log('user in status change', user);
        if (chatHistory.type === 'user') {
          const { user } = chatHistory.user;
          const connectionStatus = nextProps.webRtc.connectedUsers[user.id] || {};
          // console.log('connectionStatus', connectionStatus);
          if (connectionStatus) {
            this.setState({ callStatus: connectionStatus.status });
            if (connectionStatus.status === 'busy' || connectionStatus.status === 'declined') {
              this.setState({ callStatus: connectionStatus.status });
              if (!autoClose) {
                const autoTimeOut = setTimeout(this.callReject, 2000);
                this.setState({ autoClose: autoTimeOut });
              }
            }
          }
        }

        if (chatHistory.type === 'board') {
          const connectedUsers = nextProps.webRtc.connectedUsers || {};
          Object.values(connectedUsers).forEach((obj) => {
            if (obj.status === 'ringing') {
              this.setState({ callStatus: 'ringing' });
            }
          });
        }
      }
    }
  }

  callReject = async () => {
    console.log('Call Reject called in outgoing call');
    const { closeHandler, change } = this.props;
    await closeHandler('callReject');
    change('history');
  }

  render() {
    // console.log('out going call', this.props.webRtc);
    const { callStatus } = this.state;
    const { webRtc, database } = this.props;
    const isUser = webRtc.localCallHistory.chatHistory.type === 'user';
    let displayName;
    if (isUser) {
      displayName = `${database.UserConnection.byId[webRtc.localCallHistory.chatHistory.connectionId].user.user.firstName} ${database.UserConnection.byId[webRtc.localCallHistory.chatHistory.connectionId].user.user.lastName}`;
    } else {
      displayName = database.Board.byId[webRtc.showCommunication].name;
    }

    return (
      <div className="outgoing-call-screen">
        <SoundComponent url="/assets/media/outgoing.mp3" />
        <div
          className="person-icon-container"
        >
          <div
            className="person-name-status"
          >
            <span className="name">
              {displayName}
            </span>
            <span className="status" style={{ textTransform: 'capitalize', color: callStatus === 'Declined' ? 'red' : 'white' }}>
              {callStatus}
              {' '}
              ...
            </span>
          </div>
          {!webRtc.deviceNotAllowed && <IconOrImage isUser={isUser} webRtc={webRtc} database={database} />}
          <DeviceNotFoundError {...this.props} />
          <div className="controllers">
            {
              (callStatus === 'declined' || callStatus === 'disconnected' || callStatus === 'busy') ? (
                // <Button large intent="danger">
                //   <MdHourglassEmpty size={20} />
                // </Button>
                <Button
                  icon={<MdHourglassEmpty size={20} />}
                  type="button"
                  buttonStyle="btn--circle-icons"
                  buttonSize="btn--small"
                />
              )
                : (
                  // <Button onClick={this.callReject} large intent="danger">
                  //   <FaPhoneSlash size={20} />
                  // </Button>
                  <Button
                    onClick={this.callReject}
                    icon={<FaPhoneSlash size={20} />}
                    type="button"
                    buttonStyle="btn--circle-icons"
                    buttonSize="btn--small"
                  />
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  closeHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default Index;
