/* eslint-disable import/no-cycle */
import _ from 'lodash';
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default (stream, publisherId, updateWebRtc) => {
  try {
    const { webRtc } = store.getState();
    const hasUser = webRtc.connectedUsers[publisherId];
    if (hasUser) {
      const hasSameStream = hasUser.streams.find(s => _.isEqual(s, stream));
      if (!hasSameStream) {
        updateWebRtc('connectedUsers',
          {
            ...webRtc.connectedUsers,
            [publisherId]: {
              ...webRtc.connectedUsers[publisherId],
              streams: webRtc.connectedUsers[publisherId] ? [...webRtc.connectedUsers[publisherId].streams, stream] : [stream],
            },
          });
      }
      updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, startTime: webRtc.localCallHistory.startTime || Date.now() });
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 120 });
  }
};
