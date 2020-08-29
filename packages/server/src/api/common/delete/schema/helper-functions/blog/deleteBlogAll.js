
export default async function deleteBlogDetail(Delete, blogId) {
  // await Delete('BlogDetail', { blogId });
  // console.log('blogid in blod func', blogId);
  await Delete('BlogComment', { blogId: blogId.id });
  await Delete('BlogLike', { blogId: blogId.id });
  await Delete('Blog', blogId);
}
