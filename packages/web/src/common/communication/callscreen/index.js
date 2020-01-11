import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { MdMessage } from 'react-icons/md';
import mediaSelector from '../mediaSelector';
import { MediaComponents } from '../components';
import { mediaRecorder } from '../helper-functions';
import ScChatList from './sc-chat-list';
import ScChatHistory from './sc-chat-history';
import OutgoingCallScreen from './OutgoingCallScreen';

class CallScreen extends React.Component {
  state = {
    startRecording: false,
    showWhiteBoard: false,
    activeAudio: false,
    activeVideo: false,
    activeScreenShare: false,
    activeDrawingBoard: false,
    showChatList: false,
    showChatBox: null,
    callStatus: { status: 'Connecting', redirect: false },
  };

  componentWillReceiveProps(nextProps) {
    const { webRtc } = this.props;
    if (webRtc !== nextProps.webRtc) {
      if (nextProps.webRtc.chatHistory.type === 'user') {
        const peerConnection = nextProps.webRtc.peerConnections[webRtc.chatHistory.user.user.id];
        if (peerConnection.iceCandidateStatus === 'connected') this.setState({ callStatus: { redirect: true, status: 'Connected' } });
        if (peerConnection.iceCandidateStatus === 'Ringing') this.setState({ callStatus: { redirect: false, status: 'Ringing' } });
        if (peerConnection.iceCandidateStatus === 'declined') {
          this.setState(
            {
              callStatus: { redirect: false, status: 'Declined' },
            }
          );
          setTimeout(() => { this.setState({ callStatus: { redirect: true, status: 'Declined' } }); }, 2000);
        }
      }
      if (nextProps.webRtc.chatHistory.type === 'board') {
        let redirect = false;
        let status = 'connecting';
        let count = 0;
        Object.values(nextProps.webRtc.peerConnections).map((obj) => {
          if (!redirect) {
            if (obj.iceCandidateStatus === 'connected') {
              redirect = true;
              status = 'Connected';
              count += 1;
            }
            if (obj.iceCandidateStatus === 'Ringing') {
              status = 'Ringing';
              count += 1;
            }
          }
        });
        this.setState({
          callStatus: { redirect, status },
        });
        if (count === 0 && Object.values(nextProps.webRtc.peerConnections).length > 0) {
          setTimeout(() => { this.setState({ callStatus: { redirect: true, status: 'Declined' } }); }, 2000);
        }
      }
    }
  }

  handleClickChatBox = (val) => {
    this.setState({
      showChatBox: val,
      showChatList: false,
    });
  }

  handleClickChatList = () => {
    const { showChatList } = this.state;
    this.setState({
      showChatList: !showChatList,
    });
  }

  callHandle = async (mediaType) => {
    const { _callHandler, apis, updateWebRtc, webRtc } = this.props;
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
    updateWebRtc('localStream', { ...webRtc.localStream, stream, mediaType });
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
    const { style, webRtc, account, database } = this.props;
    const { user, type } = webRtc.chatHistory;
    const {
      showWhiteBoard,
      startRecording,
      activeAudio,
      activeDrawingBoard,
      activeVideo,
      activeScreenShare,
      showChatBox,
      showChatList,
      callStatus,
    } = this.state;
    if (!webRtc.showCommunication) return <div />;
    if (!callStatus.redirect) return <OutgoingCallScreen callStatus={callStatus.status} callReject={this.callReject} parentProps={this.props} />;
    return (
      <div
        className="call-screen"
        style={style}
      >
        {showChatList && <ScChatList onClose={this.handleClickChatList} onClickItem={this.handleClickChatBox} />}
        {showChatBox && <ScChatHistory onClose={this.handleClickChatBox} />}
        {showWhiteBoard && <Redirect to={`/${account.user.slug}/drawing-board`} />}
        <div className="top">
          <Button minimal intent="default" icon="menu" onClick={this.handleClickChatList} />
          <div className="op-name">
            {type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.showCommunication].name}
          </div>
          <Button minimal onClick={() => this.handleClickChatBox(webRtc.showCommunication)}>
            <MdMessage size={18} />
          </Button>
        </div>
        <div className="video-container">
          <MediaComponents account={account} webRtc={webRtc} />
        </div>
        <div className="controllers" style={{ zIndex: 2 }}>
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  _callHandler: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CallScreen;
