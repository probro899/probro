'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = require('../../api/common/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function doSearch(req, res) {
  // console.log('search request handler', req.query);
  try {
    const { keyword } = req.query;
    const result = await (0, _search2.default)(keyword);
    // console.log('search result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in search', e);
    res.status(501);
    res.send(e.message);
  }
};