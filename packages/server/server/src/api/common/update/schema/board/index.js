/* eslint-disable import/no-cycle */
import _ from 'lodash';
import update from '../../update';
import db from '../../../../../db';
import addBoardActivity from '../../../addBoardActivity';
import orgClassHandler from './orgClassHandler';

async function updateBoard(records) {
  try {
    const { session } = this;
    if (!_.isArray(records)) {
      const res = await orgClassHandler(this, records);
      return res;
    }
    // console.log('updateBoard func', records, session.values);
    const boardId = records[1].id;
    const record = records[0];
    delete record.todo;
    update.call(this, 'Board', record, records[1]);
    addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateBoard', timeStamp: Date.now() });
  } catch (e) {
    console.error('Error in updateBoard', e);
  }
}
 
function updateBoardColumn(records) {
  try {
    //  console.log('update Board Coulumn called', records);
    const { session } = this;
    const record = records[0];
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const { todo } = record;
    delete record.todo;
    update.call(this, 'BoardColumn', record, records[1]);
    addBoardActivity(this, db, { columnId: records[1].id, userId: session.values.user.id, boardId, message: todo, timeStamp: Date.now() });
  } catch (e) {
    console.error('Error in updateBoardColumn', e);
  }
}

function updateBoardColumnCard(records) {
  try {
    // console.log('update boardCoolumn card', records);
    const { session } = this;
    const broadCastArr = records[0].broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const record = records[0];
    const cardId = records[1].id;
    const { tColId, fColId, todo } = record;
    delete record.todo;
    delete record.tColId;
    delete record.fColId;
    update.call(this, 'BoardColumnCard', record, records[1]);
    addBoardActivity(this, db, { boardId, userId: session.values.user.id, tColId, fColId, message: todo, cardId, timeStamp: Date.now() });
  } catch (e) {
    console.error('Error in updateBoardColumnCard', e)
  }
}

function updateBoardColumnCardAttachment(records) {
  try {
    const { session } = this;
    const broadCastArr = records[0].broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const record = records[0];
    const { cardId, todo } = record;
    delete record.cardId;
    delete record.todo;
    update.call(this, 'BoardColumnCardAttachment', record, records[1]);
    addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateAttachment', attachmentId: records[1].id, cardId, timeStamp: Date.now() });
  } catch (e) {
    console.error('Error in updateBoardColumnCardAttachment', e);
  }
}

function updateBoardColumnCardComment(records) {
  try {
    update.call(this, 'BoardColumnCardComment', ...records);
  } catch (e) {
    console.error('Error in updateBoardColumnCardComment', e);
  }
}

function updateBoardColumnCardDescription(records) {
 
  try {
    const { session } = this;
    const broadCastArr = records[0].broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const record = records[0];
    const { boardColumnCardId } = record;
    update.call(this, 'BoardColumnCardDescription', record, records[1]);
    addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateDescription', descriptionId: records[1].id, cardId: boardColumnCardId, timeStamp: Date.now() });
  } catch (e) {
    console.error('Error in updateBoardColumnCardDescription', e);
  }
}

export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
];
