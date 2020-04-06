/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

const ringtone = require('./ringtone.mp3');

class SoundComponent extends React.Component {
  state = {};

  render() {
    const { url, noLoop } = this.props;
    return (
      <audio
        autoPlay
        // controls
        src={url}
        loop={!noLoop}
        type="audio/mpeg"
      />
    );
  }
}

export default SoundComponent;
