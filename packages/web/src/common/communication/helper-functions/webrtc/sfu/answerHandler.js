import store from '../../../../../store';
import Janus from '../../../../../webrtc/sfu/janus';
import janusMediaSelector from './janusMediaSelector';

export default props => async (apism, stream, mediaType) => {
  console.log('anser handler called', mediaType);
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const { janus } = webRtc;
  janus.oneToOneCall.createAnswer(
    {
      jsep: janus.jsep,
      media: janusMediaSelector(mediaType),
      iceRestart: true,
      success: (jsep) => {
        Janus.log('Got SDP!');
        Janus.debug(jsep);
        const body = { request: 'accept' };
        janus.oneToOneCall.send({ message: body, jsep });
        janus.oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
      },
      error: (error) => {
        Janus.error('WebRTC error:', error);
      },
    }
  );
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
};
