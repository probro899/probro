'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forgot = require('../../auth/forgot');

var _forgot2 = _interopRequireDefault(_forgot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (req, res) {
  try {
    const { email } = req.query;
    const forgotRes = await (0, _forgot2.default)(email);
    if (forgotRes) {
      res.statusCode = 200;
      res.send({ response: 200, message: 'Check your email address for further information' });
    }
  } catch (e) {
    console.log('error in forgto passs', e);
    res.statusCode = 501;
    res.send(JSON.stringify(e.message));
  }
};