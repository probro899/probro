import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Button, Position } from '@blueprintjs/core';
import Tooltip from 'react-tooltip';
import { TiMediaRecord } from 'react-icons/ti';
import { FiMic, FiMicOff, FiEdit2, FiCopy, FiVideo, FiPhone } from 'react-icons/fi';
import callUpgrader from '../helper-functions/callUpgrader';
import { mediaRecorder } from '../../../helper-functions';

class Controllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWhiteBoard: false, startRecording: false };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { webRtc } = this.props;
  //   console.log(webRtc);
  //   if (webRtc.localCallHistory.mediaType !== nextProps.webRtc.localCallHistory.mediaType) {
  //     return true;
  //   }
  //   return false;
  // }

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

  callReject = () => {
    // console.log('PROPS IN CALL REJECT', this.props);
    const { closeHandler, change, toggleMaximize, remoteCallEndMinimizer} = this.props;
    remoteCallEndMinimizer();
    closeHandler();
    change('history');
  }

  callUpGradeController = async (currentMediaType) => {
    const { webRtc } = this.props;
    if (webRtc.localCallHistory.mediaType === currentMediaType) {
      callUpgrader('audio', this.props);
    } else if (currentMediaType === 'whiteBoard') {
      await this.setState({ showWhiteBoard: true });
      callUpgrader(currentMediaType, this.props);
    } else {
      callUpgrader(currentMediaType, this.props);
    }
  }

  muteToggle = () => {
    // perform mute here
  }

  render() {
    const { webRtc, account } = this.props;
    const { showWhiteBoard, startRecording } = this.state;
    return (
      <div className="controllers">
        <Tooltip />
        {showWhiteBoard && <Redirect to={`/${account.user.slug}/drawing-board`} />}
        <Button data-tip="Call End" className="pc-control-btn bg-red" onClick={this.callReject}>
          <FiPhone size={20} />
        </Button>
        <Button
          data-tip="Video"
          className={webRtc.localCallHistory.mediaType === 'video' ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController('video')}
        >
          <FiVideo size={20} />
        </Button>
        <Button
          data-tip="ScreenShare"
          className={webRtc.localCallHistory.mediaType === 'screenshare' ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController('screenshare')}
        >
          <FiCopy size={20} />
        </Button>
        <Button
          data-tip="Recording"
          onClick={() => this.recordingHandler()}
          className={startRecording ? 'pc-control-btn active record' : 'pc-control-btn'}
        >
          <TiMediaRecord size={20} />
        </Button>
        {/* <Link to={`/${account.user.slug}/drawing-board`}> */}
        <Button
          data-tip="White Board"
          className={webRtc.localCallHistory.mediaType === 'whiteBoard' ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController('whiteBoard')}
        >
          <FiEdit2 size={20} />
        </Button>
        {/* </Link> */}
        {/* <Button
          data-tip="Mute"
          className={webRtc.localCallHistory.mediaType === 'audio' ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController('audio')}
        >
          <FiMic size={20} />
        </Button> */}
      </div>
    );
  }
}
export default Controllers;
Controllers.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  toggleMaximize: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
