import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import mediaSelector from './mediaSelector';
import { MediaComponents } from './components';
import { mediaRecorder } from './helper-functions';

class CallScreen extends React.Component {
  state = {
    startRecording: false,
    showWhiteBoard: false,
    activeAudio: false,
    activeVideo: false,
    activeScreenShare: false,
    activeDrawingBoard: false,
  };

  goBack = () => {
    const { change } = this.props;
    change('history');
  }

  callHandle = async (mediaType) => {
    const { _callHandler, apis } = this.props;
    const { activeAudio, activeDrawingBoard, activeVideo, activeScreenShare } = this.state;
    switch (mediaType) {
      case 'audio':
        await this.setState({ activeAudio: !activeAudio });
        break;
      case 'video':
        await this.setState({ activeVideo: !activeVideo });
        break;
      case 'screenshare':
        await this.setState({ activeVideo: false, activeDrawingBoard: false });
        await this.setState({ activeScreenShare: !activeScreenShare });
        break;
      case 'whiteBoard':
        await this.setState({ activeScreenShare: false, activeVideo: false });
        await this.setState({ activeDrawingBoard: !activeDrawingBoard });
        await this.setState({ showWhiteBoard: true });
        break;
      default:
        return null;
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
    const { style, webRtc, account,database } = this.props;
    const { user, boardDetails, type, broadCastId } = webRtc.chatHistory;
    const { showWhiteBoard, startRecording, activeAudio, activeDrawingBoard, activeVideo, activeScreenShare } = this.state;

    // console.log('Props in call screen', this.props);
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
            {type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.showCommunication].name}
          </div>
          <div />
        </div>
        <div className="video-container">
          <MediaComponents account={account} webRtc={webRtc} />
        </div>
        <div className="controllers" style={{ zIndex: 20 }}>
          <Button icon="phone" intent={activeAudio ? 'danger' : 'success'} onClick={() => this.callHandle('audio')} />
          <Button icon="mobile-video" onClick={() => this.callHandle('video')} intent={activeVideo ? 'danger' : 'success'} />
          <Button icon="cross" intent="danger" onClick={this.callReject} />
          <Button icon="duplicate" onClick={() => this.callHandle('screenshare')} intent={activeScreenShare ? 'danger' : 'success'} />
          <Button icon="record" onClick={() => this.recordingHandler()} intent={startRecording ? 'danger' : 'success'} />
          <Button icon="edit" onClick={() => this.callHandle('whiteBoard')} intent={activeDrawingBoard ? 'danger' : 'success'} />
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
  change: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CallScreen;
