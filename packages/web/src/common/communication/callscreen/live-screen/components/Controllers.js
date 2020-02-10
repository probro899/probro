import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { MdCallEnd } from 'react-icons/md';
import callUpgrader from '../helper-functions/callUpgrader';
import { mediaRecorder } from '../../../helper-functions';

class Controllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWhiteBoard: false, startRecording: false };
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

  callReject = () => {
    const { closeHandler, change } = this.props;
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

  render() {
    const { webRtc, account } = this.props;
    const { showWhiteBoard, startRecording } = this.state;

    return (
      <div className="controllers" style={{ marginTop: -10 }}>
        {showWhiteBoard && <Redirect to={`/${account.user.slug}/drawing-board`} />}
        <div style={{ width: '80%', background: 'black', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ height: 50, width: 50, background: 'white', borderBottomRightRadius: 50 }} />
          <div style={{ padding: 10 }}>
            <Button style={{ height: 40, width: 40, borderRadius: 40, background: 'red', color: 'white' }} onClick={this.callReject}>
              <MdCallEnd size={30} />
            </Button>
            <Button
              style={{ height: 40, width: 40, borderRadius: 40, fontSize: 30 }}
              icon="mobile-video"
              onClick={() => this.callUpGradeController('video')}
              intent={webRtc.localCallHistory.mediaType === 'video' ? 'danger' : 'success'}
            />

            <Button
              style={{ height: 40, width: 40, borderRadius: 40, fontSize: 30 }}
              icon="duplicate"
              onClick={() => this.callUpGradeController('screenshare')}
              intent={webRtc.localCallHistory.mediaType === 'screenshare' ? 'danger' : 'success'}
            />
            <Button
              style={{ height: 40, width: 40, borderRadius: 40, fontSize: 30 }}
              icon="record"
              onClick={() => this.recordingHandler()}
              intent={startRecording ? 'danger' : 'success'}
            />
            <Button
              style={{ height: 40, width: 40, borderRadius: 40, fontSize: 30 }}
              icon="edit"
              onClick={() => this.callUpGradeController('whiteBoard')}
              intent={webRtc.localCallHistory.mediaType === 'whiteBoard' ? 'danger' : 'success'}
            />
          </div>
          <div style={{ height: 50, width: 50, background: 'white', borderBottomLeftRadius: 50 }} />
        </div>
      </div>
    );
  }
}
export default Controllers;
Controllers.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
