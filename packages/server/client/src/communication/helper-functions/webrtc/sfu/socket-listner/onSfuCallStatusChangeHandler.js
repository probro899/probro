import store from '../../../../../store';
import exceptionHandler from '../conference-call-provider/exceptionHandler';

export default (props, state, data) => {
  console.log('update sfu call status called', data);
  try {
    const { uid, type } = data;
    const { updateWebRtc } = props;
    const { webRtc } = store.getState();
    const hasUser = webRtc.connectedUsers[uid];
    if (hasUser) {
      updateWebRtc('connectedUsers', {
        ...webRtc.connectedUsers,
        [uid]: {
          ...webRtc.connectedUsers[uid],
          status: type,
          streams: webRtc.connectedUsers[uid].streams || [],
        },
      });
    } else {
      updateWebRtc('connectedUsers', {
        ...webRtc.connectedUsers,
        [uid]: {
          status: type,
          streams: [],
        },
      });
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 129 });
  }
};
