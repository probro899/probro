import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
// import Sound from 'react-sound';
// import ringtone from '../../assets/ringtone.mp3';
import mediaSelector from './mediaSelector';
<<<<<<< HEAD
import { SoundComponent } from './components';

const callingPerson = require('../../assets/icons/128w/uploadicon128.png');

=======
import store from '../../store';

const callingPerson = require('../../assets/icons/128w/uploadicon128.png');

class SoundElement extends React.Component {
  state = {};

  componentWillMount() {
    console.log('component will mount');
  }

  componentWillUnmount() {
    console.log('sound unmount');
  }

  render() {
    console.log('sound component render');
    return (
      <Sound
        onError={e => console.log('error in sound', e)}
        url={ringtone}
        playStatus={Sound.status.PLAYING}
        playFromPosition={0}
        loop
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
>>>>>>> upstream/master
class IncomingCallScreen extends React.Component {
  state = {showSound: false };

  componentDidCatch() {
    console.log('component did mount in comming');
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showSound: true }), 1000);
  }

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
<<<<<<< HEAD
    const { style, webRtc } = this.props;
=======
    const { style } = this.props;
    console.log('play hunxa ki nai', store.getState().webRtc.showIncommingCall);
>>>>>>> upstream/master
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
<<<<<<< HEAD
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
=======
        <Sound
          onError={e => console.log('error in sound', e)}
          url={ringtone}
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          ignoreMobileRestrictions
          loop
        />
>>>>>>> upstream/master
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
