/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import uuid from 'uuid';
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';
 
export default async (id, conferenceCall) => {
  try {
    const { database } = store.getState();
    const joinToken = uuid();
    const boardName = database.Board.byId[id].name;
    const noOfmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === id).length;
    const create = { request: 'create', description: boardName, room: id, publishers: noOfmembers, new_pin: joinToken,bitrate: 512000 };
    const createResult = await new Promise((resolve) => {
      conferenceCall.send({
        message: create,
        success: (result) => {
          resolve({ ...result, joinToken });
        },
        error: (err) => {
          resolve({ error: JSON.stringify(err), error_code: 110 });
        },
      });
    });
    return createResult;
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 114 });
  }
};
