import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import mediaSelector from './mediaSelector';
import { MediaComponents } from './components';
import { mediaRecorder } from './helper-functions';

class CallScreen extends React.Component {
  state = {
    startRecording: false,
  };

  goBack = () => {
    const { change } = this.props;
    change('history');
  }

  callHandle = async (mediaType) => {
    const { _callHandler, apis } = this.props;
    const stream = await mediaSelector(mediaType);
    _callHandler(apis, stream);
  }

  callReject = () => {
    const { closeHandler, change } = this.props;
    closeHandler();
    change('history');
  }

  recordingHandler = async () => {
    const { startRecording } = this.state;
    const { updateWebRtc, webRtc } = this.props;
    if (!startRecording) {
      const mediaRecording = await mediaRecorder(2, this.props);
      updateWebRtc('mediaRecording', mediaRecording);
      this.setState({ startRecording: true });
    } else {
      webRtc.mediaRecording.stopRecording();
      updateWebRtc('mediaRecording', null);
      this.setState({ startRecording: false });
    }
  }

  render() {
    const { style, webRtc, account } = this.props;
    return !webRtc.showCommunication ? <div /> : (
      <div
        className="call-screen"
        style={style}
      >
        <div className="top">
          <div>
            <Button
              // text="Back"
              minimal
              intent="default"
              icon="double-chevron-left"
              onClick={this.goBack}
            />
          </div>
          <div className="op-name">
            Conor Mcgregor
          </div>
          <div />
        </div>
        <div className="video-container">
          {/* eslint-disable-next-line */}
          {/* <video className="peer-video" controls id={`video-${webRtc.showCommunication}`} playsInline autoPlay />
          <video className="own-video" controls id={`video-${account.user.id}`} playsInline autoPlay /> */}
          <MediaComponents account={account} webRtc={webRtc} />
        </div>
        <div className="controllers">
          <Button icon="phone" intent="success" onClick={() => this.callHandle('audio')} />
          <Button icon="mobile-video" onClick={() => this.callHandle('video')} intent="success" />
          <Button icon="cross" intent="danger" onClick={this.callReject} />
          <Button icon="duplicate" onClick={() => this.callHandle('screenshare')} intent="success" />
          <Button icon="record" onClick={() => this.recordingHandler()} intent="success" />
          <Button icon="headset" intent="success" />
        </div>
      </div>
    );
  }
}

CallScreen.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CallScreen;
