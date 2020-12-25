/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import ReactHowler from 'react-howler';

// const ringtone = require('./ringtone.mp3');

class SoundComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.soundRef = React.createRef();
  }

  componentDidMount() {
    const { incoming } = this.props;
    if (incoming) {
      this.interval = setInterval(this.playSound, 1500);
    }
  }

  componentWillUnmount() {
    const { incoming } = this.props;
    if (incoming) {
      clearInterval(this.interval);
    }
  }

  onPlay = () => {
    const { incoming } = this.props;
    if (incoming) {
      clearInterval(this.interval);
    }
  }

  playSound = () => {
    try {
      this.soundRef.current.play();
    } catch {};
  }

  render() {
    const { url, noLoop } = this.props;
    return (
      <ReactHowler
        src={url}
        playing={true}
        loop={!noLoop}
      />
    );
  }
}

export default SoundComponent;
