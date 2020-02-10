'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addBlog(record) {
  const arrOfTitleWord = `${record.title}`.split(' ');
  console.log('Array of Title', arrOfTitleWord);
  const arrOfTitleWordLowerCase = arrOfTitleWord.map(w => w.toLowerCase());
  console.log('arrof title word lower case', arrOfTitleWordLowerCase);
  const slugWord = arrOfTitleWordLowerCase.reduce((slug, w) => {
    slug = `${slug}-${w}`;
    return slug;
  }, '');
  const tempSlug = slugWord.slice(1);
  const slug = `${tempSlug}-${Date.now()}`;
  const res = await _add2.default.call(this, 'Blog', _extends({}, record, { slug }));
  return res;
}

async function addBlogComment(record) {
  const res = await _add2.default.call(this, 'BlogComment', record);
  return res;
}

async function addBlogLike(record) {
  const res = await _add2.default.call(this, 'BlogLike', record);
  return res;
}

exports.default = [addBlog, addBlogComment, addBlogLike];