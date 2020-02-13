'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _helperFunctions = require('./helper-functions');

var _flat = require('../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = async function get(id, session) {
  // console.log('id in getUser', id);
  const res = _cache2.default.get(id);
  if (res) {
    return res;
  }

  const userData = await _db2.default.execute(async ({ find, findOne }) => {

    // ******************* User Messages ***************************************************************
    const userMessageDetails = await (0, _helperFunctions.getUserMessgeDetails)(find, id);
    // ************************************************************************************************

    // ******************* User ConnectionList **********************************************************
    const userConnectionListDetails = await (0, _helperFunctions.getUserConnectionListDetails)(find, id);
    // ***************************************************************************************************

    // ******************** all Blog details *************************************************************
    const blogDetails = await (0, _helperFunctions.getBlogDetails)(find, findOne, id);
    // ***************************************************************************************************

    // ********************* getting all Board Details ***************************************************
    const boardDetails = await (0, _helperFunctions.getAllBoardDetails)(find, findOne, id, session);
    // *****************************************************************************************************

    // ************ getting notification details ***********************************************************
    const userNotifications = await (0, _helperFunctions.getNotificationDetails)(find, id, boardDetails);
    // *****************************************************************************************************

    // **********************************getting all UserDetails ******************************************
    const userDetails = await (0, _helperFunctions.getUserDetails)(find, findOne, id, userConnectionListDetails, blogDetails, boardDetails);
    // ***************************************************************************************************

    const userDataRes = {
      User: userDetails.allUser,
      UserDetail: userDetails.allUserDetailsList,
      UserEducation: userDetails.UserEducation,
      UserWorkExperience: userDetails.UserWorkExperience,
      UserPortal: userDetails.UserPortal,
      UserSkill: userDetails.UserSkill,
      UserCarrierInterest: userDetails.UserCarrierInterest,

      Board: boardDetails.allBoards,
      BoardMember: (0, _flat2.default)(boardDetails.allBoardMembers),
      BoardColumn: boardDetails.BoardColumn,
      BoardColumnCard: boardDetails.BoardColumnCard,
      BoardColumnCardAttachment: boardDetails.BoardColumnCardAttachment,
      BoardColumnCardComment: boardDetails.BoardColumnCardComment,
      BoardColumnCardDescription: boardDetails.BoardColumnCardDescription,
      BoardColumnCardTag: boardDetails.BoardColumnCardTag,
      BoardMessage: (0, _flat2.default)(boardDetails.BoardMessage),
      BoardMessageSeenStatus: (0, _flat2.default)(boardDetails.BoardMessageSeenStatus),

      Blog: [...blogDetails.allBlogs, ...blogDetails.newBlogPublish],
      BlogComment: blogDetails.BlogComment,
      BlogLike: blogDetails.BlogLike,
      Notification: userNotifications.Notification,
      NotificationReadStatus: userNotifications.notificationReadstatus,

      UserConnection: userConnectionListDetails.connectionList,
      UserMessage: userMessageDetails.userMessages,
      UserMessageSeenStatus: (0, _flat2.default)(userMessageDetails.userMessageSeenStatus),
      allAssociateBlogsId: blogDetails.allAssociateBlogsId

    };
    return userDataRes;
  });
  _cache2.default.set(id, userData);
  return userData;
};