import store from '../../../store';

export default (props, state) => async (e, userId) => {
  console.log('OnIceCandidate local', e);
  const { account, updateWebRtc } = props;
  const { webRtc } = store.getState();
  const { apis } = state;
  try {
    if (e.candidate) {
      const preFetchStatus = webRtc.iceCandidates[userId];
      if (preFetchStatus) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { candidates: [...webRtc.iceCandidates[userId].candidates, e], sendStatus: false, preFetch: false } });
        if (preFetchStatus.preFetch) {
          // console.log('addRmoteICeCandidatecalled');
          updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: true, preFetch: false } });
          await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId }] });
        }
      } else {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { candidates: [e], sendStatus: false, preFetch: false } });
      }
    }
  } catch (err) {
    console.error('Error in add local iCe candidate', err);
  }
};
