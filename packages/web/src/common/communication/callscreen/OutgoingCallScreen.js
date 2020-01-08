import React from 'react';
import PropTypes from 'prop-types';
import { FaPhoneSlash } from 'react-icons/fa';
import { Button, Icon } from '@blueprintjs/core';
import RoundPicture from '../../../components/RoundPicture';
import { ENDPOINT } from '../../../config';

const callingPerson = require('../../../assets/icons/128w/uploadicon128.png');

const IconOrImage = ({ isUser }) => {
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
};

class OutgoingCallScreen extends React.Component {
  state = {};

  render() {
    const { parentProps, callReject, callStatus } = this.props;
    const { webRtc, database } = parentProps;
    const isUser = webRtc.chatHistory.type === 'user';
    return (
      <div className="outgoing-call-screen">
        <div
          className="person-icon-container"
        >
          <div
            className="person-name-status"
          >
            <span className="name">
              {webRtc.chatHistory.type === 'user' ? `${database.User.byId[webRtc.showCommunication].firstName} ${database.User.byId[webRtc.showCommunication].lastName}` : database.Board.byId[webRtc.showCommunication].name}
            </span>
            <span className="status">
              {callStatus}
              {' '}
              ...
            </span>
          </div>
          {(isUser ? database.UserDetail.byId[webRtc.chatHistory.broadCastId] && database.UserDetail.byId[webRtc.chatHistory.broadCastId].image : [database.Board.byId[webRtc.chatHistory.broadCastId]].image)
            ? (
              <div className="img-container">
                <RoundPicture imgUrl={`${ENDPOINT}/user/${10000000 + parseInt(webRtc.chatHistory.broadCastId, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === webRtc.chatHistory.broadCastId).image}`} />
              </div>
            )
            : <IconOrImage isUser={isUser} />
          }
          <div className="controllers">
            <Button onClick={callReject} large intent="danger">
              <FaPhoneSlash size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

OutgoingCallScreen.propTypes = {
  parentProps: PropTypes.objectOf(PropTypes.any).isRequired,
  callReject: PropTypes.func.isRequired,
  callStatus: PropTypes.string.isRequired,
};

export default OutgoingCallScreen;
