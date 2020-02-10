'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateBlog(records) {
  _update2.default.call(this, 'Blog', ...records);
} /* eslint-disable import/no-cycle */


function updateBlogComment(records) {
  _update2.default.call(this, 'BlogComment', ...records);
}

function updateBlogLike(records) {
  _update2.default.call(this, 'BlogLike', ...records);
}

exports.default = [updateBlog, updateBlogComment, updateBlogLike];