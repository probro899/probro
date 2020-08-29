'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getArchive = require('../../api/common/search/getArchive');

var _getArchive2 = _interopRequireDefault(_getArchive);

var _cache = require('../../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = _cache2.default.users.get(userId);
    const result = await (0, _getArchive2.default)(user ? user.slug : null);
    res.status = 200;
    res.send(JSON.stringify(result));
  } catch (e) {
    console.log('archive error', e);
    res.status = 501;
    res.send(JSON.stringify(e));
  }
};