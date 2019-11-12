/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import add from '../../add';
import db from '../../../../../db';
import mailBody from '../../../../../mailer/html/mailBody';
import mailer from '../../../../../mailer';
import findBoardDetails from '../../../findBoradDetail';
import updateUserCache from '../../../updateUserCache';

const flat = (arr) => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

async function addBoard(record) {
  const { session } = this;
  const boardId = await add.call(this, 'Board', record);
  await add.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
  session.subscribe(`Board-${boardId}`);
  console.log('boardid in addBorad', boardId);
  return boardId;
}

async function addBoardColumn(record) {
  const res = await add.call(this, 'BoardColumn', record);
  return res;
}

async function addBoardColumnCard(record) {
  const res = await add.call(this, 'BoardColumnCard', record);
  return res;
}

async function addBoardColumnCardAttachment(record) {
  const res = await add.call(this, 'BoardColumnCardAttachment', record);
  return res;
}

async function addBoardColumnCardComment(record) {
  const res = add.call(this, 'BoardColumnCardComment', record);
  return res;
}

async function addBoardColumnCardDescription(record) {
  const res = await add.call(this, 'BoardColumnCardDescription', record);
  return res;
}

async function addBoardMessageSeenStatus(record) {
  const res = await add.call(this, 'BoardMessageSeenStatus', record);
  return res;
}

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;
  let currentBoardChannel = null;

  const res = await db.execute(async ({ findOne, insert, find }) => {
    const user = await findOne('User', { email });
    delete user.password;
    delete user.verificationToken;
    delete user.verify;
    const fuser = await findOne('User', { id: record.fuserId });
    const board = await findOne('Board', { id: record.boardId });
    const htmlStringValue = await mailBody();
    let addMemberRes = null;
    if (user) {
      const boardMember = await findOne('BoardMember', { boardId: record.boardId, tuserId: user.id });
      if (boardMember) {
        return { status: 201, message: 'User is already added to this board' };
      }
      delete record.email;
      addMemberRes = await insert('BoardMember', { ...record, tuserId: user.id });
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
        viewStatus: false,
        imageUrl: null,
      };

      const notiId = await insert('Notification', notiData);
      const notiDetails = await findOne('Notification', { id: notiId });
      const mainchannel = session.getChannel('Main');

      const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
      console.log('remote User session', remoteUserSession);
      currentBoardChannel = session.channel(`Board-${board.id}`);
      if (remoteUserSession) {
        remoteUserSession.subscribe(`Board-${board.id}`);
        const boardDetail = await findOne('Board', { id: record.boardId });
        const boardDetails = await findBoardDetails(record.boardId);
        // console.log('boardDetails to be dispatch in user', boardDetails);

        const boardMembers = await find('BoardMember', { boardId: record.boardId });
        const boardMemberPromises = [];

        boardMembers.forEach(b => boardMemberPromises.push(findOne('User', { id: b.userId || b.tuserId })));
        const allBoardUsers = await Promise.all(boardMemberPromises);

        const boardChannel = session.getChannel(`Board-${record.boardId}`);

        const finalUserList = allBoardUsers.map((u) => {
          for (let i = 0; i < boardChannel.length; i += 1) {
            if (boardChannel[i].values.user.id === u.id) {
              return { ...u, activeStatus: true };
            }
          }
          return { ...u, activeStatus: false };
        });

        const allBoardMemberDetailPromises = [];
        finalUserList.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));
        const allBoardUserDetails = await Promise.all(allBoardMemberDetailPromises);

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
        currentBoardChannel.dispatch(schema.add('Notification', notiDetails));
        currentBoardChannel.dispatch(schema.add('User', { ...user, activeStatus: true }));
      } else {
        currentBoardChannel.dispatch(schema.add('Notification', notiDetails));
        currentBoardChannel.dispatch(schema.add('User', { ...user, activeStatus: false }));
      }
    } else {
      throw new Error('User Not Found');
    }
    return { status: 200, data: addMemberRes };
  });
  return res;
}

async function addBoardMessage(record) {
  const res = await add.call(this, 'BoardMessage', record);
  return res;
}

async function addBoardColumnCardTag(record) {
  const res = await add.call(this, 'BoardColumnCardTag', record);
  return res;
}

export default [
  addBoard,
  addBoardColumn,
  addBoardColumnCard,
  addBoardColumnCardAttachment,
  addBoardColumnCardComment,
  addBoardColumnCardDescription,
  addBoardMember,
  addBoardMessage,
  addBoardColumnCardTag,
  addBoardMessageSeenStatus,
];
