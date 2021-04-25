import { getUser, getBlog, getCourse, getCourseDetails, getOrganizationDetails } from './helper-functions';
import getPopular from '../../api/common/getPopular';
import getArchive from '../../api/common/search/getArchive';
import doSearch from '../../api/common/search/globalSearch';
import getUserBlogs from '../../api/common/getUserBlogs';
import validateToken from '../../auth/validateToken';

export default {
  getUser: async (contex, args) => {
    const { variables } = args.body;
    const res = getUser(variables);
    const userBlogsRes = getUserBlogs(res.id);
    const finalBlogs = userBlogsRes.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
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

  getArchive: async (contex, args) => {
    try {
      const { variables } = args.body;
      let user = {};
      if (variables.sessionId) {
        user = validateToken(variables.sessionId);
      }
      const archiveRes = await getArchive(user.id);
      const { basedOnHistory, popularOnPc } = archiveRes;
      const basedOnHistoryBlogs = basedOnHistory.blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
      const { blogs, users } = popularOnPc;
      const popularPcBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
      const popularPcUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
      const archives = { basedOnHistory: { blogs: basedOnHistoryBlogs }, popularOnPc: { blogs: popularPcBlogs, users: popularPcUsers } };
      return archives;
    } catch (e) {
      console.error(e);
    }
  },

  doSearch: async (context, args) => {
    // console.log('argument', args.body);
    const { variables } = args.body;
    const { keyword, country, industry, skill, sessionId } = variables;
    const searchRes = await doSearch(keyword, country, industry, skill, sessionId);
    // console.log('do search result', searchRes);
    const { blogs, users, popularUsers } = searchRes;
    const finalBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const finalUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
    const finalPopularUsers = popularUsers.map(u => ({ ...u.user, userDetail: u.userDetail }));
    // console.log('final popular users', finalPopularUsers);
    return { blogs: finalBlogs, users: finalUsers, popularUsers: finalPopularUsers };
  },

  getCourse: async (contex, args) => {
    // console.log('get course argument', args.body.variables);
    const { variables } = args.body;
    const courses = getCourse(variables);
    return courses;
  },

  getCourseDetails: async (context, args) => {
    const { variables } = args.body;
    const { courseId, sessionId } = variables;
    console.log('get COurse detais called', courseId, sessionId);
    const result = getCourseDetails(courseId, sessionId);
    return result;
  },

  getOrganizationDetails: async (context, args) => {
    const { variables } = args.body;
    console.log('getOrganizationDetails called', variables);
    const { orgId } = variables;
    const result = getOrganizationDetails(orgId);
    return result;
  },
};
