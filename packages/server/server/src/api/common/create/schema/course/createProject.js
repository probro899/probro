/* eslint-disable import/no-cycle */
import databaseCache from '../../../../../cache/database/cache';
import add from '../../add';
import flat from '../../../../flat';

export async function addCloneProject(courseProject, context, params) {
  const { id, userId } = params;
  const refId = courseProject.id;

  // Adding that project as ref for current enrollment
  const addRefProjectRes = await add.call(context, 'Board', { ...courseProject, id: undefined, ceId: id, refId });

  // getting all details of current project for copy purpose
  const boardColumn = databaseCache.get('BoardColumn').filter(bc => bc.boardId === refId);
  const boardColumnCard = flat(boardColumn.map(bc => databaseCache.get('BoardColumnCard').filter(bcc => bcc.boardColumnId === bc.id)));

  // copy allBucket to current ref Project
  const refBucketsPromises = [];
  const preBucketIds = [];
  boardColumn.forEach((b) => {
    const { id } = b;
    preBucketIds.push(id);
    refBucketsPromises.push(add.call(context, 'BoardColumn', { ...b, id: undefined, refId: id, boardId: addRefProjectRes }));
  });
  const bucketAddResids = await Promise.all(refBucketsPromises);

  // change replace bucket Id of all task by current bucketId and Add with task refId
  const addTaskPromises = [];
  boardColumnCard.forEach((t) => {
    const currentBucketId = bucketAddResids[preBucketIds.findIndex(id => id === t.boardColumnId)];
    const { id } = t;
    addTaskPromises.push(add.call(context, 'BoardColumnCard', { ...t, id: undefined, boardColumnId: currentBucketId, refId: id }));
  });

  // adding both mentor and sutend as boardMember in the current clone project
  const memberData = [
    { userType: 'creator', tuserId: courseProject.userId, fuserId: userId, boardId: addRefProjectRes, joinStatus: 1, timeStamp: Date.now() },
    { userType: 'normal', tuserId: userId, fuserId: userId, boardId: addRefProjectRes, joinStatus: 1, timeStamp: Date.now() }
  ];

  const boardMemberAddPromises = [];

  memberData.forEach(bm => boardMemberAddPromises.push(add.call(context, 'BoardMember', bm)));
  await Promise.all(boardMemberAddPromises);
  await Promise.all(addTaskPromises);
  return { ...courseProject, id: addRefProjectRes, ceId: id, refId };
}

export default async (context, params) => {
  try {
    const { courseId } = params;
    // Geting course project
    const allcourseProject = databaseCache.get('Board').filter(b => b.cId === courseId && !b.ceId && b.lecId);
    const cloneProjectPromises = [];
    allcourseProject.forEach((courseProject) => {
      cloneProjectPromises.push(addCloneProject(courseProject, context, params));
    });
    await Promise.all(cloneProjectPromises);
    // console.log(allCloneRes);
  } catch (e) {
    console.error('Error in creating cousrse project clone', e);
  }
};
