import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';
import Sound from 'react-sound';
import ringtone from '../../../../assets/ringtone.mp3';
import * as actions from '../../../../actions';
import client from '../../../../socket';
import MenuBar from './components/menuBar';
import Content from './components/content';
import IncommingCall from './components/incomming-call';
import { socketListner, closeHandler, callHandler, answerHandler } from './helper-functions';

class Index extends React.Component {
  state = {
    apis: null,
    callType: null,
    windowHeight: window.innerHeight * 0.85,
    windowWidth: window.innerWidth * 0.85,
  };

  async componentWillMount() {
    const apisRes = await client.scope('Mentee');
    this.setState({ apis: apisRes });
    socketListner(this.props, this.state);
    // console.log('state data', this.state);
  }

  render() {
    const { apis, callType, windowHeight, windowWidth } = this.state;
    const { webRtc } = this.props;
    return (
      <div>
        {webRtc.liveIncomingCall && <Sound url={ringtone} playStatus={Sound.status.PLAYING} playFromPosition={0} loop /> }
        <Dialog isOpen={webRtc.showCommunication || webRtc.communicationContainer === 'connecting'} style={{ width: 'auto', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: windowHeight, width: windowWidth }}>
            <div>
              <MenuBar {...this.props} />
              <Content {...this.props} callType={callType} apis={apis} _callHandler={callHandler(this.props, this.state)} answerHandler={answerHandler(this.props, this.state)} closeHandler={closeHandler(this.props, this.state)} />
            </div>
          </div>
        </Dialog>
        <Dialog isOpen={webRtc.showIncommingCall} style={{ zIndex: 12, height: 'auto', width: 'auto', padding: 0 }}>
          <div style={{ border: 'solid', borderWidth: 1, borderColor: 'white', borderRadius: 5 }}>
            {/* <MenuBar {...this.props} /> */}
            <IncommingCall {...this.props} answerHandler={answerHandler(this.props, this.state)} apis={apis} closeHandler={closeHandler(this.props, this.state)} />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Index);

Index.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
