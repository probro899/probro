import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Sound from 'react-sound';
import ringtone from '../../assets/ringtone.mp3';

const callingPerson = require('../../assets/icons/128w/uploadicon128.png');

class IncomingCallScreen extends React.Component {
  state = {};

  render() {
    const { style, webRtc } = this.props;
    return (
      <div
        style={style}
        className="incoming-call-screen"
      >
        {
          webRtc.liveIncomingCall
          && <Sound url={ringtone} playStatus={Sound.status.PLAYING} playFromPosition={0} loop />
        }
        <div className="person-icon-container">
          <img src={callingPerson} alt="calling person" />
          <div className="controllers">
            <Button icon="phone" large intent="success" />
            <Button icon="mobile-video" large intent="success" />
            <Button icon="cross" large intent="danger" />
          </div>
        </div>
      </div>
    );
  }
}

IncomingCallScreen.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IncomingCallScreen;
