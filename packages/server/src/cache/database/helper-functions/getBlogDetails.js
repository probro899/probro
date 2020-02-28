import lodash from 'lodash';
import { findBlogDetail } from '../../../api';
import flat from '../../../api/flat';
import cacheDatabase from '../cache';

export default (id) => {
  const allDbBlogs = cacheDatabase.get('Blog');
  const Blog = allDbBlogs.filter(b => b.userId === id);
  const allLike = cacheDatabase.get('BlogLike').filter(bl => bl.userId === id);
  const allComments = cacheDatabase.get('BlogComment').filter(bc => bc.userId === id);
  const BlogPublish = allDbBlogs.filter(bp => bp.saveStatus === 'publish');
  // console.log('all blog data', Blog, allLike, allComments, BlogPublish);
  const allAssociateBlogsId = lodash.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);

  const blogDetails = allAssociateBlogsId.map(bid => findBlogDetail(bid));
  const allBlogs = allAssociateBlogsId.map(bid => allDbBlogs.find(b => b.id === bid));
  // console.log('allBlogs', allBlogs);

  const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
  // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
  const BlogComment = flat(blogDetails.map(obj => obj.blogComment));
  const BlogLike = flat(blogDetails.map(obj => obj.blogLike));
  const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
  // console.log('allBlogUsers', asllBlogUsers);
  return { allBlogs, newBlogPublish, BlogComment, BlogLike, allBlogUsers, allAssociateBlogsId };
};
