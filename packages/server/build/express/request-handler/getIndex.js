'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIndex = require('../../api/common/getIndex');

var _getIndex2 = _interopRequireDefault(_getIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function getIndex(req, res) {
  console.log('getIndex request handler', req.query);
  try {
    const result = await (0, _getIndex2.default)();
    console.log('getIndex result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getIndex', e);
    res.status(501);
    res.send(e.message);
  }
};