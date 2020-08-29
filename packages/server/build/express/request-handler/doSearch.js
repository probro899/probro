'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../api/common/search/index');

var _getPopular = require('../../api/common/search/getPopular');

var _getPopular2 = _interopRequireDefault(_getPopular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function doSearch(req, res) {
  console.log('search request handler', req.query);
  try {
    const { key, country, industry } = req.query;
    let result;
    if (!key && !country && !industry) {
      result = await (0, _getPopular2.default)();
    } else {
      result = await (0, _index.globalSearch)(key, country, industry);
    }
    // console.log('search result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in search', e);
    res.status(501);
    res.send(e.message);
  }
};