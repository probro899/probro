import store from '../../../../store';

export default (props, state) => async (e, userId) => {
  // console.log(`${userId}) LOCAL ICECANDIDATE`, e);
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  try {
    if (e.candidate) {
      const preFetchStatus = webRtc.iceCandidates[userId];
      if (preFetchStatus) {
        updateWebRtc('iceCandidates',
          {
            ...webRtc.iceCandidates,
            [userId]: {
              ...webRtc.iceCandidates[userId],
              candidates: webRtc.iceCandidates[userId].candidates ? [...webRtc.iceCandidates[userId].candidates, e] : [e],
            },
          });
      } else {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], candidates: [e] } });
      }
    }
  } catch (err) {
    console.error('Error in add local iCe candidate', err);
  }
};
