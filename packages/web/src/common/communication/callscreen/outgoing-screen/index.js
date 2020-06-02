import React from 'react';
import PropTypes from 'prop-types';
import { FaPhoneSlash } from 'react-icons/fa';
import { MdHourglassEmpty } from 'react-icons/md';
import { Button, Icon } from '@blueprintjs/core';
import RoundPicture from '../../../../components/RoundPicture';
import { ENDPOINT } from '../../../../config';
import SoundComponent from '../../components/SoundComponent';
import outgoingRingtoneUrl from '../../../../assets/outgoing.mp3';

const callingPerson = require('../../../../assets/icons/128w/uploadicon128.png');

const IconOrImage = ({ isUser, database, webRtc }) => {
  const userDetail = isUser ? Object.values(database.UserDetail.byId).find(o => o.userId === webRtc.localCallHistory.chatHistory.user.user.id) : null;
  if (isUser && userDetail && userDetail.image) {
    return (
      <div className="img-container">
        <RoundPicture imgUrl={`${ENDPOINT}/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}`} />
      </div>
    );
  }
  if (!isUser) {
    return (
      <div className="icon-container">
        <Icon icon="application" iconSize={130} style={{ color: '#757575' }} />
      </div>
    );
  }
  return (
    <div className="img-container">
      <RoundPicture imgUrl={callingPerson} />
    </div>
  );
};

IconOrImage.propTypes = {
  isUser: PropTypes.bool.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Index extends React.Component {
  state = { autoClose: null, callStatus: 'connecting...' };

  async componentWillReceiveProps(nextProps) {
    const { webRtc } = this.props;
    const { autoClose } = this.state;
    if (webRtc !== nextProps.webRtc) {
      if (nextProps.webRtc.localCallHistory.chatHistory.type === 'user') {
        // const peerConnection = nextProps.webRtc.peerConnections[webRtc.localCallHistory.chatHistory.user.user.id];
        // this.setState({ callStatus: peerConnection.iceCandidateStatus });
        // if (peerConnection.iceCandidateStatus === 'busy') {
        //   this.setState({ callStatus: peerConnection.iceCandidateStatus });
        //   if (!autoClose) {
        //     const autoTimeOut = setTimeout(this.callReject, 2000);
        //     this.setState({ autoClose: autoTimeOut });
        //   }
        // }
      }

      if (nextProps.webRtc.chatHistory.type === 'board') {
        Object.values(nextProps.webRtc.peerConnections).forEach((obj) => {
          if (obj.iceCandidateStatus === 'ringing') {
            this.setState({ callStatus: 'ringing' });
          }
        });
      }
    }
  }

  callReject = async () => {
    const { closeHandler, change } = this.props;
    await closeHandler();
    change('history');
  }

  render() {
    const { callStatus } = this.state;
    const { webRtc, database } = this.props;
    const isUser = webRtc.localCallHistory.chatHistory.type === 'user';
    return (
      <div className="outgoing-call-screen">
        <SoundComponent url={outgoingRingtoneUrl} />
        <div
          className="person-icon-container"
        >
          <div
            className="person-name-status"
          >
            <span className="name">
              {webRtc.chatHistory.type === 'user' ? `${database.User.byId[webRtc.localCallHistory.chatHistory.user.user.id].firstName} ${database.User.byId[webRtc.localCallHistory.chatHistory.user.user.id].lastName}` : database.Board.byId[webRtc.showCommunication].name}
            </span>
            <span className="status" style={{ textTransform: 'capitalize', color: callStatus === 'Declined' ? 'red' : 'white' }}>
              {callStatus}
              {' '}
              ...
            </span>
          </div>
          <IconOrImage isUser={isUser} webRtc={webRtc} database={database} />
          <div className="controllers">
            {
              (callStatus === 'declined' || callStatus === 'disconnected' || callStatus === 'busy') ? (
                <Button large intent="danger">
                  <MdHourglassEmpty size={20} />
                </Button>
              )
                : (
                  <Button onClick={this.callReject} large intent="danger">
                    <FaPhoneSlash size={20} />
                  </Button>
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
