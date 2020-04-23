/* eslint-disable import/no-cycle */
import sendNotification from './sendNotification';
import mainBody from '../../mailer/html/mailBody';
import databaseCache from '../../cache/database/cache';

const dataPropvider = (table, id) => {
  return databaseCache.get(table).find(b => b.id === id);
};

const messageBody = (message, record) => {
  const user = dataPropvider('User', parseInt(record.userId, 10));
  const board = dataPropvider('Board', parseInt(record.boardId, 10));
  const boardColumn = dataPropvider('BoardColumn', parseInt(record.columnId, 10));
  const card = dataPropvider('BoardColumnCard', parseInt(record.cardId, 10));
  switch (message) {
    case 'createColumn':
      return {
        body: `${user.firstName} create cloumn "${boardColumn ? boardColumn.name : null }" in class ${board.name}`,
        title: 'Create Coulumn',
      };
    case 'createCard':
      return {
        body: `${user.firstName} create card "${card.name}" in class ${board.name}`,
        title: 'Create Card',
      };
    case 'createAttachment':
      return {
        body: `${user.firstName} add attachment on card "${card.name}" in class ${board.name}`,
        title: 'Add Attachment',
      };
    case 'createComment':
      return {
        body: `${user.firstName} add comment on card "${card.name}" in class ${board.name}`,
        title: 'Add Comment',
      };
    case 'createDescription':
      return {
        body: `${user.firstName} add description on card "${card.name}" in class ${board.name}`,
        title: 'Add Description',
      };
    case 'createTag':
      return {
        body: `${user.firstName} add tag on card "${card.name}" in class ${board.name}`,
        title: 'Add Tag',
      };
    case 'updateBoard':
      return {
        body: `${user.firstName} update class name "${board.name}"`,
        title: 'Update Class',
      };
    case 'updateColumn':
      return {
        body: `${user.firstName} change column "${boardColumn ? boardColumn.name : null}" in class ${board.name}"`,
        title: 'Update Column',
      };
    case 'outsideColumn':
      return {
        body: `${user.firstName} move card "${card.name}" from ${dataPropvider('BoardColumn', parseInt(record.fColId, 10)).name} to ${dataPropvider('BoardColumn', parseInt(record.tColId, 10)).name} in calss ${board.name}`,
        title: 'Move Card',
      };
    case 'withinColumn':
      return {
        body: `${user.firstName} swap card "${card.name}" in column ${dataPropvider('BoardColumn', parseInt(record.fColId, 10)).name} in class ${board.name}`,
        title: 'Swap Card',
      };
    case 'updateDescription':
      return {
        body: `${user.firstName} update description of card ${card.name} in class ${board.name}`,
        title: 'Description updated',
      };
    default:
      return null;
  };
};

const findNotificationBody = (record) => {
  const { body, title } = messageBody(record.message, record);
  return {
    userId: record.userId,
    boardId: record.boardId,
    timeStamp: Date.now(),
    body,
    title,
    type: 'board',
    typeId: record.boardId,
    viewStatus: false,
    imageUrl: null,
  };
};

const findEmailBody = async (record) => {
  const htmlStringValue = await mainBody();
  const { body } = messageBody(record.message, record);
  return {
    html: htmlStringValue.boardNotificationHtml(
      body,
      'Please follow the link to see the changes',
      'https://properclass.com'
    ),
    subject: body,
  };
};

export default async (context, record) => {
  console.log('send notifcation helper params', record.message);
  try {
    const { session } = context;
    const sessions = session.getChannel(`Board-${record.boardId}`).filter(s => s.values.user.id !== session.values.user.id);
    const notificanObj = findNotificationBody(record);
    const emailObj = await findEmailBody(record);
    sendNotification(context, emailObj, notificanObj, sessions);
  } catch (e) {
    console.error('Error in sending notification', e);
  }
};
