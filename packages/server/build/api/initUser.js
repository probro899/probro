'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _cache = require('../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flat = arr => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

function userPresentorHelper(boards, userList) {
  // console.log('Boards and userlist', boards, userList);
  const finalUserList = userList.map(u => {
    for (let i = 0; i < boards.length; i += 1) {
      if (boards[i].values.user.id === u.id) {
        return _extends({}, u, { activeStatus: true });
      }
    }
    return _extends({}, u, { activeStatus: false });
  });
  return finalUserList;
}

exports.default = async function initUser(id) {
  const { session } = this;

  let u = null;
  try {
    u = await _cache.user.get(id);
  } catch (err) {
    console.error('error in getUser data from cache', err);
    throw err;
  }

  // setting data in the cache
  session.set('userData', u);
  // subscribe to all Related board
  u.Board.forEach(b => session.subscribe(`Board-${b.id}`));
  _lodash2.default.uniq(flat(u.UserConnection.map(obj => [obj.mId, obj.userId]))).forEach(uid => session.subscribe(`UserConnection-${uid}`));

  u.allAssociateBlogsId.forEach(blogId => session.subscribe(`Blog-${blogId}`));

  const boardSessions = [];
  u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`) || []));
  // console.log('Sessiosn user Details', boardSessions.flat()[0].values.user);
  const userSessions = session.getChannel(`UserConnection-${id}`) || [];
  // console.log('UserSessions', userSessions);
  const finalUserList = userPresentorHelper([...flat(boardSessions), ...flat(userSessions)], u.User);
  // console.log('finalUSerlist', finalUserList);
  // boardSessions.forEach(s => console.log(JSON.stringify(s.id)));

  u.Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(_schema2.default.update('User', { id, activeStatus: true })));
  _lodash2.default.uniq(flat(u.UserConnection.map(obj => [obj.mId, obj.userId]))).map(uid => ({ channel: session.channel(`UserConnection-${uid}`) })).forEach(obj => obj.channel.dispatch(_schema2.default.update('User', { id, activeStatus: true })));
  // console.log('userDetaisl in initUser', u.User);
  // console.log('userConnection', u.BoardMessageSeenStatus);
  session.subscribe('Main');
  // console.log('board member', u.BoardMember);
  session.dispatch(_schema2.default.init('User', finalUserList));
  session.dispatch(_schema2.default.init('UserDetail', u.UserDetail));
  session.dispatch(_schema2.default.init('Board', u.Board));
  session.dispatch(_schema2.default.init('BoardColumn', u.BoardColumn));
  session.dispatch(_schema2.default.init('BoardColumnCard', u.BoardColumnCard));
  session.dispatch(_schema2.default.init('BoardColumnCardAttachment', u.BoardColumnCardAttachment));
  session.dispatch(_schema2.default.init('BoardColumnCardComment', u.BoardColumnCardComment));
  session.dispatch(_schema2.default.init('BoardColumnCardDescription', u.BoardColumnCardDescription));
  session.dispatch(_schema2.default.init('BoardColumnCardTag', u.BoardColumnCardTag));
  session.dispatch(_schema2.default.init('Blog', u.Blog));
  // session.dispatch(schema.init('BlogDetail', u.BlogDetail));
  session.dispatch(_schema2.default.init('BlogComment', u.BlogComment));
  session.dispatch(_schema2.default.init('BlogLike', u.BlogLike));
  session.dispatch(_schema2.default.init('BoardMember', u.BoardMember));
  session.dispatch(_schema2.default.init('UserEducation', u.UserEducation));
  session.dispatch(_schema2.default.init('UserWorkExperience', u.UserWorkExperience));
  session.dispatch(_schema2.default.init('UserPortal', u.UserPortal));
  session.dispatch(_schema2.default.init('UserSkill', u.UserSkill));
  session.dispatch(_schema2.default.init('UserCarrierInterest', u.UserCarrierInterest));
  session.dispatch(_schema2.default.init('BoardMessage', u.BoardMessage));
  session.dispatch(_schema2.default.init('BoardMessageSeenStatus', u.BoardMessageSeenStatus));
  session.dispatch(_schema2.default.init('UserConnection', u.UserConnection));
  session.dispatch(_schema2.default.init('UserMessage', u.UserMessage));
  session.dispatch(_schema2.default.init('UserMessageSeenStatus', u.UserMessageSeenStatus));
  session.dispatch(_schema2.default.init('Notification', u.Notification));
};