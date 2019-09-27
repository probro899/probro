'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reset = require('../../auth/reset');

var _reset2 = _interopRequireDefault(_reset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function resetPassword(req, res) {
  try {
    const { token, password } = req.query;
    await (0, _reset2.default)(token, password);
    res.send('Password reset successful');
  } catch (e) {
    console.error('error in reset password', e);
    res.status(501);
    res.send(e.message);
  }
};