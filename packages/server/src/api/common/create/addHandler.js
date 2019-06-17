import schema from '@probro/common/src/schema';
import add from './add';
import db from '../../../db';
import mailBody from '../../../mailer/html/mailBody';
import mailer from '../../../mailer';


function addBoard(record) {
  add.call(this, 'Board', { ...record, joinStatus: true, userType: 'creator' });
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

  await db.execute(async ({ findOne, insert }) => {
    const user = await findOne('User', { email: record.email });
    const htmlStringValue = await mailBody();
    if (user) {
      await insert('Board', { ...record, userId: user.id });
      await mailer({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${record.email}>`,
        subject: 'Board inivitation',
        text: 'No reply',
        html: htmlStringValue.boardMemberInvitationHtmlString,
      });
      delete record.email;
      const notiData = {
        userId: user.id,
        boardId: record.id,
        timeStamp: Date.now(),
        body: `You have been invited to ${record.name}`,
        title: 'Board Invitation',
        type: 'board',
        viewStatus: false,
        imageUrl: null,
      };
      const notiId = await insert('Notification', notiData);
      const notiDetails = await findOne('Notification', { id: notiId });
      const channel = session.channel('Board');
      channel.dispatch(schema.add('Notification', notiDetails), [{ userId: user.id }]);
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
