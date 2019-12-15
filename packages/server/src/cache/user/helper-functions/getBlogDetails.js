import lodash from 'lodash';
import { findBlogDetail } from '../../../api';
import flat from '../../../api/flat';

export default async (find, findOne, id) => {
  const Blog = await find('Blog', { userId: id });
  const allLike = await find('BlogLike', { userId: id });
  const allComments = await find('BlogComment', { userId: id });
  const BlogPublish = await find('Blog', { saveStatus: 'publish' });
  // console.log('all blog data', Blog, allLike, allComments, BlogPublish);
  const allAssociateBlogsId = lodash.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);
  // console.log('allAssociated Blog Ids', allAssociateBlogsId);
  const blogDetailsPromises = [];
  const allBlogsPromises = [];
  allAssociateBlogsId.forEach((bid) => {
    blogDetailsPromises.push(findBlogDetail(bid));
    allBlogsPromises.push(findOne('Blog', { id: bid }));
  });

  const blogDetails = await Promise.all(blogDetailsPromises);
  const allBlogs = await Promise.all(allBlogsPromises);
  // console.log('allBlogs', allBlogs);

  const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
  // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
  const BlogComment = flat(blogDetails.map(obj => obj.blogComment));
  const BlogLike = flat(blogDetails.map(obj => obj.blogLike));
  const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
  // console.log('allBlogUsers', asllBlogUsers);
  return { allBlogs, newBlogPublish, BlogComment, BlogLike, allBlogUsers, allAssociateBlogsId };
};

