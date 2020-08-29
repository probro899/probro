'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transporter = _nodemailer2.default.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: _config.mailerUserName,
    pass: _config.mailerPassword
  }
});

exports.default = async info => {
  const mailRes = await transporter.sendMail(info);
  return mailRes;
};