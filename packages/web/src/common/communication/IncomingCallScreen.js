import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
// import Sound from 'react-sound';
// import ringtone from '../../assets/ringtone.mp3';
import mediaSelector from './mediaSelector';
import { SoundComponent } from './components';

const callingPerson = require('../../assets/icons/128w/uploadicon128.png');

class IncomingCallScreen extends React.Component {
  state = {};

  callAccept = async (mediaType) => {
    const {
      answerHandler,
      apis,
      updateWebRtc,
    } = this.props;
    const stream = await mediaSelector(mediaType);
    await answerHandler(apis, stream);
    // updateWebRtc('showCommunication', 1);
  }

  callReject = async () => {
    const { closeHandler, change } = this.props;
    await closeHandler(this.prop);
    // change('list');
  }

  render() {
    const { style, webRtc, database } = this.props;
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
        {webRtc.showIncommingCall && <SoundComponent />}
        <div className="person-icon-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 5 }}>
              <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {webRtc.chatHistory.type === 'user' ? `${database.User.byId[webRtc.showCommunication].firstName} ${database.User.byId[webRtc.showCommunication].lastName}` : database.Board.byId[webRtc.showCommunication].name}
              </span>
            </div>
            <img src={callingPerson} alt="calling person" />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 5 }}>
              <span style={{ fontSize: 15, fontWeight: 'bold', color: '#757575'}}>
               incoming call...
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
  closeHandler: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IncomingCallScreen;
