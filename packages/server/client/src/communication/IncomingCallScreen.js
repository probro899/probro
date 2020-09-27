import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import RoundPicture from '../components/RoundPicture';
import { SoundComponent } from './components';
// import ringtoneUrl from '../../assets/ringtone.mp3';
import { ENDPOINT } from '../config';

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
    // const stream = await mediaSelector(mediaType);
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [] } });
    await updateWebRtc('isCallUpgraded', false);
    await updateWebRtc('isLive', true);
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, stream: null, mediaType, callType: 'Incoming' });
    await answerHandler(apis, null, mediaType);
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
    let displayName;
    let displayImageUrl;
    if (isUser) {
      const { user, userDetail } = database.UserConnection.byId[webRtc.showCommunication].user;
      const userDetails = userDetail || {};
      displayName = `${user.firstName} ${user.lastName}`;
      displayImageUrl = userDetails.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetails.image}` : '/assets/icons/128w/uploadicon128.png';
    } else {
      displayName = database.Board.byId[webRtc.showCommunication].name;
      displayImageUrl = '/assets/icons/128w/uploadicon128.png';
    }
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
        {webRtc.showIncommingCall && <SoundComponent incoming url="/assets/media/ringtone.mp3" />}
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
                {displayName}
              </span>
            </div>
            <div className="img-container">
              <RoundPicture imgUrl={displayImageUrl} />
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
