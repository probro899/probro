import schema from '@probro/common/source/src/schema';
/* eslint-disable import/no-cycle */
import updateUserCache from '../../updateUserCache';
import { database } from '../../../../cache';

export default function closeSfuCall(data) {
  try {
    const { session } = this;
    const { id } = data;
    const allLiveSessions = session.getChannel(`Board-${id}`);
    allLiveSessions.forEach(s => updateUserCache({ Board: { ...data } }, s, 'update'));
    // udpate active status true in cache database
    database.update('Board', schema.update('Board', { ...data }));
  } catch (e) {
    console.error('Error in Sfu close call', e);
  }
}
