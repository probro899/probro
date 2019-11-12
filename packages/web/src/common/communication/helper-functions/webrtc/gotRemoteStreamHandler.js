import store from '../../../../store';
import mediaRecorder from './mediaRecoder';

const stopAndRecordStream = async (props, userId, stream) => {
  console.log('stopAndRecordStream', stream.id);
  const { webRtc } = store.getState();
  const { updateWebRtc } = props;
  if (webRtc.mediaRecording && userId === 1 && stream.id !== webRtc.mediaRecording.stream.id) {
    console.log('stopAndRecordStream inisde', webRtc.mediaRecording.stream.id, stream.id);
    webRtc.mediaRecording.stopRecording();
    const mediaRecording = await mediaRecorder(1, props);
    await updateWebRtc('mediaRecording', mediaRecording);
  }
};

export default props => async (stream, userId) => {
  console.log('remote stream handler', stream, userId);
  const { updateWebRtc } = props;
  await updateWebRtc('streams', { ...store.getState().webRtc.streams, [userId]: stream });
  await updateWebRtc('lastStreamId', userId);
  await updateWebRtc('isLive', true);
  await stopAndRecordStream(props, userId, stream);
};
