/* eslint-disable prefer-destructuring */
import schema from '@probro/common/src/schema';
import flat from '../../../flat';
import cacheDataBase from '../../../../cache/database/cache';
import findUserDetails from '../../findUserDetails';
import getChannelIds from '../../getChannelIds';
import getOrganizations from '../schema/organization/getOrganizations';
import { timeStampSorting } from '../../../../../../client/src/common/utility-functions';

export default async function getNotifications(params) {
  try {
    const { id, noOfNotification } = params;
    const { session } = this;
    // console.log('get notification called', id, noOfNotification);
    const allDbNotifications = cacheDataBase.get('Notification');
    const allDbNotificationsReadStatus = cacheDataBase.get('NotificationReadStatus');
    const allDbBlogs = cacheDataBase.get('Blog');
    const allDbOrganization = cacheDataBase.get('Organization');

    // gettig all board notificatins
    const allChandelIds = await getChannelIds(id, 'Board');
    // console.log('allChannelIds', allChandelIds);
    const allBoards = allChandelIds.allBoard;

    const boardNotifications = flat(allBoards.map(b => allDbNotifications.filter(n => n.boardId === b.id && n.type === 'board'))).filter(n => n.userId !== parseInt(id, 10));
    const boardNotificationWithBoardDetail = boardNotifications.map(bn => ({ ...bn, board: allBoards.find(b => b.id === bn.boardId) }));

    // gettting all User Notificaiton
    const userNotification = allDbNotifications.filter(n => n.userId === id && n.type === 'user');
    const userNotificationWithUserDetail = userNotification.map(n => ({ ...n, user: findUserDetails(n.typeId) }));

    // getting all Blog Notification
    const blogNotification = allDbNotifications.filter(n => n.userId === id && n.type === 'blog');
    const blogNotificationWithUser = blogNotification.map(n => ({ ...n, user: findUserDetails(n.typeId), blog: allDbBlogs.find(b => b.id === n.boardId) }));

    // getting all Organization Notification
    const allOrganizations = getOrganizations(id);
    const allOrgNotificationsRequest = allOrganizations.map((og) => {
      if (og.role === 'admin' || og.role === 'manager') {
        return allDbNotifications.filter(n => n.type === 'organization' && n.boardId === og.id && n.title === 'Organization Request');
      }
      return [];
    });
    const finalRequestTypeNotifications = flat(allOrgNotificationsRequest);
    const organizationNotification = allDbNotifications.filter(n => n.userId === id && n.type === 'organization' && n.title === 'Organization Invitation');
    const finalOrgNotis = [...finalRequestTypeNotifications, ...organizationNotification];
    const orgNotiWithMoreDetails = finalOrgNotis.map(n => ({ ...n, organization: allDbOrganization.find(o => o.id === n.typeId) }));
    // combining all
    const Notification = [
      ...boardNotificationWithBoardDetail,
      ...userNotificationWithUserDetail,
      ...blogNotificationWithUser,
      ...orgNotiWithMoreDetails,
    ];
    const notifications = Notification.sort(timeStampSorting).slice(noOfNotification, noOfNotification + 20);

    // getting seen status of all Notifiction
    const notificationReadStatus = Notification.map(n => allDbNotificationsReadStatus.filter(nrs => nrs.notifId === n.id));

    session.dispatch(schema.add('NotificationReadStatus', flat(notificationReadStatus)));
    session.dispatch(schema.add('Notification', notifications));

    return { toalNoOfNotification: Notification.length, status: 200, type: 'notification' };

  } catch (e) {
    console.error('Error in getNotifications', e);
  }
}
