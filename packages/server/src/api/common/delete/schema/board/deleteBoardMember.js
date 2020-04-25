/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import findBoardDetails from '../../../findBoradDetail';
import databaseChache from '../../../../../cache/database/cache';
import updateUserCache from '../../../updateUserCache';
import flat from '../../../../flat';
import update from '../../../update/update';
import sendNotification from '../../../sendNotification';

async function deleteBoardMember(record, leave) {
  // console.log('delete Board member called', record);
  const { session } = this;
  const { userId, id, boardId } = record;

  // getting all the Required tables from cache database
  const allDbUsers = databaseChache.get('User');
  const allDbBoards = databaseChache.get('Board');

  // finding details of the user that is going to be add in this board
  const user = allDbUsers.find(u => u.id === parseInt(userId, 10));

  // deleting some privated info
  delete user.password;
  delete user.verificationToken;
  delete user.verify;

  // finding info of the user to add the curent user
  const fuser = allDbUsers.find(u => u.id === session.values.user.id);

  // finding current board all info
  const board = allDbBoards.find(b => b.id === parseInt(record.boardId, 10));

  // getting html body for emailing
  const htmlStringValue = await mailBody();

  // checking user is valid or not
  if (user) {
    // removing user to the BoardMember
    await update.call(this, 'BoardMember', { id, broadCastId: `$Board-${boardId}`, deleteStatus: true }, { id });

    // getting all the session for finding tuser is currently active or not
    // Note: it is replace by UserConnection because only connected friend is allowed to add board

    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
    if (remoteUserSession) {
      remoteUserSession.unsubscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);

      // gettting all the board details like column, users, card, attachment every details info
      const boardDetails = await findBoardDetails(record.boardId);

      // data to be updated in remote user
      const dataTobeUpdated = {
        BoardColumnCardAttachment: flat(flat(boardDetails.boardColumnCardAttachment)),
        BoardColumnCardComment: flat(flat(boardDetails.boardColumnCardComment)),
        BoardColumnCardDescription: flat(flat(boardDetails.boardColumnCardDescription)),
        BoardColumnCard: flat(flat(boardDetails.boardColumnCard)),
        BoardColumn: flat(boardDetails.boardColumn),
        Board: boardDetail,
      };

      // update remote user cache
      updateUserCache(dataTobeUpdated, remoteUserSession, 'remove');
    }

    const boardChannel = session.getChannel(`Board-${record.boardId}`);
    const dataTobeupdateAllUser = {
      // Notification: notiDetails,
      BoardMember: { id, deleteStatus: true },
    };
    boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'update'));

    // sending notification to all board members
    const sessions = session.getChannel(`Board-${record.boardId}`);
    const emailObj = {
      html: htmlStringValue.boardNotificationHtml(
        `${user.firstName} ${leave ? 'leave' : 'removed from'} the class ${board.name}`,
        'Please follow the link to check details',
        'https://properclass.com'),
      subject: `${user.firstName} ${leave ? 'leave' : 'removed from'} the class ${board.name}`,
    };

    const notiObj = {
      userId: fuser.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `${user.firstName} ${leave ? 'leave' : 'removed from'}  the class ${board.name}`,
      title: 'Member Remove',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null,
    };
    sendNotification(this, emailObj, notiObj, sessions);
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: 'User Remove Succefully' };
}
export default deleteBoardMember;
