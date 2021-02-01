/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default (pluginHandler, joinToken, room) => {
  // console.log('join room called', pluginHandler, joinToken, room);
  try {
    const { account } = store.getState();
    const userId = account.user.id;
    const register = { request: 'join', room, ptype: 'publisher', display: `${userId}`, pin: joinToken };
    pluginHandler.send({ message: register });
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 112 });
  }
};
