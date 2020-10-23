/* eslint-disable import/no-cycle */
import findUserDetails from '../../../findUserDetails';
import mailBody from '../../../../../mailer/html/mailBody';
import cacheDatabase from '../../../../../cache/database/cache';
import sendNotification from '../../../sendNotification';

export default async (context, record, type) => {
  // console.log('blog send notificationc calld', record, type);
  const { session } = context;
  let emailObj = {};
  let notiData = {};
  const htmlStringValue = await mailBody();
  const userDetails = findUserDetails(record.userId);
  const { user, userDetail } = userDetails;
  const blogDetail = cacheDatabase.get('Blog').find(b => b.id === record.blogId);
  let body = '';

  if (type === 'comment') {
    body = `${user.firstName} commented on your blog "${blogDetail.title}"`;
  }

  if (type === 'like') {
    body = `${user.firstName} like your blog "${blogDetail.title}"`;
  }

  emailObj = {
    email: user.email,
    html: htmlStringValue.boardNotificationHtml(
      body,
      'Please follow the link to see the changes',
      'https://properclass.com'
    ),
    subject: body,
  };

  notiData = {
    userId: blogDetail.userId,
    timeStamp: Date.now(),
    body,
    title: body,
    type: 'blog',
    boardId: blogDetail.id,
    typeId: record.userId,
    viewStatus: false,
    imageUrl: null,
  };

  const mainchannel = session.getChannel('Main');
  // console.log('main channel in sendBlogNotification', mainchannel);
  const remoteUserSession = mainchannel.find(s => s.values.user.id === blogDetail.userId);
  if (remoteUserSession) {
    // console.log('remote session found');
    sendNotification(context, emailObj, notiData, [remoteUserSession]);
  }
};
