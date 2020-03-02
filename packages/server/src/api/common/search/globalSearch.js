import lodash from 'lodash';
import db from '../../../db';
import findUserDetail from '../findUserDetails';
import findBlogDetails from '../findBlogDetails';

const flat = (arr) => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

// Todo make baninary tree for searching it is expensive for now it is ok

export default async (keyword) => {
  console.log('search keyword in search api', keyword);
  const keywordArrtemp = keyword.split(' ');
  // console.log('all keyword', keywordArrtemp);
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  // console.log('keywordArr', keywordArr);
  const res = await db.execute(async ({ exec }) => {
    const allBlogResult = await exec(`SELECT * FROM Blog WHERE title LIKE '%${keyword}%' AND [saveStatus]=?`, ['publish']);
    const allBologDetailsPrmises = [];
    allBlogResult.forEach(b => allBologDetailsPrmises.push(findBlogDetails(b.id, b.userId)));
    const allBlogDetails = await Promise.all(allBologDetailsPrmises);
    const finalBlogDetals = allBlogResult.map((blog, idx) => ({ blog, ...allBlogDetails[idx] }));
    // console.log('Search Resuslt for Blog', allBlogResult);
    const allUserResultPromises = [];
    const userDetailsPromises = [];
    const userSkillPromises = [];
    keywordArr.forEach((k) => {
      allUserResultPromises.push(exec(`SELECT firstName, id, lastName, middleName, email FROM User WHERE (firstName || lastName) LIKE '%${k}%'`, []));
      userDetailsPromises.push(exec(`SELECT * FROM UserDetail WHERE address LIKE '%${k}'`, []));
      userSkillPromises.push(exec(`SELECT * FROM UserSkill WHERE skill LIKE '%${k}'`, []));
    });
    const userResult = await Promise.all(allUserResultPromises);
    // console.log('userResult', userResult);
    const userDetailsResult = await Promise.all(userDetailsPromises);
    // console.log('userDetail', userDetailsResult);
    const userSkillResult = await Promise.all(userSkillPromises);
    // console.log('userSkill', userSkillResult);

    const uniqUsers = lodash.uniq([...flat(userResult).map(u => u.id), ...flat(userDetailsResult).map(u => u.userId), ...flat(userSkillResult).map(u => u.userId)]);
    // console.log('All uniq user', uniqUsers);

    const finalUserListPromises = [];
    uniqUsers.forEach(id => finalUserListPromises.push(findUserDetail(id, 'all')));
    const finalUserList = await Promise.all(finalUserListPromises);

    // console.log('final User Result', finalUserList);
    return { blogs: finalBlogDetals, users: finalUserList };
  });
  console.log('search response', res);
  return res;
};
