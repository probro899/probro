'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findBlogDetails = require('../../api/common/findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function getBlog(req, res) {
  // console.log('getBlog request handler', req.query);
  try {
    const { userId, blogId, uid } = req.query;
    let result;
    if (uid === 'undefined') {
      result = await (0, _findBlogDetails2.default)(blogId, userId, true);
    } else {
      result = await (0, _findBlogDetails2.default)(blogId, userId, true, parseInt(uid, 10));
    }
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getBlog', e);
    res.status(501);
    res.send(e.message);
  }
};