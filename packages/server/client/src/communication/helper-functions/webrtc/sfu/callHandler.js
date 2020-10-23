import store from '../../../../store';
import isJanusConnected from './isJanusConnected';
import { initCall as initConferenceCall } from './conference-call-provider';
import { initOneToOneCall } from './video-call-provider';
import exceptionHandler from './conference-call-provider/exceptionHandler';

export default props => async (mediaType) => {
  try {
    const { webRtc } = store.getState();
    const { localCallHistory } = webRtc;
    const isConnected = await isJanusConnected(props);
    if (isConnected) {
      let callType;
      if (localCallHistory) {
        if (localCallHistory.chatHistory) {
          callType = localCallHistory.chatHistory.type;
          if (callType === 'user') {
            initOneToOneCall(mediaType, props);
          }
          if (callType === 'board') {
            initConferenceCall(mediaType, props);
          }
        } else {
          throw 'chatHistory not found in localCallHistory';
        }
      } else {
        throw 'localCallHistory not found in webRtc';
      }
    } else {
      throw 'janus is connection faild';
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 121 });
  }
};
