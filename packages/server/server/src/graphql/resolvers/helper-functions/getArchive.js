import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';
import removeOwnData from './removeOwnData';

export default async (sessionId) => {
  try {
    // console.log('User id in getArchive api', sessionId);
    let blogs = databaseCache.get('Blog').filter(b => b.saveStatus === 'publish');
    if (sessionId) {
      blogs = removeOwnData(blogs, sessionId, 'Blog');
    }

    blogs = blogs.map((b, idx) => {
      const userDetails = findUserDetails(b.userId);
      const creator = { ...userDetails.user, userDetail: userDetails.userDetail };
      const miniContent = b.content.replace(/(<([^>]+)>)/gi, '').slice(0, 150);
      const noOfLikes = databaseCache.get('BlogLike').filter(bl => bl.blogId === b.id).length;
      const noOfComments = databaseCache.get('BlogComment').filter(bc => bc.blogId === b.id).length;
      return {
        ...b,
        user: creator,
        content: miniContent,
        noOfLikes,
        noOfComments,
      };
    });

    blogs = blogs.filter(b => b.user.type === 'verified');

    blogs = blogs.sort((a, b) => {
      // console.log('a and b', a, b);
      if ((a.noOfLikes + a.noOfComments) > (b.noOfLikes + b.noOfComments)) {
        return -1;
      }
      return 1;
    });
    return blogs;
  } catch (e) {
    console.error('Error in getArchive', e);
  }
};
