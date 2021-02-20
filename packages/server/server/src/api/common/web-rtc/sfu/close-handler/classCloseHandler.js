import updateDatabaseCache from '../../../../../cache/database/update';
// eslint-disable-next-line import/order
import schema from '@probro/common/source/src/schema';
import db from '../../../../../db';
import { liveBoard } from '../../../../../cache';

export default async (callCloseDetail, session) => {
  try {
    const { broadCastId, uid } = callCloseDetail;
  const board = liveBoard.getBoard(broadCastId);
  if (board) {
    if (board.users) {
      liveBoard.setUser(broadCastId, 'users', { ...board.users, [uid]: false });
    }
  }

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
  updateDatabaseCache('BoardMessage', schema.add('BoardMessage', dataTobeUpdate.BoardMessage));
  } catch (e) {
    console.error('Error classCloseHandler', e);
  }
};
