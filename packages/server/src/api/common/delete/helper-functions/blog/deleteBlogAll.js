
export default async function deleteBlogDetail(Delete, blogId) {
  await Delete('BlogDetail', { blogId });
  await Delete('BlogComment', { blogId });
  await Delete('BlogLike', { blogId });
}
