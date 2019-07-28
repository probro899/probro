import db from '../../db';

export default async function findBlogDetails(blogId) {

  const res = db.execute(async ({ find }) => {
    // const blogDetail = await find('BlogDetail', { blogId });
    const blogComment = await find('BlogComment', { blogId });
    const blogLike = await find('BlogLike', { blogId });
    return { blogComment, blogLike };
  });
  return res;
}
