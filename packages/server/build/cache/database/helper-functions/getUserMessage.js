'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = id => {
  const allUserMessages = _cache2.default.get('UserMessage');
  const tuserMessage = allUserMessages.filter(um => um.tuserId === id);
  const fuserMessage = allUserMessages.filter(um => um.fuserId === id);
  const userMessages = [...fuserMessage, ...tuserMessage];
  // console.log('all User messge', userMessages);
  const userMessageSeenStatus = userMessages.map(um => _cache2.default.get('UserMessageSeenStatus').filter(ums => ums.umId === um.id));
  // console.log('getUser message res', userMessages, userMessageSeenStatus);
  return { userMessages, userMessageSeenStatus };
};