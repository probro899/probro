import databaseCache from '../../../../../cache/database/cache';
import findBlogDetails from '../../../findBlogDetails';

export default async function getBlogBookmarks() {
  try {
    const { session } = this;
    const uId = session.values.user.id;
    const totalBookmarks = databaseCache.get('BlogBookmark').filter(bm => bm.userId === uId && !bm.deleteStatus);
    const bookMarkWithBlogDetails = totalBookmarks.map(bm => {
      let blogDetails = findBlogDetails(bm.blogId);
      blogDetails = { ...blogDetails.blog, content: blogDetails.blog.content.replace(/(<([^>]+)>)/gi, '').slice(0, 150), blogComment: blogDetails.blogComment.length, blogLike: blogDetails.blogLike.length };
      return { ...bm, blogDetails };
    });
    return bookMarkWithBlogDetails;
  } catch (e) {
    console.error('error in getBlogBookmarks', e);
  }
}
