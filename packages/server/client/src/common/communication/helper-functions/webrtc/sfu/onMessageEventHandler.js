/* eslint-disable import/no-cycle */
import Janus from '../../../../../webrtc/sfu/janus';
import inCommingCallHandler from './incomingCallHandler';
import callAcceptHandler from './callAcceptHandler';
import store from '../../../../../store';
import janusMediaSelector from './janusMediaSelector';
import conferenceEventHandler from './conferenceEventHandler';
import remoteHangupHandler from './remoteHangupHandler';

export default (props, state) => (msg, jsep) => {
  const { webRtc } = store.getState();
  const { localCallHistory } = webRtc;
  const { updateWebRtc } = props;
  // const callType = localCallHistory.chatHistory.type;
  const { janus } = webRtc;
  // We got a message/event (msg) from the plugin
  // If jsep is not null, this involves a WebRTC negotiation
  Janus.log(' ::: Got a message onMessageHandler :::', msg);
  const { result } = msg;
  if (result !== null && result !== undefined) {
    if (result.list !== undefined && result.list !== null) {
      const { list } = result;
      Janus.debug('Got a list of registered peers:', list);
    } else if (result.event !== undefined && result.event !== null) {
      const { event } = result;
      if (event === 'registered') {
        const myusername = result.username;
        Janus.log('Successfully registered as ', myusername);
        // TODO Enable buttons to call now
      } else if (event === 'calling') {
        Janus.log('Waiting for the peer to answer...');
        const userId = localCallHistory.chatHistory.user.user.id;
        updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { ...webRtc.connectedUsers[userId], streams: [], status: 'ringing' } });
        // TODO Any ringtone?
      } else if (event === 'incomingcall') {
        Janus.log('Incoming call from', result.username);
        inCommingCallHandler(props, state, msg, jsep);
      } else if (event === 'accepted') {
        callAcceptHandler(props, msg);
        if (jsep) {
          janus.oneToOneCall.handleRemoteJsep({ jsep });
        }
      } else if (event === 'update') {
        // An 'update' event may be used to provide renegotiation attempts
        Janus.log('Update the current peer');
        if (jsep) {
          if (jsep.type === 'answer') {
            janus.oneToOneCall.handleRemoteJsep({ jsep });
          } else {
            janus.oneToOneCall.createAnswer(
              {
                jsep,
                media: janusMediaSelector(localCallHistory.mediaType),
                success: (jsep) => {
                  const body = { request: 'set' };
                  janus.oneToOneCall.send({ message: body, jsep });
                },
                error: (error) => {
                  Janus.error('WebRTC error:', error);
                },
              }
            );
          }
        }
      } else if (event === 'hangup') {
        // Remote HangUp handler
        remoteHangupHandler(props, state, msg);
      }
    }
  } else if (jsep) {
    if (jsep.type === 'answer') {
      const { webRtc } = store.getState();
      const callType = webRtc.localCallHistory.chatHistory.type;
      const { janus } = webRtc;
      Janus.log('Answer Arrived', jsep, callType, janus);
      if (callType === 'user') {
        janus.oneToOneCall.handleRemoteJsep(jsep);
      }
      if (callType === 'board') {
        // console.log('Board remote handle called');
        janus.conferenceCall.handleRemoteJsep({ jsep });
      }
    }
    // FIXME Error?
  }
  if (msg.videoroom) {
    conferenceEventHandler(msg, props);
  }
};
