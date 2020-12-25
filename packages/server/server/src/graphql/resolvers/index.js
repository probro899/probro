import { getUser, getBlog } from './helper-functions';
import getPopular from '../../api/common/getPopular';
import getArchive from '../../api/common/search/getArchive';
import doSearch from '../../api/common/search/globalSearch';
import getUserBlogs from '../../api/common/getUserBlogs';

export default {
  getUser: async (contex, args) => {
    const { variables } = args.body;
    const res = getUser(variables);
    const userBlogsRes = getUserBlogs(res.id);
    const finalBlogs = userBlogsRes.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    console.log('res in getUSer', res);
    return { ...res, blogs: finalBlogs };
  },

  getBlog: async (contex, args) => {
    const { variables } = args.body;
    const res = getBlog(variables);
    return res;
  },

  getPopular: async () => {
    const getPopularRes = await getPopular();
    const { blogs, users } = getPopularRes;
    return {
      blogs: blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment })),
      users: users.map(u => ({ ...u.user, userDetail: u.userDetail })),
    };
  },

  getArchive: async () => {
    const archiveRes = await getArchive();
    const { basedOnHistory, popularOnPc } = archiveRes;
    const basedOnHistoryBlogs = basedOnHistory.blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const { blogs, users } = popularOnPc;
    const popularPcBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const popularPcUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
    const archives = { basedOnHistory: { blogs: basedOnHistoryBlogs }, popularOnPc: { blogs: popularPcBlogs, users: popularPcUsers } };
    return archives;
  },

  doSearch: async (context, args) => {
    // console.log('argument', args.body);
    const { variables } = args.body;
    const { keyword, country, industry, skill } = variables;
    const searchRes = await doSearch(keyword, country, industry, skill);
    // console.log('do search result', searchRes);
    const { blogs, users, popularUsers } = searchRes;
    const finalBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const finalUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
    const finalPopularUsers = popularUsers.map(u => ({ ...u.user, userDetail: u.userDetail }));
    // console.log('final popular users', finalPopularUsers);
    return { blogs: finalBlogs, users: finalUsers, popularUsers: finalPopularUsers };
  },
};
