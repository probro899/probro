'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _get = require('../../cache/database/get');

var _get2 = _interopRequireDefault(_get);

var _flat = require('../flat');

var _flat2 = _interopRequireDefault(_flat);

var _isUserActiveStatus = require('./isUserActiveStatus');

var _isUserActiveStatus2 = _interopRequireDefault(_isUserActiveStatus);

var _activeInformer = require('./activeInformer');

var _activeInformer2 = _interopRequireDefault(_activeInformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = async function initUser(id) {
  const { session } = this;

  let u = null;
  try {
    u = (0, _get2.default)(id, session);
  } catch (err) {
    console.error('error in getUser data from cache', err);
    throw err;
  }

  // setting data in the cache
  session.set('userData', u);

  // subscribe to all Related board
  u.Board.forEach(b => session.subscribe(`Board-${b.id}`));

  // subscribe to all the connection board
  _lodash2.default.uniq((0, _flat2.default)(u.UserConnection.map(obj => [obj.mId, obj.userId]))).forEach(uid => session.subscribe(`UserConnection-${uid}`));

  // subscribe to all related blog for comment and like broadcast
  u.allAssociateBlogsId.forEach(blogId => session.subscribe(`Blog-${blogId}`));

  // gettting all the board and userConnection session for acitve test
  const boardSessions = [];
  u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`) || []));

  // getting all the userConnection channel for current online or active test
  const userSessions = session.getChannel(`UserConnection-${id}`) || [];

  // collecting all the related user to current user
  const finalUserList = (0, _isUserActiveStatus2.default)([...(0, _flat2.default)(boardSessions), ...(0, _flat2.default)(userSessions)], u.User);

  // inform all the user to i am active now
  (0, _activeInformer2.default)(id, u.Board, u.UserConnection, session, true)();

  // adding socket close handler
  session.addCloseListener((0, _activeInformer2.default)(id, u.Board, u.UserConnection, session, false));

  // subscribe to the main board that show all user active astatus
  // NOTE:  *need to analysis either or not it is required or not*
  session.subscribe('Main');

  // Initializing all the data to related user
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
  session.dispatch(_schema2.default.init('NotificationReadStatus', u.NotificationReadStatus));
};