/* eslint-disable no-case-declarations */
import getName from '../utility-functions/getName';

export default (match, relatedData) => {
  let header = {};
  const { path } = match;
  // console.log('content type', match, relatedData);
  switch (path) {
    case '/':
      header = {
        title: 'Proper Class | The Oneline Mentoring Open Platform',
      };
      break;
    case '/courses':
      header = {
        title: 'Top Courses In Nepal| Build Skill With Online Courses',
      };
      break;
    case '/archive':
      header = {
        title: 'Archive | Update Your Skill With Expert Blogs',
      };
      break;
    case '/search':
      header = {
        title: 'Find Mentor | Search And Start Learning With Expert',
      };
      break;
    case '/pricing':
      header = {
        title: 'Pricing | Find And Enroll Different Types Of Courses',
      };
      break;
    case '/user/:userId':
      const type = relatedData.type === 'verified' ? 'Mentor' : 'Student';
      header = {
        title: `${getName(relatedData)} | ${type} At Proper Class`,
      };
      break;
    case '/blog/:userSlug/:blogSlug':
      const { description, title } = relatedData;
      header = {
        title,
        description,
      };
      break;
    case '/course/:courseSlug':
      header = {
        title: relatedData.title,
        description: relatedData.description,
      };
      break;
    case '/about':
    case '/business':
    case '/services':
    case '/privacy-policy':
    case '/terms-and-conditions':
    case '/report':
    case '/support':
      header = {
        title: `${relatedData.title}  | Proper Class`,
      };
      break;

    case '/career':
      header = {
        title: 'Build Your Career With Proper Class',
      };
      break;
    default:
      header = {};
  }

  header.description = header.description || `The ProperClass is a open platform for mentors who want to provide metorship and the students those who are aiming for scale up their skills.
  It provides all type of supporting tools that's needed for proper mentorship inlcuding communication, bloging, whiteboard, project managment and appointment etc`;
  header.keywords = header.keywords || 'online mentoring, mentor in nepal, learn course ,develop skills, blogs';
  header.title = header.title || '';
  return header;
};
