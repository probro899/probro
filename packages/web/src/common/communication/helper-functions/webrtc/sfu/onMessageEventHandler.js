import Janus from '../../../../../webrtc/sfu/janus';
import inCommingCallHandler from './incomingCallHandler';
import callAcceptHandler from './callAcceptHandler';
import store from '../../../../../store';
import janusMediaSelector from './janusMediaSelector';

export default props => (msg, jsep) => {
  const { webRtc } = store.getState();
  const { localCallHistory } = webRtc;
  const { janus } = webRtc;
  // We got a message/event (msg) from the plugin
  // If jsep is not null, this involves a WebRTC negotiation

  Janus.log(' ::: Got a message :::', msg);
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
        // TODO Any ringtone?
      } else if (event === 'incomingcall') {
        Janus.log('Incoming call from', result.username);
        inCommingCallHandler(props, msg, jsep);
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
      }
    }
  } else if (jsep) {
    if (jsep.type === 'answer') {
      Janus.log('Answer Arrived', jsep);
      janus.oneToOneCall.handleRemoteJsep(jsep);
    }
    // FIXME Error?
  }
};
