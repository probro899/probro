/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import databaseChache from '../../../../../cache/database/cache';
import updateUserCache from '../../../updateUserCache';
import add from '../../add';
import update from '../../../update/update';
import sendNotification from '../../../sendNotification';
import findUserDetails from '../../../findUserDetails';

async function addBoardMember(record) {
  try {
    // console.log('addMemeber called', record);
    const { session } = this;
    const { userId } = record;

    // getting all the Required tables from cache database
    const allDbUsers = databaseChache.get('User');
    const allDbBoards = databaseChache.get('Board').filter(b => b.id === record.boardId);
    const allDbBaordMembers = databaseChache.get('BoardMember').filter(bm => bm.boardId === record.boardId);
    // const allDbUserDetails = databaseChache.get('UserDetail');

    // finding details of the user that is going to be add in this board
    const user = allDbUsers.find(u => u.id === parseInt(userId, 10));

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
        delete record.userId;
        addMemberRes = await add.call(this, 'BoardMember', { ...record, tuserId: user.id });
      }

      // getting all the session for finding tuser is currently active or not
      // Note: it is replace by UserConnection because only connected friend is allowed to add board
      const mainchannel = session.getChannel('Main');
      const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
      if (remoteUserSession) {
        remoteUserSession.subscribe(`Board-${board.id}`);
        const boardDetail = allDbBoards.find(b => b.id === record.boardId);
        const boardDetailWithUser = { ...boardDetail, user: findUserDetails(boardDetail.userId) };
        const boardChannel = session.getChannel(`Board-${record.boardId}`);

        // data to be updated in remote user
        const dataTobeUpdated = {
          Board: boardDetailWithUser,
        };

        // update remote user cache
        await updateUserCache(dataTobeUpdated, remoteUserSession, 'add');
        // data tobe update in all all board members
        const dataTobeupdateAllUser = {
          // Notification: notiDetails,
          User: { ...user, activeStatus: true },
          BoardMember: { id: addMemberRes, ...record, tuserId: user.id, deleteStatus: false, user: findUserDetails(userId) },
        };

        await boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));

        // adding all boardMemeber to remote user
        allDbBaordMembers.forEach(bm => updateUserCache({ BoardMember: { ...bm, user: findUserDetails(bm.tuserId) } }, remoteUserSession, 'add'));

        const emailObj = {
          email: user.email,
          html: htmlStringValue.boardNotificationHtml(
            `You are added to the class ${board.name}`,
            `Please follow the link to join the class ${board.name}.`,
            'https://properclass.com'),
          subject: `Class inivitation from ${fuser.firstName} `,
        };

        const notiObj = {
          userId: user.id,
          boardId: record.boardId,
          timeStamp: Date.now(),
          body: `You are added to the class ${board.name}`,
          title: 'Class Invitation',
          type: 'board',
          typeId: record.boardId,
          viewStatus: false,
          imageUrl: null,
        };

        setTimeout(() => sendNotification(this, emailObj, notiObj, [remoteUserSession]), 10000);
      } else {
        // data tobe update all board members
        const boardChannel = session.getChannel(`Board-${record.boardId}`);
        const dataTobeupdateAllUser = {
          // Notification: notiDetails,
          User: { ...user, activeStatus: false },
          BoardMember: { id: addMemberRes, ...record, tuserId: user.id, deleteStatus: false, user: findUserDetails(userId) },
        };
        boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));
      }

      // sending notification to all board members
      const sessions = session.getChannel(`Board-${record.boardId}`);
      let finalSessions = sessions.filter(s => s.values.user.id !== session.values.user.id);
      if (remoteUserSession) {
        finalSessions = finalSessions.filter(s => s.values.user.id !== remoteUserSession.values.user.id);
      }
      const emailObj = {
        email: user.email,
        html: htmlStringValue.boardNotificationHtml(
          `${user.firstName} added to the class ${board.name}`,
          `Please follow the link to join the class ${board.name}.`,
          'https://properclass.com'),
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
      sendNotification(this, emailObj, notiObj, finalSessions);
    } else {
      throw new Error('User Not Found');
    }
    return { status: 200, data: addMemberRes };
  } catch (e) {
    console.error('Error in addBoradMember', e);
  }
}
export default addBoardMember;
