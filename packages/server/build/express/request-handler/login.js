'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('../../auth/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (req, res) => {
  try {
    const record = req.body;
    const status = await (0, _login2.default)(record);
    if (status) {
      res.status(200);
      res.send(JSON.stringify(status));
    }
  } catch (error) {
    console.log('error in login', error);
    res.status(201);
    res.send(JSON.stringify(error.message));
  }
};