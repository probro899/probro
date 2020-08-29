import store from '../../../../../store';
import mediaRecorder from './mediaRecoder';

const stopAndRecordStream = async (props, userId, stream) => {
  // console.log('stopAndRecordStream', stream.id, userId);
  const { webRtc } = store.getState();
  const { updateWebRtc } = props;
  if (webRtc.mediaRecording && stream.id !== webRtc.mediaRecording.stream.id) {
    // console.log('stopAndRecordStream inisde', webRtc.mediaRecording.stream.id, stream.id);
    webRtc.mediaRecording.stopRecording();
    const mediaRecording = await mediaRecorder(1, props);
    await updateWebRtc('mediaRecording', mediaRecording);
  }
};

export default props => async (stream, userId) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  // console.log(`${userId})GOT REMOTE STREAM`, stream);
  await updateWebRtc('connectedUsers',
    {
      ...webRtc.connectedUsers,
      [userId]: {
        ...webRtc.connectedUsers[userId],
        streams: webRtc.connectedUsers[userId] ? [...webRtc.connectedUsers[userId].streams, stream] : [stream],
      },
    });


  await updateWebRtc('streams', {
    ...webRtc.streams,
    [userId]: {
      ...webRtc.streams[userId],
      startTimeStamp: webRtc.streams[userId].startTimeStamp || Date.now(),
      endTimeStamp: null,
      stream: webRtc.streams[userId] ? [...webRtc.streams[userId].stream, stream] : [stream],
    },
  });
  await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, startTime: webRtc.localCallHistory.startTime || Date.now() });
  await updateWebRtc('lastStreamId', userId);
  // await updateWebRtc('isLive', true);
  await stopAndRecordStream(props, userId, stream);

  // console.log('remote stream handler', userId, store.getState().webRtc);
};
