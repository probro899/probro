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
  const boardColumn = dataPropvider('BoardColumn', parseInt(record.columnId || record.id, 10));
  const card = dataPropvider('BoardColumnCard', parseInt(record.cardId, 10));
  switch (message) {
    case 'createColumn':
      return {
        body: `${user.firstName} created bucket "${boardColumn ? boardColumn.name : null}" in class ${board.name}`,
        title: 'Create Coulumn',
      };
    case 'createCard':
      return {
        body: `${user.firstName} created task"${card.name}" in class ${board.name}`,
        title: 'Create Card',
      };
    case 'createAttachment':
      return {
        body: `${user.firstName} added attachment on "${card.name}" in class ${board.name}`,
        title: 'Add Attachment',
      };
    case 'createComment':
      return {
        body: `${user.firstName} added new comment on "${card.name}" in class ${board.name}`,
        title: 'Add Comment',
      };
    case 'createDescription':
      return {
        body: `${user.firstName} added description on "${card.name}" in class ${board.name}`,
        title: 'Add Description',
      };
    case 'createTag':
      return {
        body: `${user.firstName} added tag on "${card.name}" in class ${board.name}`,
        title: 'Add Tag',
      };
    case 'updateBoard':
      return {
        body: `${user.firstName} updated class name "${board.name}"`,
        title: 'Update Class',
      };
    case 'updateTitle':
      return {
        body: `${user.firstName} changed bucket title to "${boardColumn ? boardColumn.name : null}" in class ${board.name}`,
        title: 'Update Column',
      };
    case 'moveColumn':
      return {
        body: `${user.firstName} moved bucket "${boardColumn ? boardColumn.name : null}" in class ${board.name}"`,
        title: 'Move Column'
      }
    case 'outsideColumn':
      return {
        body: `${user.firstName} moved "${card.name}" from ${dataPropvider('BoardColumn', parseInt(record.fColId, 10)).name} to ${dataPropvider('BoardColumn', parseInt(record.tColId, 10)).name} in class ${board.name}`,
        title: 'Move Card',
      };
    case 'withinColumn':
      return {
        body: `${user.firstName} moved "${card.name}" within ${dataPropvider('BoardColumn', parseInt(record.fColId, 10)).name} in class ${board.name}`,
        title: 'Swap Card',
      };
    case 'updateDescription':
      return {
        body: `${user.firstName} changed description as "${card.name}" in class ${board.name}`,
        title: 'Description updated',
      };
    case 'deleteColumn':
      return {
        body: `${user.firstName} deleted bucket "${boardColumn.name}" in class ${board.name}`,
        title: 'Delete Column',
      };
    case 'deleteCard':
      return {
        body: `${user.firstName} deleted card "${card.name}" in class ${board.name}`,
        title: 'Delete Card',
      };
    case 'deleteAttachment':
      return {
        body: `${user.firstName} deleted attachment  on card "${card.name}" in class ${board.name}`,
        title: 'Delete Attachment',
      };
    case 'deleteComment':
      return {
        body: `${user.firstName} deleted comment on card "${card.name}" in class ${board.name}`,
        title: 'Delete Comment',
      };
    case 'deleteTag':
      return {
        body: `${user.firstName} deleted tag on card "${card.name}" in class ${board.name}`,
        title: 'Delete Tag',
      };
    case 'createParticipant':
      return {
        body: `${user.firstName} add participant on card "${card.name}" in class ${board.name}`,
        title: 'ADD Participant',
      };
    case 'deleteParticipant':
      return {
        body: `${user.firstName} delete participant on card "${card.name}" in class ${board.name}`,
        title: 'Delete Participant',
      };
    case 'createAppointment':
      return {
        body: `${user.firstName} Add Appointment in class ${board.name}`,
        title: 'Add Appointment',
      };
    case 'updateAppointment':
      return {
        body: `${user.firstName} Update Appointment in class ${board.name}`,
        title: 'Update Appointment',
      };
    case 'deleteAppointment':
      return {
        body: `${user.firstName} Delete Appointment in class ${board.name}`,
        title: 'Delete Appointment',
      };
    default:
      return null;
  }
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
