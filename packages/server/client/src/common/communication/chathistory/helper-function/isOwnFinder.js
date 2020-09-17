
export default (msg, props) => {
  const { webRtc, account } = props;
  if (webRtc.chatHistory.type === 'user') {
    const { user, userDetails } = webRtc.chatHistory.user;
    if (msg.fuserId === account.user.id) {
      return { isOwn: true, user: account.user };
    }
    return { isOwn: false, user: { ...user, userDetails } };
  }

  if (msg.userId === account.user.id) {
    return { isOwn: true, user: account.user };
  }

  return { isOwn: false, user: { ...msg.user.user, userDetails: msg.user.userDetail } };
};
