import { getPackage, getUser, getBlog, getCourse, getCourseDetails, getOrganizationDetails, getCourseSearch, getBlogSearch } from './helper-functions';
import getPopular from '../../api/common/getPopular';
import getArchive from './helper-functions/getArchive';
import doSearch from '../../api/common/search/globalSearch';
import getUserBlogs from '../../api/common/getUserBlogs';

export default {
  getUser: async (contex, args) => {
    // console.log('Get user called', args.body);
    const { variables } = args.body;
    const res = getUser(variables);
    const userBlogsRes = getUserBlogs(res.id);
    const userCourses = getCourse(res.id);
    let popularMentors = [];
    if (userBlogsRes.length === 0 && userCourses.length === 0) {
      const popularRes = await getPopular();
      const { users } = popularRes;
      popularMentors = users.filter(u => u.user.id !== res.id);
      popularMentors = popularMentors.map(u => ({ ...u.user, userDetail: u.userDetail }));
    }

    const finalBlogs = userBlogsRes.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    return { ...res, blogs: finalBlogs, courses: userCourses, popularMentors };
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
      const { sessionId } = variables;
      const archives = getArchive(sessionId);
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
    const { users, popularUsers, organizations } = searchRes;
    // const finalBlogs = blogs.map(b => ({ ...b.blog, blogLike: b.blogLike, blogComment: b.blogComment }));
    const finalUsers = users.map(u => ({ ...u.user, userDetail: u.userDetail }));
    const finalPopularUsers = popularUsers.map(u => ({ ...u.user, userDetail: u.userDetail }));
    // console.log('final popular users', finalPopularUsers);
    return { organizations, users: finalUsers, popularUsers: finalPopularUsers };
  },

  getCourse: async (contex, args) => {
    // console.log('get course argument', args.body.variables);
    const { variables } = args.body;
    const courses = getCourse();
    return courses;
  },

  getCourseDetails: async (context, args) => {
    const { variables } = args.body;
    const { courseId, sessionId } = variables;
    const result = getCourseDetails(courseId, sessionId);
    return result;
  },

  getOrganizationDetails: async (context, args) => {
    const { variables } = args.body;
    const { orgId, sessionId } = variables;
    const result = getOrganizationDetails(orgId, sessionId);
    return result;
  },

  getPackage: async (contex, args) => {
    const { variables } = args.body;
    const packages = await getPackage(variables);
    return packages;
  },

  getSummary: async () => {
    return {
      noOfCourses: 10,
      noOfMentors: 50,
      noOfReviews: 100,
    };
  },

  getOurPartner: async () => {
    return [
      {
        logo: 'https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo1.png',
      },
      {
        logo: 'https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo2.png',
      },
      {
        logo: 'https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo3.png'
      },
    ];
  },

  courseSearch: async (context, args) => {
    const { variables } = args.body;
    const { keyword, sessionId } = variables;
    const result = getCourseSearch(keyword, sessionId);
    return result;
  },

  blogSearch: async (context, args) => {
    const { variables } = args.body;
    const { keyword, sessionId, topic } = variables;
    const result = getBlogSearch(keyword, topic, sessionId);
    return result;
  },
};
