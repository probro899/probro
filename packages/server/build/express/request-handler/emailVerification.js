'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emailVerification = require('../../auth/emailVerification');

var _emailVerification2 = _interopRequireDefault(_emailVerification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (req, res) => {
  console.log('email verification handler', req.query);
  try {
    const emaiVerificationEmail = await (0, _emailVerification2.default)(req.query.token);
    if (emaiVerificationEmail) {
      res.statusCode = 200;
      res.send(emaiVerificationEmail);
    }
  } catch (e) {
    console.log('email verification error', e);
    res.statusCode = 501;
    res.send(JSON.stringify(e.message));
  }
};