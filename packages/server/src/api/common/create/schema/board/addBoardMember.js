/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import findBoardDetails from '../../../findBoradDetail';
import databaseChache from '../../../../../cache/database/cache';
import updateUserCache from '../../../updateUserCache';
import flat from '../../../../flat';
import add from '../../add';
import update from '../../../update/update';
import sendNotification from '../../../sendNotification';

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;

  // getting all the Required tables from cache database
  const allDbUsers = databaseChache.get('User');
  const allDbBoards = databaseChache.get('Board');
  const allDbBaordMembers = databaseChache.get('BoardMember');
  const allDbUserDetails = databaseChache.get('UserDetail');

  // finding details of the user that is going to be add in this board
  const user = allDbUsers.find(u => u.email === email);

  // deleting some privated info
  delete user.password;
  delete user.verificationToken;
  delete user.verify;

  // finding info of the user to add the curent user
  const fuser = allDbUsers.find(u => u.id === record.fuserId);

  // finding current board all info
  const board = allDbBoards.find(b => b.id === record.boardId);

  // getting html body for emailing
  const htmlStringValue = await mailBody();

  let addMemberRes = null;

  // checking user is valid or not
  if (user) {
    const boardMember = allDbBaordMembers.find(bm => bm.boardId === record.boardId && bm.tuserId === user.id);

    // checking user is already in board or not
    if (boardMember) {
      if (!boardMember.deleteStatus) {
        return { status: 201, message: 'User is already added to this board' };
      }
      addMemberRes = boardMember.id;
      await update.call(this, 'BoardMember', { id: boardMember.id, deleteStatus: false }, { id: boardMember.id });
    } else {
      // adding user to the BoardMember
      delete record.email;
      addMemberRes = await add.call(this, 'BoardMember', { ...record, tuserId: user.id });
    }

    // getting all the session for finding tuser is currently active or not
    // Note: it is replace by UserConnection because only connected friend is allowed to add board

    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
    if (remoteUserSession) {
      remoteUserSession.subscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);

      // gettting all the board details like column, users, card, attachment every details info
      const boardDetails = await findBoardDetails(record.boardId);

      // getting all current board members
      const boardMembers = allDbBaordMembers.filter(bm => bm.boardId === record.boardId);

      // finding details of board members
      const allBoardUsers = boardMembers.map(bm => allDbUsers.find(u => u.id === bm.userId || u.id === bm.tuserId));

      // finding sessions of current active user in board
      const boardChannel = session.getChannel(`Board-${record.boardId}`);

      // finding who is acitve or not
      const finalUserList = allBoardUsers.map((u) => {
        for (let i = 0; i < boardChannel.length; i += 1) {
          if (boardChannel[i].values.user.id === u.id) {
            return { ...u, activeStatus: true };
          }
        }
        return { ...u, activeStatus: false };
      });

      // finding user details
      const allBoardUserDetails = finalUserList.map(fu => allDbUserDetails.find(ud => ud.userId === fu.id));

      // data to be updated in remote user
      const dataTobeUpdated = {
        Board: boardDetail,
        BoardColumn: flat(boardDetails.boardColumn),
        BoardColumnCard: flat(flat(boardDetails.boardColumnCard)),
        BoardColumnCardAttachment: flat(flat(boardDetails.boardColumnCardAttachment)),
        BoardColumnCardComment: flat(flat(boardDetails.boardColumnCardComment)),
        BoardColumnCardDescription: flat(flat(boardDetails.boardColumnCardDescription)),
        BoardMember: boardMembers,
        User: finalUserList,
        UserDetail: allBoardUserDetails,
      };

      // update remote user cache
      updateUserCache(dataTobeUpdated, remoteUserSession, 'add');

      // data tobe update in all all board members
      const dataTobeupdateAllUser = {
        // Notification: notiDetails,
        User: { ...user, activeStatus: true },
        BoardMember: { id: addMemberRes, ...record, tuserId: user.id, deleteStatus: false },
      };
      boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));
    } else {
      // data tobe update all board members
      const boardChannel = session.getChannel(`Board-${record.boardId}`);
      const dataTobeupdateAllUser = {
        // Notification: notiDetails,
        User: { ...user, activeStatus: false },
        BoardMember: { id: addMemberRes, ...record, tuserId: user.id, deleteStatus: false },
      };
      boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));
    }

    // sending notification to all board members
    const sessions = session.getChannel(`Board-${record.boardId}`);
    const emailObj = {
      email,
      html: htmlStringValue.boardNotificationHtml(
        `You have invitation from ${fuser.firstName} to join the class ${board.name}`,
        `Please follow the link to join the class ${board.name}.`,
        `https://properclass.com`),
      subject: `Class inivitation from ${fuser.firstName} `,
    };

    const notiObj = {
      userId: user.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `${user.firstName} added to the class ${board.name}`,
      title: 'Class Invitation',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null,
    };
    sendNotification(this, emailObj, notiObj, sessions);
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: addMemberRes };
}
export default addBoardMember;
