'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addBlog(record) {
  const res = await _add2.default.call(this, 'Blog', record);
  return res;
} /* eslint-disable import/no-cycle */


async function addBlogComment(record) {
  const res = await _add2.default.call(this, 'BlogComment', record);
  return res;
}

async function addBlogLike(record) {
  const res = await _add2.default.call(this, 'BlogLike', record);
  return res;
}

exports.default = [addBlog, addBlogComment, addBlogLike];