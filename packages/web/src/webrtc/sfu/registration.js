import store from '../../store';
import Janus from './janus';

export default (pluginHandler, pluginType, updateWebRtc, isJoin) => {
  const { webRtc, account, database } = store.getState();
  const allClassIds = Object.values(database.Board.byId).map(b => b.id);
  const userId = account.user.id;
  // console.log('ClassIds', allClassIds);
  try {
    if (pluginHandler && pluginType && updateWebRtc) {
      if (pluginType === 'oneToOneCall') {
        pluginHandler.send({ message: { request: 'register', username: `${userId}` } });
        updateWebRtc('janus', { ...webRtc.janus, [pluginType]: pluginHandler });
      }
      if (pluginType === 'conferenceCall') {
        if (isJoin) {
          const { localCallHistory } = webRtc;
          const roomId = localCallHistory.chatHistory.connectionId;
          const  { joinToken } = database.Board.byId[roomId];
          const register = { request: 'join', room: roomId, ptype: 'publisher', display: `${userId}`, pin: joinToken };
          pluginHandler.send({ message: register });
        }
        updateWebRtc('janus', { ...webRtc.janus, [pluginType]: pluginHandler });
      }
    }
  } catch (e) {
    console.error('Registration Faild!', e);
  }
};
