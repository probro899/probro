/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import * as actions from '../../actions';
import client from '../../socket';
import ChatList from './chatlist';
import ChatHistory from './chathistory';
import CallScreen from './callscreen';
import IncomingCallScreen from './IncomingCallScreen';
import { initJanus, callHandler, closeHandler, answerHandler, sfuSocketListner } from './helper-functions/webrtc/sfu';

class Communication extends React.Component {
  state = {
    minimize: false,
    apis: null,
    maximize: false,
  };

  async componentDidMount() {
    const { updateWebRtc } = this.props;
    try {
      const apisRes = await client.scope('Mentee');
      await this.setState({ apis: apisRes });
      updateWebRtc('apis', apisRes);
      initJanus(this.props, this.state);
      sfuSocketListner(this.props, this.state, this.remoteCallEndMinimizer);
    } catch (e) {
      console.error('error in fetching apis in communication');
    }
  }

  remoteCallEndMinimizer = () => {
    this.setState({ maximize: false });
  }

  toggleMinMax = () => {
    const { minimize } = this.state;
    if (minimize) {
      this.setState({ minimize: false });
      return;
    }
    this.setState({ minimize: true, maximize: false });
  }

  cutWindow = () => {
    const { updateWebRtc, webRtc } = this.props;
    const { apis } = this.state;
    this.setState({ maximize: false, minimize: false });

    if (webRtc.isLive) {
      closeHandler(this.props, this.state, apis)();
    }

    updateWebRtc('showCommunication', false);
    updateWebRtc('showIncommingCall', false);
  }

  switchScreen = async (target) => {
    const { updateWebRtc } = this.props;
    updateWebRtc('communicationContainer', target);
  }

  maximize = () => {
    const { maximize } = this.state;
    this.setState({
      maximize: !maximize,
    });
  }

  render() {
<<<<<<< HEAD
    // console.log('Props in communications', this.props);
=======
>>>>>>> e25691ae4172372a05c1048a9eaf30a1b1147eca
    const { minimize, apis, maximize } = this.state;
    let height = '75%';
    if (maximize) {
      height = '100%';
    }
    if (minimize) {
      height = '40px';
    }
    const {
      webRtc,
      updateWebRtc,
    } = this.props;
    return (
      (webRtc.showIncommingCall || webRtc.showCommunication) && (
      <div
        className={maximize ? 'communicate pc-com-maximum' : 'communicate'}
        style={
          {
            height,
            animationName: minimize ? 'slideDown' : 'slideUp',
            animationDuration: '0.3s',
          }
        }
      >
        <div className="header">
          <div className="win-title" onClick={this.toggleMinMax}>
            Messaging
          </div>
          <div className="control-icons">
            <Icon iconSize={20} icon="small-cross" style={{ cursor: 'pointer' }} onClick={this.cutWindow} />
          </div>
        </div>
        <div
          className="content"
        >
          {!webRtc.showIncommingCall && webRtc.showCommunication && webRtc.communicationContainer === 'list' && (
          <ChatList
              // style={!webRtc.showIncommingCall && webRtc.communicationContainer === 'list' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
            apis={apis}
            {...this.props}
          />
          )
            }

          {!webRtc.showIncommingCall && webRtc.communicationContainer === 'history' && apis && (
          <ChatHistory
            // style={!webRtc.showIncommingCall && webRtc.communicationContainer === 'history' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            {...this.props}
          />
          )}
          {!webRtc.showIncommingCall && webRtc.communicationContainer === 'connecting' && webRtc.localCallHistory.chatHistory && (
          <CallScreen
            toggleMaximize={this.maximize}
            isMaximum={maximize}
            minimize={minimize}
            remoteCallEndMinimizer={this.remoteCallEndMinimizer}
            change={this.switchScreen}
            updateWebRtc={updateWebRtc}
            closeHandler={closeHandler(this.props, this.state, apis)}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            {...this.props}
          />
          )
          }
          {webRtc.showIncommingCall && webRtc.localCallHistory.chatHistory && (
          <IncomingCallScreen
            // style={webRtc.showIncommingCall ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            webRtc={webRtc}
            answerHandler={answerHandler(this.props, this.state, apis)}
            apis={apis}
            updateWebRtc={updateWebRtc}
            closeHandler={closeHandler(this.props, this.state, apis)}
            {...this.props}
          />
          )
          }
        </div>
      </div>
      )
    );
  }
}

Communication.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Communication);
