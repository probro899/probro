import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import RoundPicture from '../../components/RoundPicture';
import mediaSelector from './mediaSelector';
import { SoundComponent } from './components';
import { ENDPOINT } from '../../config';

const callingPerson = require('../../assets/icons/128w/uploadicon128.png');

class IncomingCallScreen extends React.Component {
  state = {};

  callAccept = async (mediaType) => {
    const {
      answerHandler,
      apis,
      updateWebRtc,
      webRtc,
      account,
    } = this.props;
    const stream = await mediaSelector(mediaType);
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [stream] } });
    await updateWebRtc('isCallUpgraded', false);
    await updateWebRtc('isLive', true);
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, stream, mediaType, callType: 'Incoming' });
    await answerHandler(apis, stream);
  }

  callReject = async () => {
    const { change, updateWebRtc, closeHandler } = this.props;
    closeHandler();
    updateWebRtc('showIncommingCall', false);
    change('history');
  }

  render() {
    const { style, webRtc, database } = this.props;
    const isUser = webRtc.localCallHistory.chatHistory.type === 'user';
    // console.log('props in incomming call screen', this.props);
    // console.log('webRtc value inComming call screen', webRtc);
    // console.log('user url', `${ENDPOINT}/user/${10000000 + parseInt(webRtc.localCallHistory.chatHistory.broadCastId, 10)}/profile/${database.UserDetail.byId[webRtc.localCallHistory.chatHistory.broadCastId].image}`);
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
        {webRtc.showIncommingCall && <SoundComponent />}
        <div
          className="person-icon-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', flexDirection: 'column' }}
          >
            <div
              style={{ width: '100%', display: 'flex', alignSelf: 'center', justifyContent: 'center', margin: 5 }}
            >
              <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                {webRtc.localCallHistory.chatHistory.type === 'user' ? `${database.User.byId[webRtc.showCommunication].firstName} ${database.User.byId[webRtc.showCommunication].lastName}` : database.Board.byId[webRtc.showCommunication].name}
              </span>
            </div>
            <div className="img-container">
              {(isUser ? database.UserDetail.byId[webRtc.localCallHistory.chatHistory.broadCastId] && database.UserDetail.byId[webRtc.localCallHistory.chatHistory.broadCastId].image : [database.Board.byId[webRtc.localCallHistory.chatHistory.broadCastId]].image)
                ? <RoundPicture imgUrl={`${ENDPOINT}/user/${10000000 + parseInt(webRtc.localCallHistory.chatHistory.broadCastId, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === webRtc.localCallHistory.chatHistory.broadCastId).image}`} />
                : <RoundPicture imgUrl={callingPerson} />
              }
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 5 }}>
              <span style={{ fontSize: 15, fontWeight: 'bold', color: '#757575' }}>
                {webRtc.currentOffer ? `Incoming ${webRtc.currentOffer.callType} call...` : null}
              </span>
            </div>
            <div className="controllers">
              <Button icon="phone" onClick={() => this.callAccept('audio')} large intent="success" />
              <Button icon="mobile-video" onClick={() => this.callAccept('video')} large intent="success" />
              <Button icon="cross" onClick={this.callReject} large intent="danger" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IncomingCallScreen.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  answerHandler: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  change: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default IncomingCallScreen;
