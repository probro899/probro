/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';
import { liveBoard } from '../../../../../cache';
import db from '../../../../../db';
import updateDatabaseCache from '../../../../../cache/database/update';
import updateUserCache from '../../../updateUserCache';

export default async function classCallEndHandler(callCloseDetail) {
  try {
    const { session } = this;
    const { id } = callCloseDetail;
    const boardDetails = liveBoard.getBoard(id);
    liveBoard.setBoard(id, { ...boardDetails, chatHistoryDone: true });
    if (!boardDetails.chatHistoryDone) {
      const resId = await db.execute(async ({ insert }) => {
        const insertRes = await insert('BoardMessage', {
          userId: 0,
          boardId: id,
          timeStamp: Date.now(),
          type: 'CallEnd',
          duration: Date.now() - boardDetails.startTime,
          message: 'CallEnd',
        });
        return insertRes;
      });
      const dataTobeUpdate = {
        BoardMessage: {
          id: resId,
          userId: 0,
          boardId: id,
          timeStamp: Date.now(),
          type: 'CallEnd',
          duration: Date.now() - boardDetails.startTime,
          message: 'CallEnd',
        },
      };
      const allLiveSessions = session.getChannel(`Board-${id}`);
      allLiveSessions.forEach(s => updateUserCache({ BoardMessage: dataTobeUpdate.BoardMessage }, s, 'add'));
      updateDatabaseCache('BoardMessage', schema.add('BoardMessage', dataTobeUpdate.BoardMessage));
    }
  } catch (e) {
    console.log('classCallEndException', e);
  }
}
