'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../update');

var _update2 = _interopRequireDefault(_update);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _mailer = require('../../../../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _findBlogDetails = require('../../../findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
function updateUserWorkExperience(record) {
  _update2.default.call(this, 'UserWorkExperience', ...record);
}

function updateUserEducation(record) {
  _update2.default.call(this, 'UserEducation', ...record);
}

function updateUserSkill(record) {
  _update2.default.call(this, 'UserSkill', ...record);
}

function updateUserPortal(record) {
  _update2.default.call(this, 'UserPortal', ...record);
}

function updateUserMessage(record) {
  _update2.default.call(this, 'UserMessage', ...record);
}

async function updateUserConnection(record) {
  const { session } = this;
  const { status, mId, userId } = record[0];
  const { id } = record[1];
  const updateRes = await _update2.default.call(this, 'UserConnection', ...record);
  // console.log('update User connection called', updateRes, status, mId, userId);
  if (status === 'connected' && updateRes) {
    // console.log('inside of send notification', status, mId, userId);
    const bothUserDetails = await _db2.default.execute(async ({ findOne, insert }) => {
      const fUserDetails = await findOne('User', { id: userId });
      const tUserDetails = await findOne('User', { id: mId });
      const htmlStringValue = await (0, _mailBody2.default)();

      (0, _mailer2.default)({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${fUserDetails.email}>`,
        subject: `${tUserDetails.firstName} accept your friend request`,
        text: 'No reply',
        html: htmlStringValue.friendRequestAcceptHtmlString(fUserDetails, tUserDetails)
      });

      const notiData = {
        userId: fUserDetails.id,
        timeStamp: Date.now(),
        body: `${tUserDetails.firstName} accept your friend request`,
        title: 'Friend request',
        type: 'user',
        viewStatus: false,
        imageUrl: null
      };

      const notiId = await insert('Notification', notiData);
      const notiDetails = await findOne('Notification', { id: notiId });
      const mainchannel = session.getChannel(`UserConnection-${mId}`);
      const remoteUserSession = mainchannel.find(s => s.values.user.id === fUserDetails.id);
      // console.log('remote User session', remoteUserSession);
      if (remoteUserSession) {
        const dataToBeUpdateNoti = {
          Notification: notiDetails
        };
        (0, _updateUserCache2.default)(dataToBeUpdateNoti, remoteUserSession, 'add');
        const dataTobeUpdateConnection = {
          UserConnection: { id, status }
        };
        (0, _updateUserCache2.default)(dataTobeUpdateConnection, remoteUserSession, 'update');
      }
      session.subscribe(`UserConnection-${fUserDetails.id}`);
      session.subscribe(`UserConnection-${tUserDetails.id}`);

      return updateRes;
    });
  }
}

function updateUserCarrierInterest(record) {
  _update2.default.call(this, 'UserCarrierInterest', record);
}

exports.default = [updateUserEducation, updateUserWorkExperience, updateUserSkill, updateUserPortal, updateUserConnection, updateUserCarrierInterest, updateUserMessage];