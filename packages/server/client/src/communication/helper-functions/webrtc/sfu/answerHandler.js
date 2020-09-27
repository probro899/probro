import store from '../../../../store';
import Janus from '../../../../webrtc/sfu/janus';
import janusMediaSelector from './janusMediaSelector';
import oneToOneCallHandler from './oneToOneCallHandler';
import conferenceCallHandler from './conferenceCallHandler';

export default (props, state) => async (apism, stream, mediaType) => {
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const { apis } = webRtc;
  const { janus, localCallHistory } = webRtc;
  const callType = localCallHistory.chatHistory.type;

  if (callType === 'user') {
    // oneToOneCallHandler(mediaType, preMediaType, state);
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
  }
  if (callType === 'board') {
    conferenceCallHandler(mediaType, null, { apis }, props);
  }

  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
};
