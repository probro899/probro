'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _helperFunctions = require('./helper-functions');

var _flat = require('../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
function get(id, session) {
  // console.log('id in getUser', id);

  // ******************* User Messages ***************************************************************
  const userMessageDetails = (0, _helperFunctions.getUserMessgeDetails)(id);
  // console.log('user Message Details', userMessageDetails);
  // ************************************************************************************************

  // ******************* User ConnectionList **********************************************************
  const userConnectionListDetails = (0, _helperFunctions.getUserConnectionListDetails)(id);
  // console.log('userConnectionListDetails', userConnectionListDetails);
  // // ***************************************************************************************************

  // // ******************** all Blog details *************************************************************
  const blogDetails = (0, _helperFunctions.getBlogDetails)(id);
  // console.log('blogDetails', blogDetails);
  // // ***************************************************************************************************

  // // ********************* getting all Board Details ***************************************************
  const boardDetails = (0, _helperFunctions.getAllBoardDetails)(id, session);
  // console.log('allBoard Details', boardDetails);
  // // *****************************************************************************************************

  // // ************ getting notification details ***********************************************************
  const userNotifications = (0, _helperFunctions.getNotificationDetails)(id, boardDetails);
  // console.log('User notifications', userNotifications);
  // // *****************************************************************************************************

  // // **********************************getting all UserDetails ******************************************
  const userDetails = (0, _helperFunctions.getUserDetails)(id, userConnectionListDetails, blogDetails, boardDetails);
  // console.log('User details', userDetails);
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
  // users.set(id, userData);
  return userDataRes;
}