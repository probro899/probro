import store from '../../../../../../store';

export default async (props, state, data) => {
  // console.log('offer on Communication Not Open', props);
  try {
    const { updateWebRtc } = props;

    const { broadCastId, broadCastType, connectionId } = data;
    const type = broadCastType === 'UserConnection' ? 'user' : 'board';
    const { webRtc, database } = store.getState();
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, chatHistory: { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId } });
    await updateWebRtc('chatHistory', { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId });
    await updateWebRtc('showCommunication', broadCastId);
    updateWebRtc('showIncommingCall', true);
    updateWebRtc('currentOffer', data);
    updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);
  } catch (e) {
    console.error('Offer On open Communication Open error', e);
  }
};
