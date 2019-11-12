/* eslint-disable import/no-cycle */
import Delete from '../../delete';
import deleteBoardHelper from '../helper-functions/board/deleteBoard';
import deleteBoardColumnHelper from '../helper-functions/board/deleteColumn';
import deleteBoardColumnCardHelper from '../helper-functions/board/deleteBoardColumnCard';

function deleteBoard(record) {
  // console.log('delete board handler', record);
  const dbDelete = Delete.bind(this);
  deleteBoardHelper(dbDelete, record);
}

function deleteBoardColumn(record) {
  // console.log('record in deleteBoardColumn', record);
  const dbColDelete = Delete.bind(this);
  deleteBoardColumnHelper(dbColDelete, record);
}

function deleteBoardColumnCard(record) {
  deleteBoardColumnCardHelper(Delete.bind(this), [record]);
}

function deleteBoardColumnCardAttachment(record) {
  Delete.call(this, 'BoardColumnCardAttachment', record);
}

function deleteBoardColumnCardComment(record) {
  Delete.call(this, 'BoardColumnCardComment', record);
}

function deleteBordColumnDescription(record) {
  Delete.call(this, 'BoardColumnCardDescription', record);
}

function deleteBoardColumnCardTag(record) {
  Delete.call(this, 'BoardColumnCardTag', record);
}

export default [
  deleteBoard,
  deleteBoardColumn,
  deleteBoardColumnCard,
  deleteBoardColumnCardAttachment,
  deleteBoardColumnCardComment,
  deleteBordColumnDescription,
  deleteBoardColumnCardTag,
];
