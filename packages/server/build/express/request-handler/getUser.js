'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findUserDetails = require('../../api/common/findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function getUser(req, res) {
  console.log('getUser request handler', req.query);
  try {
    const { userId } = req.query;
    const result = await (0, _findUserDetails2.default)(userId, true);
    // console.log('getuser result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getUser', e);
    res.status(501);
    res.send(e.message);
  }
};