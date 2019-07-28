import Delete from './delete';
import deleteBoardHelper from './helper-functions/board/deleteBoard';
import deleteBoardColumnHelper from './helper-functions/board/deleteColumn';
import deleteBoardColumnCardHelper from './helper-functions/board/deleteBoardColumnCard';
import deleteBlogHelper from './helper-functions/blog/deleteBlogAll';

function deleteBoard(record) {
  // console.log('delete board handler', record);
  const dbDelete = Delete.bind(this);
  deleteBoardHelper(dbDelete, record);
}

function deleteBoardColumn(record) {
  deleteBoardColumnHelper.call(Delete.bind(this), record);
}

function deleteBoardColumnCard(record) {
  deleteBoardColumnCardHelper.call(Delete.bind(this), [record]);
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

function deleteBlog(record) {
  const dbDelete = Delete.bind(this);
  deleteBlogHelper(dbDelete, record);
}

function deleteBlogComment(record) {
  Delete.call(this, 'BlogComment', record);
}

function deleteBlogLike(record) {
  Delete.call(this, 'BlogLike', record);
}


function deleteUserWorkExperience(record) {
  Delete.call(this, 'UserWorkExperience', record);
}

function deleteUserEducation(record) {
  Delete.call(this, 'UserEducation', record);
}

function deleteUserSkill(record) {
  Delete.call(this, 'UserSkill', record);
}

function deleteUserPortal(record) {
  Delete.call(this, 'UserPortal', record);
}

export default [
  deleteBoard,
  deleteBoardColumn,
  deleteBoardColumnCard,
  deleteBoardColumnCardAttachment,
  deleteBoardColumnCardComment,
  deleteBordColumnDescription,
  deleteBlog,
  deleteBlogComment,
  deleteBlogLike,
  deleteUserEducation,
  deleteUserPortal,
  deleteUserWorkExperience,
  deleteUserSkill,
];
