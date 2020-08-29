'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

var _htmlStringFormater = require('./htmlStringFormater');

var _htmlStringFormater2 = _interopRequireDefault(_htmlStringFormater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (reportData, session) => {
  // console.log('main pdf generator called', reportData, session.values.user, __dirname);

  try {
    const options = {
      format: 'Letter'
    };
    const reportName = `${reportData.boardDetail.name}-${Date.now()}.pdf`;
    const filePath = _path2.default.join(__dirname, '..', 'public', 'user', `${10000000 + parseInt(session.values.user.id, 10)}`, 'report', reportName);
    let finalPdfRes = null;

    const result = await new Promise((resolve, reject) => {
      _htmlPdf2.default.create((0, _htmlStringFormater2.default)(reportData, session), options).toFile(filePath, (err, res) => {
        if (err) {
          console.log('Error in pdf generator', err);
          reject();
          return;
        }
        if (res) {
          console.log('response of pdf', res);
          resolve(reportName);
        }
      });
    });
    console.log('final pdf res', result);
    return reportName;
  } catch (e) {
    console.log('Error in generating pdf', e);
    return false;
  }
};