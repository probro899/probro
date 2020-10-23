import store from '../../../../store';
import oneToCallAnswerHandler from './video-call-provider/answerCall';
import conferenceCallHandler from './conference-call-provider/initCall';
import exceptionHandler from './video-call-provider/exceptionHandler';

export default props => async (mediaType) => {
  try {
    const { updateWebRtc } = props;
    const { webRtc } = store.getState();
    const { localCallHistory } = webRtc;
    if (localCallHistory) {
      const callType = localCallHistory.chatHistory.type;
      if (callType === 'user') {
        oneToCallAnswerHandler(mediaType, props);
      }

      if (callType === 'board') {
        conferenceCallHandler(mediaType, props);
      }
      await updateWebRtc('showIncommingCall', false);
      await updateWebRtc('communicationContainer', 'connecting');
    } else {
      throw 'localCall history not found';
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 140 });
  }
};
