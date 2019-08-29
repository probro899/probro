import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import mediaSelector from './mediaSelector';
import { mediaRecorder } from '../../helper-functions';

class Controller extends React.Component {
  state={ startRecording: false };

  callHandler = async (mediaType) => {
    const { _callHandler, answerHandler, incomming, apis, webRtc } = this.props;
    const stream = await mediaSelector(mediaType);
    if (incomming || webRtc.liveIncomingCall) {
      answerHandler(apis, stream);
    } else {
      _callHandler(apis, stream);
    }
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
    const { callType, incomming, webRtc, closeHandler } = this.props;
    const { startRecording } = this.state;
    return (
      <div style={{ cursor: 'pointer', display: 'flex' }}>
        <ReactTooltip />
        <Button data-tip="Audio Call" onClick={() => this.callHandler('audio')} text="" style={{ marginLeft: 5 }} icon="phone" intent={(callType === 'audio' || callType === 'video') ? Intent.DANGER : Intent.SUCCESS} />
        <Button data-tip="Video Call" onClick={() => this.callHandler('video')} text="" style={{ marginLeft: 10, marginRight: 5 }} icon="mobile-video" intent={Intent.SUCCESS} />
        {webRtc.isLive &&
        (
        <div style={{ display: 'flex' }}>
          <ReactTooltip />
          <Button data-tip="Share Screen" onClick={() => this.callHandler('screenshare')} text="" style={{ marginLeft: 10, marginRight: 5 }} icon="duplicate" intent={Intent.SUCCESS} />
          <Button data-tip="Recording" onClick={() => this.recordingHandler()} text="" style={{ marginLeft: 10, marginRight: 5 }} icon="record" intent={!startRecording ? Intent.SUCCESS : Intent.DANGER} />
        </div>
        )
        }
        {(incomming || webRtc.liveIncomingCall || webRtc.showOutgoingCall) && (
        <div>
          <ReactTooltip />
          <Button data-tip="End Call" onClick={() => closeHandler()} text="" style={{ marginLeft: 5 }} icon="phone" intent="danger" />
        </div>
        )}
      </div>
    );
  }
}
export default Controller;

Controller.propTypes = {
  _callHandler: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  callType: PropTypes.string.isRequired,
  incomming: PropTypes.bool.isRequired,
  answerHandler: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  closeHandler: PropTypes.func.isRequired,
};
