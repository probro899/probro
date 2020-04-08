import updateUserData from './udpateUserData';

export default (session, callCloseDetail) => {
  console.log('Self close called');
  session.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
  updateUserData(callCloseDetail, session);
};
