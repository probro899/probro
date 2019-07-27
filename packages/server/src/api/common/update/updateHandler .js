import update from './update';

function updateBoard(records) {
  update.call(this, 'Board', ...records);
}

function updateBoardColumn(records) {
  update.call(this, 'BoardColumn', ...records);
}

function updateBoardColumnCard(records) {
  // const record = records[0];
  // records.shift();
  update.call(this, 'BoardColumnCard', ...records);
}

function updateBoardColumnCardAttachment(records) {
  update.call(this, 'BoardColumnCardAttachment', ...records);
}

function updateBoardColumnCardComment(records) {
  update.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  update.call(this, 'BoardColumnCardDescription', ...records);
}

function updateBlog(records) {
  update.call(this, 'Blog', ...records);
}

function updateBlogComment(records) {
  update.call(this, 'BlogComment', ...records);
}

function updateBlogLike(records) {
  update.call(this, 'BlogLike', ...records);
}


function updateUserWorkExperience(record) {
  update.call(this, 'UserWorkExperience', record);
}

function updateUserEducation(record) {
  update.call(this, 'UserEducation', record);
}

function updateUserSkill(record) {
  update.call(this, 'UserSkill', record);
}

function updateUserPortal(record) {
  update.call(this, 'UserPortal', record);
}


export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
  updateBlog,
  updateBlogComment,
  updateBlogLike,
  updateUserEducation,
  updateUserSkill,
  updateUserWorkExperience,
  updateUserPortal,
];
