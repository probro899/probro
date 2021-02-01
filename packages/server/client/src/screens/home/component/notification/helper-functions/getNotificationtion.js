/* eslint-disable no-lonely-if */

export default async (props) => {
  const { apis, account, database, webRtc, updateWebRtc } = props;
  const noOfNotificationFetch = Object.values(database.Notification.byId).length;
  if (noOfNotificationFetch < 20) {
    return { allFetched: true };
  }
  const isFirstFetch = webRtc.fetchedApisRes.find(f => f.type === 'notification');
  if (!isFirstFetch) {
    const res = await apis.getNotifications({ id: account.user.id, noOfNotification: noOfNotificationFetch });
    updateWebRtc('fetchedApisRes', [...webRtc.fetchedApisRes, res]);
    if (res.toalNoOfNotification > noOfNotificationFetch + 20) {
      return { allFetched: false };
    } else {
      return { allFetched: true };
    }
  } else {
    if (isFirstFetch.toalNoOfNotification <= noOfNotificationFetch) {
      return { allFetched: true };
    }
    const res = await apis.getNotifications({ id: account.user.id, noOfNotification: noOfNotificationFetch });
    if (res.toalNoOfNotification > noOfNotificationFetch + 20) {
      return { allFetched: false };
    } else {
      return { allFetched: true };
    }
  }
};
