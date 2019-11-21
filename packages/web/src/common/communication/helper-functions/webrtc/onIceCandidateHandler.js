import store from '../../../../store';

export default (props, state) => async (e, userId) => {
  console.log('OnIceCandidate local', e, userId);
  const { account, updateWebRtc } = props;
  const { webRtc } = store.getState();
  const { apis } = state;
  try {
    if (e.candidate) {
      const preFetchStatus = webRtc.iceCandidates[userId];
      if (preFetchStatus) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], candidates: webRtc.iceCandidates[userId].candidates ? [...webRtc.iceCandidates[userId].candidates, e] : [e] } });
        if (preFetchStatus.preFetch) {
          // console.log('addRmoteICeCandidatecalled');
          // updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: true, preFetch: true } });
          await apis.addIceCandidate(
            {
              iceCandidateDetail: {
                iceCandidate: JSON.stringify(e.candidate),
                uid: account.user.id,
                broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
                broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
              },
              userList: [{ userId }],
            }
          );
        }
      } else {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], candidates: [e] } });
      }
    }
  } catch (err) {
    console.error('Error in add local iCe candidate', err);
  }
};
