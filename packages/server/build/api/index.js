'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBlogDetail = exports.findBoardDetail = exports.initUser = exports.logout = exports.updateUserDetails = undefined;

var _socket = require('../socket');

var _logout = require('./common/logout');

var _logout2 = _interopRequireDefault(_logout);

var _updateUserDetails = require('./common/updateUserDetails');

var _updateUserDetails2 = _interopRequireDefault(_updateUserDetails);

var _initUser = require('./initializers/initUser');

var _initUser2 = _interopRequireDefault(_initUser);

var _findBoradDetail = require('./common/findBoradDetail');

var _findBoradDetail2 = _interopRequireDefault(_findBoradDetail);

var _findBlogDetails = require('./common/findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

var _create = require('./common/create');

var _create2 = _interopRequireDefault(_create);

var _delete = require('./common/delete');

var _delete2 = _interopRequireDefault(_delete);

var _update = require('./common/update');

var _update2 = _interopRequireDefault(_update);

var _get = require('./common/get');

var _get2 = _interopRequireDefault(_get);

var _webRtc = require('./common/web-rtc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mentor = (0, _socket.createScope)('Mentor', () => {}); /* eslint-disable import/no-cycle */


const mentee = (0, _socket.createScope)('Mentee', () => {});
// all create api scoping
_create2.default.forEach(func => mentor(func));
_create2.default.forEach(func => mentee(func));

// all delete api scoping
_delete2.default.forEach(func => mentee(func));
_delete2.default.forEach(func => mentor(func));

// all update api scoping
_update2.default.forEach(func => mentee(func));
_update2.default.forEach(func => mentor(func));

// all get api scoping
_get2.default.forEach(func => mentee(func));
_get2.default.forEach(func => mentor(func));

mentor(_webRtc.createOffer);
mentor(_webRtc.createAnswer);
mentor(_webRtc.addICeCandidate);
mentor(_webRtc.callClose);
mentor(_webRtc.callStatusChange);
mentor(_webRtc.onPcStatusChange);

mentee(_webRtc.createOffer);
mentee(_webRtc.createAnswer);
mentee(_webRtc.addICeCandidate);
mentee(_webRtc.callClose);
mentee(_webRtc.callStatusChange);
mentee(_webRtc.onPcStatusChange);

mentor(_logout2.default);
mentor(_updateUserDetails2.default);

mentee(_logout2.default);
mentee(_updateUserDetails2.default);

exports.updateUserDetails = _updateUserDetails2.default;
exports.logout = _logout2.default;
exports.initUser = _initUser2.default;
exports.findBoardDetail = _findBoradDetail2.default;
exports.findBlogDetail = _findBlogDetails2.default;