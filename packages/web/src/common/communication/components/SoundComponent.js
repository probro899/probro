import React from 'react';

const ringtone = require('./ringtone.mp3');

class SoundComponent extends React.Component {
  state = { muted: false };

  componentDidMount() {
    setTimeout(this.handlePlay, 2000);
    document.getElementById('justToClick').click();
    setTimeout(this.handlePlay, 5000);
  }

  handlePlay = () => {
    const { muted } = this.state;
    this.setState({
      muted: !muted,
    });
  }

  toggleMute = () => {
    const { muted } = this.state;
    this.setState({
      muted: !muted,
    });
  }

  render() {
    const { muted } = this.state;
    return muted ? <div /> : (
      <audio
        autoPlay
        controls
        src={ringtone}
        loop
        type="audio/mpeg"
        />
    );
  }
}

export default SoundComponent;
