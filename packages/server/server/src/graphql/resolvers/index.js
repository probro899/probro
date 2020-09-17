import { getUser, getBlog } from './helper-functions';
import getPopular from '../../api/common/getPopular';
import getArchive from '../../api/common/search/getArchive';
import doSearch from '../../api/common/search/globalSearch';

export default {
  getUser: async (contex, args) => {
    const { variables } = args.body;
    return {
      ...getUser(variables),
    };
  },

  getBlog: async (contex, args) => {
    const { variables } = args.body;
    const res = getBlog(variables);
    return {
      ...res,
    };
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
    const { variables } = args.body;
    const { keyword, country, industry } = variables;
    const searchRes = await doSearch(keyword, country, industry);
    const { blogs, users } = searchRes;
    const finalBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const finalUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
    return { blogs: finalBlogs, users: finalUsers };
  },
};
