import schema from '@probro/common/source/src/schema';
/* eslint-disable import/no-cycle */
import updateUserCache from '../../updateUserCache';
import { database, liveBoard } from '../../../../cache';
import heartbitChecker from './sfuHeartbeater';

export default async function initSfuCall(data) {
  try {
    const { session } = this;
    const { id, activeStatus, isCallUpgraded } = data;
    const allLiveSessions = session.getChannel(`Board-${id}`);
    const channel = session.channel(`Board-${id}`);

    // update all class user liveStatus
    allLiveSessions.forEach(s => updateUserCache({ Board: { ...data } }, s, 'update'));

    // udpate active status true in cache database
    database.update('Board', schema.update('Board', { ...data }));

    if (!isCallUpgraded) {
      if (!liveBoard.getBoard(id)) {
        liveBoard.setBoard(id, { users: { [activeStatus]: true }, heartbitChecker: setInterval(() => heartbitChecker(session, id), 60000) });
      }
      channel.emit('sfuInit', { boardId: id, userId: activeStatus });
    }
  } catch (e) {
    console.error('Error in Sfu call', e);
  }
}
