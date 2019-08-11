import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Controller = (props) => {
  const { _callHandler, apis, callType, incomming, answerHandler, webRtc, closeHandler } = props;

  return (
    <div style={{ cursor: 'pointer' }}>
      <ReactTooltip />
      <Button data-tip="Audio Call" onClick={() => ((incomming || webRtc.liveIncomingCall) ? answerHandler(apis, 'audio') : _callHandler(apis, 'audio'))} text="" style={{ marginLeft: 5 }} icon="phone" intent={(callType === 'audio' || callType === 'video') ? Intent.DANGER : Intent.SUCCESS} />
      <Button data-tip="Video Call" onClick={() => ((incomming || webRtc.liveIncomingCall) ? answerHandler(apis, 'video') : _callHandler(apis, 'video'))} text="" style={{ marginLeft: 10, marginRight: 5 }} icon="mobile-video" intent={Intent.SUCCESS} />
      {(incomming || webRtc.liveIncomingCall || webRtc.showOutgoingCall) && <Button data-tip="End Call" onClick={() => closeHandler()} text="" style={{ marginLeft: 5 }} icon="phone" intent="danger" />}
    </div>
  );
};

export default Controller;
Controller.propTypes = {
  _callHandler: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  callType: PropTypes.string.isRequired,
  incomming: PropTypes.bool.isRequired,
  answerHandler: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
