/* eslint-disable no-lonely-if */

export default async (props) => {
  const { apis, account, database, webRtc, updateWebRtc } = props;
  const noOfNotificationFetch = Object.values(database.Notification.byId).length;
  const isFirstFetch = webRtc.fetchedApisRes.find(f => f.type === 'notification');
  if (!isFirstFetch) {
    const res = await apis.getNotifications({ id: account.user.id, noOfNotification: noOfNotificationFetch });
    updateWebRtc('fetchedApisRes', [...webRtc.fetchedApisRes, res]);
  } else {
    if (noOfNotificationFetch < isFirstFetch.toalNoOfNotification) {
      apis.getNotifications({ id: account.user.id, noOfNotification: noOfNotificationFetch });
    }
  }
};
