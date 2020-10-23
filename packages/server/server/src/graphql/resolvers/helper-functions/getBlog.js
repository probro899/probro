import findBlogDetails from '../../../api/common/findBlogDetails';

const timeStampSorting = (a, b) => {
  if (parseInt(a.timeStamp, 10) < parseInt(b.timeStamp, 10)) {
    return 1;
  }
  return -1;
};

export default function getBlog(variables) {
  // console.log('get blog caleld', variables);
  const blogRes = findBlogDetails(variables.blogSlug, variables.userSlug, true);
  const { blog, blogLike, blogComment, userDetails } = blogRes;
  const blogComments = blogComment.sort(timeStampSorting);

  return {
    ...blog,
    blogLike,
    blogComment: blogComments,
    userDetail: userDetails,
  };
}
