import store from '../../../../../store';

export default (props, state) => async (userId, iceState) => {
  // console.log('iceStatus', iceState);

  try {
    const { account, webRtc } = store.getState();
    const { updateWebRtc } = props;
    if (iceState === 'gathering') {
      // updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { candidates: [] } });
    }

    if (iceState === 'complete') {
      const iceCandidates = webRtc.iceCandidates[userId];
      // console.log(`${userId}) ICE GATHER COMPLETE`, iceCandidates);
      await updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], isGatherComplete: true } });
      if (iceCandidates && !iceCandidates.sendStatus && iceCandidates.doSend) {
        const finalCandidates = iceCandidates.candidates.map(c => JSON.stringify(c.candidate));
        const broadCastType = webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board';
        const broadCastId = webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication;
        const { apis } = state;
        apis.addIceCandidate(
          {
            iceCandidateDetail: {
              iceCandidate: finalCandidates,
              uid: account.user.id,
              broadCastId,
              broadCastType,
            },
            userList: [{ userId }],
          }
        );
        await updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], sendStatus: true } });
      } else {
        await updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { ...webRtc.iceCandidates[userId], isGatherComplete: true, sendStatus: false } });
      }
    }
  } catch (e) {
    console.error('Error in offerHandler', userId);
  }
};
