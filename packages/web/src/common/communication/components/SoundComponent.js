import React from 'react';

const ringtone = require('./ringtone.mp3');

class SoundComponent extends React.Component {
  state = {};

  render() {
    return (
      <audio
        autoPlay
        // controls
        src={ringtone}
        loop
        type="audio/mpeg"
        />
    );
  }
}

export default SoundComponent;
