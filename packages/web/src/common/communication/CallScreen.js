import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import mediaSelector from './mediaSelector';
import { MediaComponents } from './components';
import { mediaRecorder } from './helper-functions';

class CallScreen extends React.Component {
  state = {
    startRecording: false,
    showWhiteBoard: false,
  };

  goBack = () => {
    const { change } = this.props;
    change('history');
  }

  callHandle = async (mediaType) => {
    const { _callHandler, apis } = this.props;
    if (mediaType === 'whiteBoard') {
      await this.setState({ showWhiteBoard: true });
    }
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
      const mediaRecording = await mediaRecorder(1, this.props);
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
    const { showWhiteBoard } = this.state;
    console.log('webRtc in CallScreen', webRtc);
    return !webRtc.showCommunication ? <div /> : (
      <div
        className="call-screen"
        style={style}
      >
        {showWhiteBoard && <Redirect to={`/${account.sessionId}/drawing-board`} />}
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
            Subject 1
          </div>
          <div />
        </div>
        <div className="video-container">
          <MediaComponents account={account} webRtc={webRtc} />
        </div>
        <div className="controllers" style={{ zIndex: 20 }}>
          <Button icon="phone" intent="success" onClick={() => this.callHandle('audio')} />
          <Button icon="mobile-video" onClick={() => this.callHandle('video')} intent="success" />
          <Button icon="cross" intent="danger" onClick={this.callReject} />
          <Button icon="duplicate" onClick={() => this.callHandle('screenshare')} intent="success" />
          <Button icon="record" onClick={() => this.recordingHandler()} intent="success" />
          <Button icon="headset" intent="success" />
          <Button icon="edit" onClick={() => this.callHandle('whiteBoard')} intent="success" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scrollX', width: '100%' }}>
          {webRtc.recordedBlobs.map(a => Object.values(a)[0])}
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
