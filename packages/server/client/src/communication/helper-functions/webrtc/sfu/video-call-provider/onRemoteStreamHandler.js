/* eslint-disable no-undef */
import _ from 'lodash';
import store from '../../../../../store';
import mediaRecorder from '../../mesh/mediaRecoder';

const stopAndRecordStream = async (props, userId, stream) => {
  const { webRtc } = store.getState();
  const { updateWebRtc } = props;
  if (webRtc.mediaRecording) {
    webRtc.mediaRecording.stopRecording();
    const mediaRecording = await mediaRecorder(1, props);
    await updateWebRtc('mediaRecording', mediaRecording);
  }
};

export default props => async (stream, uid) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  const { updateStream } = webRtc;
  // console.log('onRemoteStream handler', stream, 'updateStream status', updateStream);
  const userId = webRtc.localCallHistory.chatHistory.user.user.id;
  const hasUser = webRtc.connectedUsers[userId];
  if (hasUser) {
    const hasSameStream = hasUser.streams.find(s => _.isEqual(s, stream));
    if (!hasSameStream || updateStream) {
      await stopAndRecordStream(props, userId, stream);
      await updateWebRtc('connectedUsers',
        {
          ...webRtc.connectedUsers,
          [userId]: {
            ...webRtc.connectedUsers[userId],
            streams: webRtc.connectedUsers[userId] ? [...webRtc.connectedUsers[userId].streams, stream] : [stream],
          },
        });
    }
  } else {
    await updateWebRtc('connectedUsers',
      {
        ...webRtc.connectedUsers,
        [userId]: {
          ...webRtc.connectedUsers[userId],
          streams: webRtc.connectedUsers[userId] ? [...webRtc.connectedUsers[userId].streams, stream] : [stream],
        },
      });
  }
  await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, startTime: webRtc.localCallHistory.startTime || Date.now() });
  await updateWebRtc('lastStreamId', userId);
  await updateWebRtc('isLive', true);
  // console.log('remote stream handler', userId, store.getState().webRtc);
  // setInterval(() => console.log('current bit rate', webRtc.janus.oneToOneCall.getBitrate()), 10000);
};
