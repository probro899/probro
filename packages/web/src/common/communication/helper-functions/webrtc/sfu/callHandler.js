import store from '../../../../../store';
import janusMediaSelector from './janusMediaSelector';
import mediaSelector from '../../../mediaSelector';

export default (props, state) => async (apis, stream, mediaType, preMediaType) => {
  const { webRtc, account } = store.getState();
  const { janus, localCallHistory } = webRtc;
  const userId = localCallHistory.chatHistory.user.user.id;
  // console.log('janus call handler called', mediaType, 'userid', userId);
  if (webRtc.isCallUpgraded) {
    console.log('CALL UPGRADE', mediaType, stream);
    janus.oneToOneCall.createOffer(
      {
        media: janusMediaSelector(mediaType, preMediaType),
        success: (jsep) => {
          janus.oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
          janus.oneToOneCall.send({ message: { request: 'set' }, jsep });
        },
        error: (error) => {
          // An error occurred...
          console.error('Error creatign offer', error);
        },
      }
    );
  } else {
    janus.oneToOneCall.createOffer(
      {
        // No media property provided: by default,
        // it's sendrecv for audio and video
        media: janusMediaSelector(mediaType),
        iceRestart: true,
        success: (jsep) => {
          // Got our SDP! Send our OFFER to the plugin
          const body = { request: 'call', username: `${userId}` };
          janus.oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
          janus.oneToOneCall.send({ message: body, jsep });
        },
        error: (error) => {
          // An error occurred...
          console.error('Error creatign offer', error);
        },
        customizeSdp: (jsep) => {
          // if you want to modify the original sdp, do as the following
          // oldSdp = jsep.sdp;
          // jsep.sdp = yourNewSdp;
        },
      });
  }
};
