import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import db from '../../db';
import findBlogDetails from './findBlogDetails';
import findUserDetails from './findUserDetails';

const sliderDirectory = path.join(__dirname, '..', '..', 'public', 'images', 'slider');
const bannerImagesDir = path.join(__dirname, '..', '..', 'public', 'images', 'banner');

export default async () => {
  const sliderImages = fs.readdirSync(sliderDirectory);
  const bannerImages = fs.readdirSync(bannerImagesDir);
  const dataRes = await db.execute(async ({ find }) => {
    const publishBlogs = await find('Blog', { saveStatus: 'publish' });
    const allBlogDetailPromises = [];
    publishBlogs.forEach(b => allBlogDetailPromises.push(findBlogDetails(b.id, b.userId)));
    const allBlogDetail = await Promise.all(allBlogDetailPromises);
    console.log('allBlogDetail', allBlogDetail);
    const uniqBlogUserId = lodash.uniq(publishBlogs.map(b => b.userId));
    const createdBlogCount = [];
    uniqBlogUserId.forEach((id) => {
      createdBlogCount.push(publishBlogs.filter(b => b.userId === id).length);
    });

    const blogs = publishBlogs.map((blog, idx) => ({ blog, ...allBlogDetail[idx] })).sort((a, b) => {
      if ((a.blogLike.length + a.blogComment) > (b.blogLike + b.blogComment)) {
        return -1;
      }
      return 1;
    });

    // console.log('uniquser = ', uniqBlogUserId, 'createdBlogCount', createdBlogCount);
    const indexUserId = uniqBlogUserId.map((uid, idx) => ({ id: uid, count: createdBlogCount[idx] })).sort((a, b) => a > b ? 1 : -1).slice(0, 9);
    const allUserDetailsPromises = [];
    indexUserId.forEach(obj => allUserDetailsPromises.push(findUserDetails(obj.id)));
    const allIndexUsers = await Promise.all(allUserDetailsPromises);
    // console.log('indexUserId', indexUserId);
    return { blogs, indexUserList: allIndexUsers };
  });
  return { sliderImages, bannerImages, archive: dataRes.blogs, indexUsers: dataRes.indexUserList };
};
