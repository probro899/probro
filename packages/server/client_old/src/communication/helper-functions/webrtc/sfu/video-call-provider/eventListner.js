/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import inCommingCallHandler from './incomingCallHandler';
import callAcceptHandler from '../callAcceptHandler';
import store from '../../../../../store';
import janusMediaSelector from '../janusMediaSelector';
import remoteHangupHandler from './remoteHangupHandler';
import exceptionHandler from './exceptionHandler';

export default (props, state) => (msg, jsep) => {
  try {
    const { webRtc } = store.getState();
    // console.log('on message event called', msg, jsep);
    const { localCallHistory } = webRtc;
    const { updateWebRtc } = props;
    const { janus } = webRtc;
    const { result, error, error_code } = msg;
    if (janus) {
      const { oneToOneCall } = janus;
      if (oneToOneCall) {
        if (result !== null && result !== undefined) {
          if (result.event !== undefined && result.event !== null) {
            const { event } = result;
            if (event === 'registered') {
              // add flag that allow the registration again if faild;
              // const myusername = result.username;
            } else if (event === 'calling') {
              const userId = localCallHistory.chatHistory.user.user.id;
              updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { ...webRtc.connectedUsers[userId], streams: [], status: 'ringing' } });
            } else if (event === 'incomingcall') {
              inCommingCallHandler(props, state, msg, jsep);
            } else if (event === 'accepted') {
              callAcceptHandler(props, msg);
              if (jsep) {
                oneToOneCall.handleRemoteJsep({ jsep });
              }
            } else if (event === 'update') {
              // console.log('update current session', 'type =>', jsep.type, 'mediaType =>', localCallHistory.mediaType);
              if (jsep) {
                if (jsep.type === 'answer') {
                  oneToOneCall.handleRemoteJsep({ jsep });
                } else {
                  oneToOneCall.createAnswer(
                    {
                      jsep,
                      media: localCallHistory.mediaType === 'screenshare' ? null : janusMediaSelector(localCallHistory.mediaType),
                      success: (currentJsep) => {
                        const body = { request: 'set' };
                        oneToOneCall.send({ message: body, jsep: currentJsep });
                      },
                      error: (err) => {
                        throw err;
                      },
                    }
                  );
                }
              }
            } else if (event === 'hangup') {
              remoteHangupHandler(props, state, msg);
            }
          }
        } else if (jsep) {
          if (jsep.type === 'answer') {
            oneToOneCall.handleRemoteJsep(jsep);
          }
        } else if (error && error_code) {
          throw `${error} errorCode: ${error_code}`;
        }
      } else {
        throw 'video plugin not found';
      }
    } else {
      throw 'Janus not found in store';
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 138 });
  }
};
