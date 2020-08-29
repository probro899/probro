import db from '../../db';
import database from './cache';

const tableList = ['User', 'UserDetail', 'Board', 'BoardColumn', 'BoardColumnCard', 'BoardColumnCardAttachment',
  'BoardColumnCardComment', 'BoardColumnCardDescription', 'BoardColumnCardTag', 'Blog', 'BlogComment', 'BlogLike', 'BoardMember',
  'UserEducation', 'UserWorkExperience', 'UserPortal', 'UserSkill', 'UserCarrierInterest', 'BoardMessage', 'BoardMessageSeenStatus', 'UserConnection',
  'UserMessage', 'UserMessageSeenStatus', 'Notification', 'NotificationReadStatus'];

async function initCacheDB() {
  try {
    await db.execute(async ({ find }) => {
      const allDbPropmises = tableList.map(table => find(table));
      const allDBValue = await Promise.all(allDbPropmises);
      // setting all table in databse cache
      tableList.forEach((table, idx) => {
        database.set(table, allDBValue[idx]);
      });
    });
  } catch (e) {
    console.error('error in init cache', e);
  }
}
export default initCacheDB;
