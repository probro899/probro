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
import { socketListner, callHandler, answerHandler, closeHandler } from './helper-functions';

class Communication extends React.Component {

  state = {
    minimize: false,
    apis: {},
  };

  async componentWillMount() {
    // console.log('commnucation mount');
    let apisRes = null;
    try {
      apisRes = await client.scope('Mentee');
    } catch (e) {
      console.error('error in fetching apis in communication');
    }
    await this.setState({ apis: apisRes });
    socketListner(this.props, this.state);
  }

  toggleMinMax = () => {
    const { minimize } = this.state;
    this.setState({
      minimize: false,
    });
  }

  cutWindow = () => {
    const { updateWebRtc, webRtc } = this.props;
    updateWebRtc('showCommunication', false);
    updateWebRtc('showIncommingCall', false);
  }

  switchScreen = async (target) => {
    const { updateWebRtc, webRtc } = this.props;
    // console.log('close handler in index', webRtc);
    if (webRtc.isLive) {
      // console.log('close handler called in index');
      // closeHandler(this.props)();
    }
    updateWebRtc('communicationContainer', target);
  }

  manimizeCommunication = () => {
    this.setState({ minimize: true });
  }

  render() {
    const { minimize, apis } = this.state;
    const {
      webRtc,
      updateWebRtc,
    } = this.props;
    // console.log('apis', apis, 'props', this.props);
    return (
      (webRtc.showIncommingCall || webRtc.showCommunication) && (
      <div
        className="communicate"
        style={
          {
            height: minimize ? '31px' : '75%',
            animationName: minimize ? 'slideDown' : 'slideUp',
            animationDuration: '0.3s',
            // display: webRtc.showCommunication || webRtc.showIncommingCall ? 'block' : 'none',
          }
        }
      >
        <div className="header" style={{ background: '#154155', cursor: 'pointer' }}>
          <div className="win-title">
            Messaging
          </div>
          <div className="control-icons">
            <div>
              { minimize ? <Icon iconSize={20} icon="expand-all" style={{ cursor: 'pointer' }} onClick={this.toggleMinMax} />
                : <Icon iconSize={20} icon="minus" style={{ cursor: 'pointer' }} onClick={this.manimizeCommunication} />
              }
              {/* <Icon icon="maximize" style={{ cursor: 'pointer' }} iconSize={14} /> */}
              <Icon
                iconSize={20}
                icon="small-cross"
                style={{ cursor: 'pointer' }}
                onClick={this.cutWindow}
              />
            </div>
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

          {!webRtc.showIncommingCall && webRtc.communicationContainer === 'history' && (
          <ChatHistory
            // style={!webRtc.showIncommingCall && webRtc.communicationContainer === 'history' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            {...this.props}
          />
          )}
          {!webRtc.showIncommingCall && webRtc.communicationContainer === 'connecting' && webRtc.chatHistory.type && (
          <CallScreen
            // style={!webRtc.showIncommingCall && webRtc.communicationContainer === 'connecting' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
            updateWebRtc={updateWebRtc}
            closeHandler={closeHandler(this.props, this.state, apis)}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            {...this.props}
          />
          )
          }
          {webRtc.showIncommingCall && webRtc.chatHistory.type && (
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
