/* eslint-disable import/no-cycle */
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
  // console.log('boardid in addBorad', boardId);
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
      // console.log('remote User session', remoteUserSession);
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

async function copyBoardColumnCard(record) {
  // console.log('copyBoardColumnCard called', record);
  const { card, description, attachments, tags, columnId } = record;
  const { session } = this;
  delete card.id;
  delete description.id;
  attachments.forEach(d => delete d.id);
  tags.forEach(t => delete t.id);

  const mainRes = await db.execute(async ({ insert }) => {
    const addCardRes = await insert('BoardColumnCard', { ...card, boardColumnId: parseInt(columnId, 10) });
    await updateUserCache({ BoardColumnCard: { ...card, id: addCardRes, boardColumnId: parseInt(columnId, 10) } }, session, 'add');
    const addCardDescriptionRes = await insert('BoardColumnCardDescription', { ...description, boardColumnCardId: addCardRes });
    await updateUserCache({ BoardColumnCardDescription: { ...description, boardColumnCardId: addCardRes, id: addCardDescriptionRes } }, session, 'add');
    const attachmentPromises = [];
    attachments.forEach(at => attachmentPromises.push(insert('BoardColumnCardAttachment', { ...at, boardColumnCardId: addCardRes })));
    const attachmentAllRes = await Promise.all(attachmentPromises);
    const attachmentValues = Object.values(attachments).map((at, idx) => ({ ...at, boardColumnCardId: addCardRes, id: attachmentAllRes[idx] }));
    attachmentValues.forEach(at => updateUserCache({ BoardColumnCardAttachment: at }, session, 'add'));
    const tagsPromises = [];
    tags.forEach(t => tagsPromises.push(insert('BoardColumnCardTag', { ...t, boardColumnCardId: addCardRes })));
    const tagsAllRes = await Promise.all(tagsPromises);
    const tagsValues = Object.values(tags).map((at, idx) => ({ ...at, boardColumnCardId: addCardRes, id: tagsAllRes[idx] }));
    tagsValues.forEach(tg => updateUserCache({ BoardColumnCardTag: tg }, session, 'add'));
  });
  return mainRes;
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
  copyBoardColumnCard,
];
