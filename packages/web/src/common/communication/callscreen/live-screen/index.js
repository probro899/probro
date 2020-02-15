/* eslint-disable import/no-cycle */
import React from 'react';
import { Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { MdMessage } from 'react-icons/md';
import ScChatList from '../chat-list-on-live';
import ScChatHistory from '../chat-history-on-live';
// import streamConnector from '../streamConnector';
import { Badge } from '../../../../components';
import Controllers from './components/Controllers';
import MainScreen from './components/MainScreen';
import UsersScreen from './components/UsersScreens';
import { getChatList } from '../../chatlist/helper-function';

class LiveCallScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatList: false,
      showChatBox: null,
      unMessageCount: null,
      // streams: {},
    };
  }

  componentWillMount() {
    const { webRtc } = this.props;
    const unMessageCount = getChatList(this.props).find(obj => obj.connectionId === webRtc.localCallHistory.chatHistory.connectionId);
    this.setState({ unMessageCount });
  }

  componentDidMount() {
    const { webRtc, database, account } = this.props;
    if (webRtc.chatHistory.type === 'board' && webRtc.localCallHistory.chatHistory) {
      if (database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id) {
        const lastVideoElement = document.getElementById('video-mentor');
        if (lastVideoElement) {
          lastVideoElement.srcObject = webRtc.streams[account.user.id].stream[0];
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { webRtc } = this.props;
    const unMessageCount = getChatList(nextProps).find(obj => obj.connectionId === webRtc.localCallHistory.chatHistory.connectionId);
    this.setState({ unMessageCount });
  }

  // componentDidMount() {
  //   const { streams } = this.state;
  //   // streamConnector(streams, this.props);
  // }

  // async componentWillReceiveProps(nextProps) {
  //   const { streams } = this.state;
  //   const { webRtc } = nextProps;
  //   if (streams !== nextProps.webRtc.streams) {
  //     await this.setState({ streams: webRtc.streams });
  //     const newStreams = this.state.streams;
  //     streamConnector(newStreams, this.props);
  //   }
  // }

  handleClickChatBox = (val, showCurrent) => {
    const { updateWebRtc, webRtc } = this.props;
    if (showCurrent) {
      updateWebRtc('connectionId', webRtc.localCallHistory.chatHistory.connectionId);
      updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);
    }

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

  callReject = () => {
    const { closeHandler, change } = this.props;
    closeHandler();
    change('history');
  }

  render() {
    // console.log('Live Screen called', this.state);
    const { style, webRtc, database } = this.props;
    const { user, type } = webRtc.localCallHistory.chatHistory;
    const {
      showChatBox,
      showChatList,
      unMessageCount,
    } = this.state;
    // console.log('webRtc value in Live Screen', webRtc, database);
    return (
      <div
        className="call-screen"
        style={style}
      >
        {showChatList && <ScChatList onClose={this.handleClickChatList} onClickItem={this.handleClickChatBox} {...this.props} />}
        {showChatBox && <ScChatHistory onClose={this.handleClickChatBox} {...this.props} />}
        <div className="top">
          <Button minimal intent="default" icon="menu" onClick={this.handleClickChatList} />
          <div className="op-name">
            {type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].name}
          </div>
          <Button minimal onClick={() => this.handleClickChatBox(webRtc.showCommunication, true)}>
            <div style={{ position: 'relative'}}>
              <MdMessage size={18} />
              {unMessageCount.unSeenNo !== 0 && <Badge number={unMessageCount.unSeenNo} size={10} top={-5} />}
            </div>
          </Button>
        </div>
        <div className="video-container">
          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <UsersScreen {...this.props} />
            <MainScreen {...this.props} />
          </div>
        </div>
        <Controllers {...this.props} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scrollX', width: '100%' }}>
          {webRtc.recordedBlobs.map(a => Object.values(a)[0])}
        </div>
      </div>
    );
  }
}
export default LiveCallScreen;

LiveCallScreen.propTypes = {
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