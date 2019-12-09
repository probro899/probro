'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userRegistration = require('../../auth/userRegistration');

var _userRegistration2 = _interopRequireDefault(_userRegistration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (req, res) => {
  try {
    const resFinal = await (0, _userRegistration2.default)(req.body);
    // console.log('final response', resFinal);
    if (resFinal) {
      res.status(200);
      res.send(JSON.stringify(resFinal));
    }
  } catch (e) {
    if (e.message === 'Emailisalreadytaken') {
      res.status(201);
      res.send('Email is already taken');
    }
    console.log('error in request handler', e.message);
    res.status(501).send({ status: 501, message: e.message });
  }
};