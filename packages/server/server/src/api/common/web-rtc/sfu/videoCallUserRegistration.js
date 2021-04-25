/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import cacheDatabase from '../../../../cache/database/cache';
import { database } from '../../../../cache';
import updateUserCache from '../../updateUserCache';

export default function videoCallUserRegistration(details) {
  try {
    const { session } = this;
    const { callId, userId } = details;
    
    // update User Cache database for callId
    database.update('User', schema.update('User', { id: userId, callId }));
    
    // getting connetion list tobe updated
    const allUserConnections = cacheDatabase.get('UserConnection');
    const connectionListMid = allUserConnections.filter(uc => (uc.mId === userId));
    const connectionListUserId = allUserConnections.filter(uc => (uc.userId === userId));
    const connectionListIds = [...connectionListMid, ...connectionListUserId];
    
    // getting all sessions
    let allLiveSessions = session.getChannel(`UserConnection-${userId}`);
    if (allLiveSessions) {
      allLiveSessions = allLiveSessions.filter(s => s.values.user.id !== userId);
       // update active user connetions
    allLiveSessions.forEach((s) => {
      const userConnection = connectionListIds.find(obj => obj.userId === s.values.user.id || obj.mId === s.values.user.id);
      updateUserCache({ UserConnection: { ...userConnection, callId } }, s, 'update');
    });
    }
  } catch (e) {
    console.error('Error in user callId registration', e);
  }
}
