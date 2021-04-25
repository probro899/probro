import db from '../../db';
import database from './cache';

const tableList = [
  'User', 'UserDetail', 'UserEducation', 'UserWorkExperience', 'UserPortal',
  'UserSkill', 'UserCarrierInterest',
  'Board', 'BoardColumn', 'BoardColumnCard', 'BoardColumnCardAttachment', 'BoardColumnCardComment',
  'BoardColumnCardDescription', 'BoardColumnCardTag', 'BoardMember',
  'Blog', 'BlogComment', 'BlogLike',
  'BoardMessage', 'BoardMessageSeenStatus',
  'UserMessage', 'UserMessageSeenStatus', 'UserConnection',
  'Notification', 'NotificationReadStatus',
  'Organization', 'OrganizationMember',
  'Package', 'PackageDescription', 'SellPackage',
  'Course', 'Section', 'Lecture', 'Resource', 'CourseEnroll', 'CoursePrice', 'StarRating', 'CourseCompleteHistory',
  'Appointment',
];

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
