import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import Tooltip from 'react-tooltip';
import { TiMediaRecord } from 'react-icons/ti';
import { FiMic, FiCopy, FiVideo, FiPhone } from 'react-icons/fi';
import callUpgrader from '../helper-functions/callUpgrader';
import { mediaRecorder } from '../../../helper-functions/webrtc/mesh';

class Controllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWhiteBoard: false, startRecording: false };
  }

  componentWillReceiveProps(newProps) {
    const { webRtc, database } = newProps;
    if (webRtc.isLive) {
      const { type, connectionId } = webRtc.localCallHistory.chatHistory;
      if (type === 'board') {
        const { activeStatus } = Object.values(database.Board.byId).find(b => b.id === parseInt(connectionId, 10));
        // console.log('Board active status', activeStatus);
        if (!activeStatus) {
          this.callReject('autoClose');
        }
      }
    }
  }

  recordingHandler = async () => {
    console.log('media recorder called 1');
    const { startRecording } = this.state;
    const { updateWebRtc, webRtc } = this.props;
    if (!startRecording) {
      const mediaRecording = await mediaRecorder(1, this.props);
      await updateWebRtc('mediaRecording', mediaRecording);
      this.setState({ startRecording: true });
    } else {
      await webRtc.mediaRecording.stopRecording();
      await updateWebRtc('mediaRecording', null);
      this.setState({ startRecording: false });
    }
  }

  callReject = (autoClose) => {
    const { closeHandler, change, remoteCallEndMinimizer } = this.props;
    remoteCallEndMinimizer();
    closeHandler(autoClose);
    change('history');
  };

  callUpGradeController = async (currentMediaType) => {
    const { webRtc } = this.props;
    const preMediaType = webRtc.localCallHistory.mediaType;
    // console.log('MideaStatus', preMediaType, currentMediaType);
    if (preMediaType === currentMediaType) {
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
    console.log('props in controller', this.props);
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
        {/* <Button
          data-tip="White Board"
          className={webRtc.localCallHistory.mediaType === 'whiteBoard' ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController('whiteBoard')}
        >
          <FiEdit2 size={20} />
        </Button> */}
        {/* </Link> */}
        <Button
          data-tip="Mute"
          className={webRtc.localCallHistory.mute ? 'pc-control-btn active' : 'pc-control-btn'}
          onClick={() => this.callUpGradeController(webRtc.localCallHistory.mute ? 'unmute' : 'mute')}
        >
          <FiMic size={20} />
        </Button>
      </div>
    );
  }
}
export default Controllers;
Controllers.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  remoteCallEndMinimizer: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
