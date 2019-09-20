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
    updateWebRtc('showCommunication', 1);
  }

  callReject = () => {
    const { closeHandler, change } = this.props;
    closeHandler();
    change('list');
  }

  render() {
    const { style, webRtc } = this.props;
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
        <button id="justToClick">hello</button>
        {webRtc.showIncommingCall && <SoundComponent />}
        {/* {muted && (<Sound
          url={ringtone}
          autoPlay
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          loop
        />)} */}
        {/* <iframe
          title="calling test"
          src={ringtone}
          allow="autoplay"
          // style={{ display: 'none' }}
          id="iframeAudio"
        /> */}
        {/* <audio
          on
          autoPlay
          controls
          // muted
          src={ringtone}
          loop
        /> */}
        <div className="person-icon-container">
          <img src={callingPerson} alt="calling person" />
          <div className="controllers">
            <Button icon="phone" onClick={() => this.callAccept('audio')} large intent="success" />
            <Button icon="mobile-video" onClick={() => this.callAccept('video')} large intent="success" />
            <Button icon="cross" onClick={this.callReject} large intent="danger" />
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
};

export default IncomingCallScreen;
