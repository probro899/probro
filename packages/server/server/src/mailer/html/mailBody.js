import { ENDPOINT } from '../../../../client/src/config';

export default async () => {
  const registrationHtmlString = (token) => {
    return ` <html>
    <head>
    </head>
      <body class="body" style="background: white;">
      <div class="container" style="width: 500; height: 400; background: white; text-align: center;">
        <div class="content" style="width: 500; height: 400; background: white; text-align: center; align-self: center; border-width: 1; border-color: #757575; border-style: solid; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
          <div class="banner" style="background: #154155; height: 80; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">
            <h1 style="color: white; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">Proper Class</h1>
        </div>
        <div class="main-body" style="background: white; width: 500; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; height: auto;">
          <h2>Congratulation you are registered successfully.</h2>
          <p style="color: black;">Please login by using following link to verify your email.</p>
        <a style="background: white; text-align: center; width: 100;" href="${ENDPOINT}/email-verification/${token}" target="_blank">
          ${ENDPOINT}/email-verification/:${token}
        </a>
        <p style="color: black;">If you have any type of login issue then please send email to probro899@gmail.com <br> Thank You! </p>
      </div>
      </div>
    </div>
  </body>
  </html>`;
  };

  const boardNotificationHtml = (header, body, link) => {
    return `<html>
    <head>
    </head>
      <body class="body" style="background: white;">
      <div class="container" style="width: 500; height: 400; background: white; text-align: center;">
        <div class="content" style="width: 500; height: 400; background: white; text-align: center; align-self: center; border-width: 1; border-color: #757575; border-style: solid; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
          <div class="banner" style="background: #154155; height: 80; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">
            <h1 style="color: white; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">Proper Class</h1>
        </div>
        <div class="main-body" style="background: white; width: 500; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; height: auto;">
          <h2>${header}</h2>
          <p style="color: black;">${body}</p>
        <a style="background: white; text-align: center; width: 100;" href=${link} target="_blank">
          ${link}
        </a>
        <p style="color: black;">If you have any type of issue then please send email to probro899@gmail.com <br> Thank You! </p>
      </div>
      </div>
    </div>
    </body>
    </html>`;
  };

  const friendRequestHtmlString = (fUser, tUser) => {
    return `<html>
    <head>
    </head>
      <body class="body" style="background: white;">
      <div class="container" style="width: 500; height: 400; background: white; text-align: center;">
        <div class="content" style="width: 500; height: 400; background: white; text-align: center; align-self: center; border-width: 1; border-color: #757575; border-style: solid; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
          <div class="banner" style="background: #154155; height: 80; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">
            <h1 style="color: white; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">Proper Class</h1>
        </div>
        <div class="main-body" style="background: white; width: 500; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; height: auto;">
          <h2>You have a friend request from ${fUser.firstName}.</h2>
          <p style="color: black;">Please follow the link for more details</p>
        <a style="background: white; text-align: center; width: 100;" href="${ENDPOINT}/" target="_blank">
          ${ENDPOINT}/
        </a>
        <p style="color: black;">If you have any type of issue then please send email to probro899@gmail.com <br> Thank You! </p>
      </div>
      </div>
    </div>
    </body>
    </html>`;
  };

  const friendRequestAcceptHtmlString = (fUser, tUser) => {
    return `<html>
    <head>
    </head>
      <body class="body" style="background: white;">
      <div class="container" style="width: 500; height: 400; background: white; text-align: center;">
        <div class="content" style="width: 500; height: 400; background: white; text-align: center; align-self: center; border-width: 1; border-color: #757575; border-style: solid; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
          <div class="banner" style="background: #154155; height: 80; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">
            <h1 style="color: white; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;">Proper Class</h1>
        </div>
        <div class="main-body" style="background: white; width: 500; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; height: auto;">
          <h2>${tUser.firstName} accept your friend request</h2>
          <p style="color: black;">Please follow the link for more details</p>
        <a style="background: white; text-align: center; width: 100;" href="${ENDPOINT}/" target="_blank">
          ${ENDPOINT}/
        </a>
        <p style="color: black;">If you have any type of issue then please send email to probro899@gmail.com <br> Thank You! </p>
      </div>
      </div>
    </div>
    </body>
    </html>`;
  };

  return { registrationHtmlString, boardNotificationHtml, friendRequestHtmlString, friendRequestAcceptHtmlString };
};
