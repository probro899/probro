/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import _ from 'lodash';
import userPresentorHelper from './isUserActiveStatus';
import activeInformer from './activeInformer';
import findUserDetails from '../common/findUserDetails';
import getChannelIds from '../common/getChannelIds';
import { getNotifications } from '../common/get/notification/index';
import flat from '../flat';

export default async function initUser(id) {
  const { session } = this;
  // console.time('UserDataFetch');
  let u = null;
  let channelData = null;
  try {
    u = findUserDetails(id, true);

    // subscribe to the main board that show all user active astatus
    // // NOTE:  *need to analysis either or not it is required or not*
    session.subscribe('Main');

    // Initializing all the data to related user
    session.dispatch(schema.init('User', [u.user]));
    session.dispatch(schema.init('UserDetail', [u.userDetail]));
    session.dispatch({ type: 'LOGIN', payload: { ...u.user, userDetails: u.userDetail } });
    session.dispatch(schema.init('UserEducation', u.userEducation));
    session.dispatch(schema.init('UserWorkExperience', u.userWorkExperience));
    session.dispatch(schema.init('UserPortal', u.userPortal));
    session.dispatch(schema.init('UserSkill', u.userSkill));
    session.dispatch(schema.init('UserCarrierInterest', u.userCarrierInterest));

    // subscribing in related channel and send the data that is collected
    channelData = await getChannelIds(id);
    const {
      allBoard,
      allBlogs,
      connectionList,
      allBoardColumns,
      allBoardMembers,
      allOrganization,
      allOrganizationMembers,
    } = channelData;

    // subscribe to all Related board
    allBoard.forEach(bg => session.subscribe(`Board-${bg.id}`));

    // subscribe to all the connections
    _.uniq(flat(connectionList.map(obj => [obj.mId, obj.userId]))).forEach(uid => session.subscribe(`UserConnection-${uid}`));

    // subscribe to all related organization
    allOrganization.forEach((og) => session.subscribe(`Organization-${og.id}`));

    // subscribe to all related blog for comment and like broadcast
    allBlogs.forEach(blog => session.subscribe(`Blog-${blog.id}`));
    session.dispatch(schema.init('UserConnection', connectionList));
    session.dispatch(schema.init('Board', allBoard));
    session.dispatch(schema.init('BoardColumn', allBoardColumns));
    session.dispatch(schema.init('BoardMember', allBoardMembers));
    session.dispatch(schema.init('Blog', allBlogs));
    session.dispatch(schema.init('Organization', allOrganization));
    session.dispatch(schema.init('OrganizationMember', allOrganizationMembers));
    // updating boardmember active status
    const allBoardMemberWithActiveStatus = userPresentorHelper(session.getChannel('Main'), allBoardMembers);
    const boardMemberActiveStatusToUpdate = allBoardMemberWithActiveStatus.map(bma => ({ id: bma.id, activeStatus: bma.activeStatus, boardId: bma.boardId, userId: bma.user.user.id }));
    boardMemberActiveStatusToUpdate.forEach(bm => session.dispatch(schema.update('BoardMember', bm)));

    // updating userCollection activeStatus
    const userConnectionActiveStatus = userPresentorHelper(session.getChannel('Main'), connectionList);
    const finalUSerConnectionActiveList = userConnectionActiveStatus.map(uc => ({ ...uc, activeStatus: uc.activeStatus, callId: uc.user.user.callId }));
    finalUSerConnectionActiveList.forEach(ucs => session.dispatch(schema.update('UserConnection', ucs)));

    // inform all the user to i am active now
    activeInformer(id, allBoard, boardMemberActiveStatusToUpdate, finalUSerConnectionActiveList, session, true)();

    // adding socket close handler
    session.addCloseListener(activeInformer(id, allBoard, boardMemberActiveStatusToUpdate, finalUSerConnectionActiveList, session, false));

    // Dispatching notification
    getNotifications.call(this, { id, noOfNotification: 0 });
    // console.timeEnd('UserDataFetch');
  } catch (err) {
    console.error('Error in getting data from cache', err);
    throw err;
  }
}
