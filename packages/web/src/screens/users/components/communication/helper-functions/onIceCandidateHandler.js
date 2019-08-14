import store from '../../../../../store';

export default (props, state) => async (e, userId) => {
  const { account, updateWebRtc } = props;
  const { webRtc } = store.getState();
  const { apis } = state;
  try {
    if (e.candidate) {
      const preFetchStatus = webRtc.iceCandidates[userId];
      if (!preFetchStatus) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: false, preFetch: false } });
      } else if (preFetchStatus.preFetch) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: true, preFetch: false } });
        await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId }] });
      }
    }
  } catch (err) {
    console.error('Error in add local iCe candidate', err);
  }
};
