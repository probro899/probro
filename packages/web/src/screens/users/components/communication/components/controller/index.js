import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import mediaSelector from './mediaSelector';

// ((incomming || webRtc.liveIncomingCall) ? answerHandler(apis, 'audio') : _callHandler(apis, 'audio'))

class Controller extends React.Component {
  state={};

  callHandler = async (mediaType) => {
    const { _callHandler, answerHandler, incomming, apis, webRtc } = this.props;
    const stream = await mediaSelector(mediaType);
    if (incomming || webRtc.liveIncomingCall) {
      answerHandler(apis, stream);
    } else {
      _callHandler(apis, stream);
    }
  }

  recordingHandler = () => {
    console.log('recording handling stuff');
  }

  render() {
    const { _callHandler, apis, callType, incomming, webRtc, closeHandler } = this.props;
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
          <Button data-tip="Recording" onClick={() => this.recordingHandler()} text="" style={{ marginLeft: 10, marginRight: 5 }} icon="record" intent={Intent.SUCCESS} />
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
