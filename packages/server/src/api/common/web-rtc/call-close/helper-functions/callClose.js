/* eslint-disable import/no-cycle */
import updateUserData from './udpateUserData';
import updateUserCache from '../../../updateUserCache';
import updateDatabaseCache from '../../../../../cache/database/update';
// eslint-disable-next-line import/order
import schema from '@probro/common/source/src/schema';
import { liveBoard } from '../../../../../cache';

export default async (session, callCloseDetail) => {
  // console.log('Board close Call', callCloseDetail);

  const channel = session.channel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);

  // update User data to database and cache
  await updateUserData(callCloseDetail, session);

  // gather all the acitve boardUser
  const allLiveSessions = session.getChannel(`Board-${callCloseDetail.broadCastId}`);
  // console.log('AllLive sessions', allLiveSessions);

  // final call end to the live channel
  channel.emit('callEnd', callCloseDetail, null, callCloseDetail.uid);

  // saying all  user to board active false
  if (allLiveSessions) {
    allLiveSessions.forEach(s => updateUserCache({ Board: { id: callCloseDetail.broadCastId, activeStatus: false } }, s, 'update'));
    // unsubscribe the all user from board
    allLiveSessions.forEach(s => s.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`));
  }

  // upate own session to active false
  updateDatabaseCache('Board', schema.update('Board', { id: callCloseDetail.broadCastId, activeStatus: false }));

  // update live cache to empty
  liveBoard.setBoard(callCloseDetail.broadCastId, {});
};
