/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import * as actions from '../actions';
import client from '../socket';
import { initJanus, closeHandler, sfuSocketListner, deviceTest } from './helper-functions/webrtc/sfu';
import ErrorBoundary from '../common/ErrorBoundary';
import { updateChatList, updateUserActiveStatus, updateBoardActiveStatus } from './chatlist/helper-function';
import exceptionReporter from './helper-functions/webrtc/sfu/exceptionReporter';
import ScreenProvider from './screen-provider';

class Communication extends React.Component {
  state = {
    apis: null,
    maximize: false,
  };

  async componentDidMount() {
    const { updateWebRtc } = this.props;
    try {
      const apisRes = await client.scope('Mentee');
      await this.setState({ apis: apisRes });
      await updateWebRtc('apis', apisRes);
      // Getting chat logs
      const chatList = await apisRes.getChatlist();
      console.log('chat list', chatList);
      await updateWebRtc('chatList', chatList);
      // initializing janus for communication
      await initJanus(this.props, this.state);
      // updating device info microphone and webcam
      await deviceTest(updateWebRtc);
      sfuSocketListner(this.props, this.state, this.remoteCallEndMinimizer);
    } catch (e) {
      exceptionReporter({ error: e, errorCode: 148 });
    }
  }

  componentWillReceiveProps(newProps) {
    updateChatList(newProps, this.props);
    updateUserActiveStatus(newProps, this.props);
    updateBoardActiveStatus(newProps, this.props);
  }

  remoteCallEndMinimizer = () => {
    this.setState({ maximize: false });
  }

  toggleMinMax = () => {
    const { webRtc, updateWebRtc } = this.props;
    if (webRtc.minimize) {
      updateWebRtc('minimize', false);
      return;
    }
    updateWebRtc('minimize', true);
    this.setState({ maximize: false });
  }

  cutWindow = () => {
    const { updateWebRtc, webRtc } = this.props;
    const { apis } = this.state;
    updateWebRtc('minimize', false);
    this.setState({ maximize: false });

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
    // console.log('Props in communications', this.props);
    const { maximize, apis } = this.state;
    let height = '75%';
    if (maximize) {
      height = '100%';
    }
    const {
      webRtc,
    } = this.props;
    if (webRtc.minimize) {
      height = '40px';
    }
    return (
      (webRtc.showIncommingCall || webRtc.showCommunication) && apis && (
      <ErrorBoundary>
        <div
          className={maximize ? 'communicate pc-com-maximum' : 'communicate'}
          style={
            {
              height,
              animationName: webRtc.minimize ? 'slideDown' : 'slideUp',
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
            <ScreenProvider
              maximize={maximize}
              maximizeHandler={this.maximize}
              switchScreenHandler={this.switchScreen}
              remoteCallEndMinimizer={this.remoteCallEndMinimizer}
              {...this.props}
            />
          </div>
        </div>
      </ErrorBoundary>
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
