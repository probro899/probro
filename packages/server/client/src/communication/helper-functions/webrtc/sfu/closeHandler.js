/* eslint-disable import/no-cycle */
/* eslint-disable no-lonely-if */
import store from '../../../../store';
import oneToOneCallCloseHandler from './video-call-provider/closeHandler';
import conferenceCloseHandler from './conference-call-provider/closeHandler';
import resetCommunication from './resetCommunication';
import execeptionHandler from './conference-call-provider/exceptionHandler';

export default props => async (closeType) => {
  try {
    const { webRtc } = store.getState();
    const { updateWebRtc } = props;

    // store current chathistory to local chathistory
    await updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);

    // detach and close local using media
    if (webRtc.localCallHistory.stream) {
      if (webRtc.localCallHistory.stream.active) {
        const allTracks = webRtc.localCallHistory.stream.getTracks();
        allTracks.forEach(track => track.stop());
      }
    }

    // handle one to one closing
    if (webRtc.localCallHistory.chatHistory.type === 'user') {
      await oneToOneCallCloseHandler(props, closeType);
    }

    // handle conference closing
    if (webRtc.localCallHistory.chatHistory.type === 'board') {
      await conferenceCloseHandler(props);
    }

    // Reset Store
    await resetCommunication(updateWebRtc);

  } catch (e) {
    execeptionHandler({ error: JSON.stringify(e), errorCode: 123 });
  }
};
