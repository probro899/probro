/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import mailer from '../../../../../mailer';
import findBoardDetails from '../../../findBoradDetail';
import databaseChache from '../../../../../cache/database/cache';
import updateUserCache from '../../../updateUserCache';
import flat from '../../../../flat';
import add from '../../add';

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;
  let currentBoardChannel = null;

  const allDbUsers = databaseChache.get('User');
  const allDbBoards = databaseChache.get('Board');
  const allDbBaordMembers = databaseChache.get('BoardMember');
  const allDbUserDetails = databaseChache.get('UserDetail');

  const user = allDbUsers.find(u => u.email === email);
  delete user.password;
  delete user.verificationToken;
  delete user.verify;
  const fuser = allDbUsers.find(u => u.id === record.fuserId);
  const board = allDbBoards.find(b => b.id === record.boardId);
  const htmlStringValue = await mailBody();
  let addMemberRes = null;
  if (user) {
    const boardMember = allDbBaordMembers.find(bm => bm.boardId === record.boardId && bm.tuserId === user.id);
    // await findOne('BoardMember', { boardId: record.boardId, tuserId: user.id });
    if (boardMember) {
      return { status: 201, message: 'User is already added to this board' };
    }
    delete record.email;
    addMemberRes = await add.call(this, 'BoardMember', { ...record, tuserId: user.id });
    mailer({
      from: 'ProperClass<probro899@gmail.com>',
      to: `<${email}>`,
      subject: `Board inivitation from ${fuser.firstName} `,
      text: 'No reply',
      html: htmlStringValue.boardMemberInvitationHtmlString(board, fuser, user),
    });
    const notiData = {
      userId: user.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `Added ${user.firstName} to the board ${board.name}`,
      title: 'Board Invitation',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null,
    };

    const notiId = await add.call(this, 'Notification', notiData);
    const notiDetails = { id: notiId, ...notiData };
    // await findOne('Notification', { id: notiId });
    const mainchannel = session.getChannel('Main');

    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
    // console.log('remote User session', remoteUserSession);
    currentBoardChannel = session.channel(`Board-${board.id}`);
    if (remoteUserSession) {
      remoteUserSession.subscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);
      //  await findOne('Board', { id: record.boardId });
      const boardDetails = await findBoardDetails(record.boardId);
      // console.log('boardDetails to be dispatch in user', boardDetails);

      const boardMembers = allDbBaordMembers.filter(bm => bm.boardId === record.boardId);
      //  await find('BoardMember', { boardId: record.boardId });
      // const boardMemberPromises = [];

      // boardMembers.forEach(b => boardMemberPromises.push(findOne('User', { id: b.userId || b.tuserId })));
      const allBoardUsers = boardMembers.map(bm => allDbUsers.find(u => u.id === bm.userId || u.id === bm.tuserId));
      //  await Promise.all(boardMemberPromises);

      const boardChannel = session.getChannel(`Board-${record.boardId}`);

      const finalUserList = allBoardUsers.map((u) => {
        for (let i = 0; i < boardChannel.length; i += 1) {
          if (boardChannel[i].values.user.id === u.id) {
            return { ...u, activeStatus: true };
          }
        }
        return { ...u, activeStatus: false };
      });

      // const allBoardMemberDetailPromises = [];
      // finalUserList.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));
      const allBoardUserDetails = finalUserList.map(fu => allDbUserDetails.find(ud => ud.userId === fu.id));
      // await Promise.all(allBoardMemberDetailPromises);

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
      updateUserCache(dataTobeUpdated, remoteUserSession, 'add');
      const dataTobeupdateAllUser = {
        Notification: notiDetails,
        User: { ...user, activeStatus: true },
        BoardMember: { id: addMemberRes, ...record, tuserId: user.id },
      };
      boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));
    } else {
      const boardChannel = session.getChannel(`Board-${record.boardId}`);
      const dataTobeupdateAllUser = {
        Notification: notiDetails,
        User: { ...user, activeStatus: false },
        BoardMember: { id: addMemberRes, ...record, tuserId: user.id },
      };
      boardChannel.forEach(s => updateUserCache(dataTobeupdateAllUser, s, 'add'));
    }
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: addMemberRes };
}
export default addBoardMember;
