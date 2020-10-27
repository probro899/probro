import React from 'react';
import PropTypes from 'prop-types';
import ChatList from '../chatlist';
import ChatHistory from '../chathistory';
import CallScreen from '../callscreen';
import IncomingCallScreen from '../callscreen/incomming-screen';
import { callHandler, closeHandler, answerHandler } from '../helper-functions/webrtc/sfu';

class ScreenProvider extends React.Component {
  state = {};

  render() {
    const { webRtc, switchScreenHandler, maximizeHandler, maximize, remoteCallEndMinimizer } = this.props;
    return (
      <>
        {!webRtc.showIncommingCall && webRtc.showCommunication && webRtc.communicationContainer === 'list' && (
          <ChatList
            change={switchScreenHandler}
            {...this.props}
          />
        )}
        {!webRtc.showIncommingCall && webRtc.communicationContainer === 'history' && webRtc.chatHistory && (
          <ChatHistory
            change={switchScreenHandler}
            _callHandler={callHandler(this.props)}
            {...this.props}
          />
        )}
        {!webRtc.showIncommingCall && webRtc.communicationContainer === 'connecting' && webRtc.localCallHistory.chatHistory && (
          <CallScreen
            toggleMaximize={maximizeHandler}
            isMaximum={maximize}
            minimize={webRtc.minimize}
            remoteCallEndMinimizer={remoteCallEndMinimizer}
            change={switchScreenHandler}
            closeHandler={closeHandler(this.props)}
            _callHandler={callHandler(this.props)}
            {...this.props}
          />
        )}
        {webRtc.showIncommingCall && webRtc.localCallHistory.chatHistory && (
          <IncomingCallScreen
            change={switchScreenHandler}
            webRtc={webRtc}
            answerHandler={answerHandler(this.props)}
            closeHandler={closeHandler(this.props)}
            {...this.props}
          />
        )}
      </>
    );
  }
}
export default ScreenProvider;

ScreenProvider.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  switchScreenHandler: PropTypes.func.isRequired,
  maximizeHandler: PropTypes.func.isRequired,
  maximize: PropTypes.bool.isRequired,
  remoteCallEndMinimizer: PropTypes.func.isRequired,
};
