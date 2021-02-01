import store from '../../../../../store';

export default (props, callId) => {
  try {
    const { webRtc, account } = store.getState();
    const { apis } = webRtc;
    apis.videoCallUserRegistration({ callId, userId: account.user.id });
  } catch (e) {
    console.error('Error in registration informer', userName);
  }
}