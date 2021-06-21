import Sitemap from 'react-router-sitemap';
import routes from './router';
import databaseCache from '../server/src/cache/database/cache';

async function makeConfigFile() {
  const { props } = routes;
  let { children } = props;

  const configs = [];
  const allData = [];
  children = children || [];

  children.filter((r) => r.props.schema).forEach((r, idx) => {
    if (r.props.schema) {
      // console.log('schema', r.props.schema);
      const { schema } = r.props;
      if (schema === 'Blog') {
        // userSlug/:blogSlug
        let blogs = databaseCache.get('Blog') 
        if (blogs) {
          blogs = blogs.filter(b => b.saveStatus === 'publish' && !b.deleteStaus);
          const blogWithUserSlug = blogs.map(b => ({ blogSlug: b.slug, userSlug: databaseCache.get('User').find(u => u.id === b.userId).slug }));
          allData.push(blogWithUserSlug);
          configs.push(r.props);
        }
      }

      if (schema === 'User') {
        let users = databaseCache.get('User');
        if (users) {
          users = users.map(u => ({ userId: u.slug }));
          allData.push(users);
          configs.push(r.props);
        }
      }

      if (schema === 'Organization') {
        // :orgId
        let organization = databaseCache.get('Organization');
        if (organization) {
          organization = organization.filter(o => o.slug && !o.deleteStatus).map(o => ({ orgId: o.slug }));
          allData.push(organization);
          configs.push(r.props);
        }
      }

      if (schema === 'Course') {
        // /course/:courseId/:topic
        let courses = databaseCache.get('Course');
        if (courses) {
          courses = courses.filter(c => c.status === 'publish' && !c.deleteStatus).map(c => ({ courseId: c.id, topic: ['about', 'instructors', 'syllabus', 'reviews'] }));
          allData.push(courses);
          configs.push(r.props);
        }
      }
    }
  });

  // console.log('all Data', configs, allData);
  const paramsConfig = configs.reduce((obj, r, idx) => {
    obj[r.path] = allData[idx];
    return obj;
  }, {});
  // console.log('paramsConfig', paramsConfig);
  return paramsConfig;
}

export default async function createSiteMap() {
  const paramsConfig = await makeConfigFile();
  const sitemap = new Sitemap(routes)
    .applyParams(paramsConfig)
    .build('https://properclass.com')
    .save('./build/public/sitemap.xml');
}
