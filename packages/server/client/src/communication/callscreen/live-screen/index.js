/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import React from 'react';
// import { Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { MdMessage } from 'react-icons/md';
import { TiArrowMaximise, TiArrowMinimise } from 'react-icons/ti';
import ScChatList from '../chat-list-on-live';
import ScChatHistory from '../chat-history-on-live';
import { Badge } from '../../../components';
import Controllers from './components/Controllers';
import MainScreen from './components/MainScreen';
import UsersScreen from './components/UsersScreens';
import { getChatList } from '../../chatlist/helper-function';
import ImageOnMainScreen from './components/ImageOnMainScreen';
import CallTimer from './components/CallTimer';
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from '../../../common/utility-functions/Button/Button';


class LiveCallScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatList: false,
      showChatBox: null,
      unMessageCount: null,
    };
  }

  componentWillMount() {
    const { webRtc } = this.props;
    const unMessageCount = getChatList(this.props).find(obj => obj.connectionId === webRtc.localCallHistory.chatHistory.connectionId);
    this.setState({ unMessageCount });
  }

  componentDidMount() {
    const { webRtc, database, account } = this.props;
    if (webRtc.localCallHistory.chatHistory.type === 'board' && webRtc.localCallHistory.chatHistory) {
      if (database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id) {
        const lastVideoElement = document.getElementById('video-mentor');
        if (lastVideoElement) {
          // lastVideoElement.srcObject = webRtc.connectedUsers.stream[0];
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { webRtc } = this.props;
    const unMessageCount = getChatList(nextProps).find(obj => obj.connectionId === webRtc.localCallHistory.chatHistory.connectionId);
    this.setState({ unMessageCount });
  }

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
    const { webRtc, isMaximum, database, toggleMaximize, minimize } = this.props;
    const { user, type } = webRtc.localCallHistory.chatHistory;
    const {
      showChatBox,
      showChatList,
      unMessageCount,
    } = this.state;
    // console.log('Mentor Main', this.props);
    return (
      <div
        className="call-screen"
      >
        {showChatList && <ScChatList onClose={this.handleClickChatList} onClickItem={this.handleClickChatBox} {...this.props} />}
        {showChatBox && <ScChatHistory onClose={this.handleClickChatBox} {...this.props} />}
        <div className="top">
          {/* <Button minimal className="arrow-btn" intent="default" icon="menu" onClick={this.handleClickChatList} /> */}
          <div className="pc-menu-live">
            <AiOutlineMenu size={20} onClick={this.handleClickChatList} />
          </div>
          <div className="op-name">
            <div style={{ display: 'flex' }}>
              {type === 'user' ? `${user.user.firstName} ${user.user.lastName}` : database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].name}
              <CallTimer {...this.props} />
            </div>
          </div>
          {/* <Button className="arrow-btn" minimal onClick={() => this.handleClickChatBox(webRtc.showCommunication, true)}>
            <div style={{ position: 'relative' }}>
              <MdMessage size={18} />
              {unMessageCount ? (unMessageCount.unSeenNo !== 0 && <Badge number={unMessageCount.unSeenNo} size={10} top={-5} />) : null}
            </div>
          </Button> */}

          <div className="pc-live-chat-history">
            <MdMessage size={20} onClick={() => this.handleClickChatBox(webRtc.showCommunication, true)} />
            <div style={{ position: 'relative' }}>
              {unMessageCount ? (unMessageCount.unSeenNo !== 0 && <Badge number={unMessageCount.unSeenNo} size={10} top={-16} />) : null}
            </div>
          </div>

        </div>
        <div className="video-container">
          <div className="pc-maxmin-btn">
            {/* <Button onClick={toggleMaximize} className="pc-control-btn">
              {isMaximum ? <TiArrowMinimise size={25} /> : <TiArrowMaximise size={25} />}
            </Button> */}
            < Button
              className="pc-control-btn"
              onClick={toggleMaximize}
              icon={isMaximum ? <TiArrowMinimise size={25} /> : <TiArrowMaximise size={25} />}
              type="button"
              buttonStyle="btn--circle-icons"
              buttonSize="btn--small"
            />
          </div>
          <ImageOnMainScreen {...this.props} />
          <UsersScreen {...this.props} />
          <MainScreen {...this.props} />
        </div>
        {!minimize && <Controllers toggleMaximize={toggleMaximize} {...this.props} />}
        <div className="pc-record-container">
          {webRtc.recordedBlobs.map(a => Object.values(a)[0])}
          {/* <span className="recorded-item">Record 1</span> */}
        </div>
      </div>
    );
  }
}
export default LiveCallScreen;

LiveCallScreen.propTypes = {
  minimize: PropTypes.bool.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  change: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  _callHandler: PropTypes.func.isRequired,
  toggleMaximize: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  isMaximum: PropTypes.bool.isRequired,
};
