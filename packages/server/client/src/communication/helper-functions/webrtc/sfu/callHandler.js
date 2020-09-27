import store from '../../../../store';
import oneToOneCallHandler from './oneToOneCallHandler';
import conferenceCallHandler from './conferenceCallHandler';

export default (props, state) => async (apis, stream, mediaType, preMediaType) => {
  const { webRtc } = store.getState();
  const { localCallHistory } = webRtc;
  const callType = localCallHistory.chatHistory.type;
  // console.log('janus call handler called', mediaType, 'userid', localCallHistory.chatHistory.type);
  if (callType === 'user') {
    oneToOneCallHandler(mediaType, preMediaType, state);
  }
  if (callType === 'board') {
    conferenceCallHandler(mediaType, preMediaType, state, props);
  }
};
