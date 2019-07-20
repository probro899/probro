import schema from '@probro/common/src/schema';
import add from './add';
import db from '../../../db';
import mailBody from '../../../mailer/html/mailBody';
import mailer from '../../../mailer';
import findBoardDetails from '../findBoradDetail';

async function addBoard(record) {
  const { session } = this;
  const boardId = await add.call(this, 'Board', record);
  await add.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
  session.subscribe(`Board-${boardId}`);
}

function addBoardColumn(record) {
  add.call(this, 'BoardColumn', record);
}

function addBoardColumnCard(record) {
  add.call(this, 'BoardColumnCard', record);
}

function addBoardColumnCardAttachment(record) {
  add.call(this, 'BoardColumnCardAttachment', record);
}

function addBoardColumnCardComment(record) {
  add.call(this, 'BoardColumnCardComment', record);
}

function addBoardColumnCardDescription(record) {
  add.call(this, 'BoardColumnCardDescription', record);
}

function addBlog(record) {
  add.call(this, 'Blog', record);
}

function addBlogDetail(record) {
  add.call(this, 'BlogDetail', record);
}

function addBlogComment(record) {
  add.call(this, 'BlogComment', record);
}

function addBlogLike(record) {
  add.call(this, 'BlogLike', record);
}

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;

  await db.execute(async ({ findOne, insert, find }) => {
    const user = await findOne('User', { email });
    const fuser = await findOne('User', { id: record.fuserId });
    const board = await findOne('Board', { id: record.boardId });
    const htmlStringValue = await mailBody();
    if (user) {
      const boardMember = await findOne('BoardMember', { boardId: record.boardId, tuserId: user.id });
      if (boardMember) {
        throw new Error('User is already added to this board');
      } else {
        delete record.email;
        await insert('BoardMember', { ...record, tuserId: user.id });
        await mailer({
          from: 'ProperClass<probro899@gmail.com>',
          to: `<${email}>`,
          subject: `Board inivitation from ${fuser.firstName} `,
          text: 'No reply',
          html: htmlStringValue.boardMemberInvitationHtmlString,
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
        const channel = session.channel('Board');
        const boardDetail = await findOne('Board', { id: record.boardId });
        const boardDetails = await findBoardDetails(record.boardId);
        // console.log('boardDetails to be dispatch in user', boardDetails);

        const boardMembers = await find('BoardMember', { boardId: record.boardId });
        const boardMemberPromises = [];

        boardMembers.forEach(b => boardMemberPromises.push(findOne('User', { id: b.userId || b.tuserId })));
        const allBoardUsers = await Promise.all(boardMemberPromises);

        const allBoardMemberDetailPromises = [];

        allBoardUsers.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));

        const allBoardUserDetails = await Promise.all(allBoardMemberDetailPromises);

        const boardChannel = session.getChannel(`Board-${record.boardId}`);

        const finalUserList = allBoardUsers.map((u) => {
          for (let i = 0; i < boardChannel.length; i += 1) {
            if (boardChannel[i].values.user.id === u.id) {
              return { ...u, activeStatus: true };
            }
          }
          return { ...u, activeStatus: false };
        });

        console.log('Final User list', finalUserList);
        finalUserList.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));

        channel.dispatch(schema.add('Board', boardDetail), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardColumn', boardDetails.boardColumn.flat()), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardColumnCard', boardDetails.boardColumnCard.flat().flat()), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardColumnCardAttachment', boardDetails.boardColumnCardAttachment.flat().flat()), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardColumnCardComment', boardDetails.boardColumnCardComment.flat().flat()), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardColumnCardDescription', boardDetails.boardColumnCardDescription.flat().flat()), [{ userId: user.id }]);
        channel.dispatch(schema.add('BoardMember', boardMembers), [{ userId: user.id }]);
        channel.dispatch(schema.add('User', finalUserList), [{ userId: user.id }]);
        channel.dispatch(schema.add('UserDetail', allBoardUserDetails), [{ userId: user.id }]);
        channel.dispatch(schema.add('Notification', notiDetails));
      }
    } else {
      throw new Error('User Not Found');
    }
  });
}

export default [
  addBoard,
  addBoardColumn,
  addBoardColumnCard,
  addBoardColumnCardAttachment,
  addBoardColumnCardComment,
  addBoardColumnCardDescription,
  addBlog,
  addBlogComment,
  addBlogDetail,
  addBlogLike,
  addBoardMember,
];
