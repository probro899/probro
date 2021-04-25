import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { database } from '../../../cache';
import addUserInRecordHelper from './addUserInRecordHelper';

export default async function add(table, record) {
  // console.log('add api called', table, record);
  try {
    const { session } = this;
  const { broadCastId, broadCastUserList } = record;
  delete record.broadCastId;
  delete record.broadCastUserList;
  const res = await db.execute(async ({ insert, findOne }) => {
    let recordId = null;
    let recordDetail = null;
    if (Array.isArray(record)) {
      const promises = record.map(obj => insert(table, obj));
      const skillIds = await Promise.all(promises);
      const findOneAllRes = skillIds.map(id => findOne(table, { id }));
      recordDetail = await Promise.all(findOneAllRes);
    } else {
      recordId = await insert(table, record);
      recordDetail = await findOne(table, { id: recordId });
    }
    if (recordDetail) {
      const recordWithUser = addUserInRecordHelper(table,recordDetail);
      if (broadCastId) {
        if (broadCastUserList) {
          const channel = session.channel(broadCastId);
          const allChannelSession = session.getChannel(broadCastId);
          const allUserSession = [];
          broadCastUserList.forEach(userIdObj => allUserSession.push(allChannelSession.find(s => s.values.user.id === userIdObj.userId)));
          channel.dispatch(schema.add(table, recordWithUser), broadCastUserList);
          database.update(table, schema.add(table, recordDetail));
        } else {
          const channel = session.channel(broadCastId);
          channel.dispatch(schema.add(table, recordWithUser), null, session.values.user.id);
          database.update(table, schema.add(table, recordDetail));
        }
      } else {
        await database.update(table, schema.add(table, recordDetail));
      }
    }
    return recordId;
  });
  return res;
  } catch (e) {
    console.error('Error in main add', e)
  }
}
