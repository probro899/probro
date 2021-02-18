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
    const edit = { request: 'edit', description: boardName, room: id, publishers: noOfmembers, new_pin: joinToken, bitrate: 512000 };
    const editResult = await new Promise((resolve) => {
      conferenceCall.send({
        message: edit,
        success: (result) => {
          resolve({ ...result, joinToken });
        },
        error: (err) => {
          resolve({ error: JSON.stringify(err), errorCode: 109 });
        },
      });
    });
    return editResult;
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 113 });
  }
};
