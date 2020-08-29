import updateUserCache from '../../../../updateUserCache';
import updateDatabaseCache from '../../../../../../cache/database/update';
// eslint-disable-next-line import/order
import schema from '@probro/common/source/src/schema';
import db from '../../../../../../db';

export default async (callCloseDetail, session) => {
 const resId = await db.execute(async ({ insert }) => {
    const insertRes = await insert('BoardMessage', {
      userId: callCloseDetail.uid,
      boardId: callCloseDetail.broadCastId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
      message: callCloseDetail.callType || '',
    });
    return insertRes;
  });

  const dataTobeUpdate = {
    BoardMessage: {
      id: resId,
      userId: callCloseDetail.uid,
      boardId: callCloseDetail.broadCastId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
      message: callCloseDetail.callType,
    },
  };
  updateUserCache(dataTobeUpdate, session, 'add');
  updateDatabaseCache('BoardMessage', schema.add('BoardMessage', dataTobeUpdate.BoardMessage));
};
