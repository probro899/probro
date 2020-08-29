'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delete = require('../../delete');

var _delete2 = _interopRequireDefault(_delete);

var _deleteBlogAll = require('../helper-functions/blog/deleteBlogAll');

var _deleteBlogAll2 = _interopRequireDefault(_deleteBlogAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-cycle
function deleteBlog(record) {
  const dbDelete = _delete2.default.bind(this);
  (0, _deleteBlogAll2.default)(dbDelete, record);
}

function deleteBlogComment(record) {
  _delete2.default.call(this, 'BlogComment', record);
}

function deleteBlogLike(record) {
  _delete2.default.call(this, 'BlogLike', record);
}

exports.default = [deleteBlog, deleteBlogComment, deleteBlogLike];