import store from '../../../../../store';
import janusMediaSelector from './janusMediaSelector';

export default (mediaType, preMediaType) => {
  try {
    const { webRtc, account } = store.getState();
    const { janus, localCallHistory } = webRtc;
    const userId = localCallHistory.chatHistory.user.user.id;
    if (webRtc.isCallUpgraded) {
      // console.log('CALL UPGRADE', mediaType);
      if (mediaType === 'mute' || mediaType === 'unmute') {
        if (mediaType === 'mute') {
          janus.oneToOneCall.muteAudio();
        }
        if (mediaType === 'unmute') {
          janus.oneToOneCall.unmuteAudio();
        }
      } else {
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
      }
    } else {
      janus.oneToOneCall.createOffer(
        {
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
        }
      );
    }
  } catch (e) {
    console.error('oneToOneCall Error', e);
  }
};
