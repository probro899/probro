import { ENDPOINT } from '../../../../client/src/config';
import GeneralFormat from './GeneralFormat';

export default async () => {
  const registrationHtmlString = (token) => {
    const header = 'Congratulation you are registered successfully.';
    const body = 'Please login by using following link to verify your email.';
    const link = `${ENDPOINT}/email-verification/${token}`;
    return GeneralFormat(header, body, link);
  };

  const boardNotificationHtml = (header, body, link) => GeneralFormat(header, body, link);

  const friendRequestHtmlString = (fUser, tUser) => {
    const header = `You have a friend request from ${fUser.firstName}.`;
    const body = 'Please follow the link for more details.';
    const link = `${ENDPOINT}/`;
    return GeneralFormat(header, body, link);
  };

  const friendRequestAcceptHtmlString = (fUser, tUser) => {
    const header = `${tUser.firstName} accept your friend request`;
    const body = 'Please follow the link for more details';
    const link = `${ENDPOINT}/`;
    return GeneralFormat(header, body, link);
  };

  return { registrationHtmlString, boardNotificationHtml, friendRequestHtmlString, friendRequestAcceptHtmlString };
};
