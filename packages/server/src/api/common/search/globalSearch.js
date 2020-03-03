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

export default async (keyword, country, industry) => {
  console.log('search keyword in search api', keyword, country, industry);
  const keywordArrtemp = keyword.split(' ');
  // console.log('all keyword', keywordArrtemp);
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  // console.log('keywordArr', keywordArr);
  let finalBlogDetals;
  const res = await db.execute(async ({ exec }) => {
    if (!country && !industry) {
      const allBlogResult = await exec(`SELECT * FROM Blog WHERE title LIKE '%${keyword}%' AND [saveStatus]=?`, ['publish']);
      const allBologDetailsPrmises = [];
      allBlogResult.forEach(b => allBologDetailsPrmises.push(findBlogDetails(b.id, b.userId)));
      const allBlogDetails = await Promise.all(allBologDetailsPrmises);
      finalBlogDetals = allBlogResult.map((blog, idx) => ({ blog, ...allBlogDetails[idx] }));
    }

    // console.log('Search Resuslt for Blog', allBlogResult);
    const allUserResultPromises = [];
    const userDetailsPromises = [];
    const userSkillPromises = [];
    const userCarrierInterestPromises = [];
    const userDetailCountryPromises = [];
    if (industry) {
      userCarrierInterestPromises.push(exec(`SELECT * FROM UserSkill WHERE skill LIKE '%${industry}'`, []));
      userCarrierInterestPromises.push(exec(`SELECT * FROM UserCarrierInterest WHERE interest LIKE '%${industry}'`, []));
    }

    if (country) {
      userDetailCountryPromises.push(exec(`SELECT * FROM UserDetail WHERE country LIKE '%${country}'`, []));
    }

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

    const userCarrierInterestResult = await Promise.all(userCarrierInterestPromises);

    const userDetailCountryResult = await Promise.all(userDetailCountryPromises);

    const keywordUsers = lodash.uniq([
      ...flat(userResult).map(u => u.id),
      ...flat(userDetailsResult).map(u => u.userId),
      ...flat(userSkillResult).map(u => u.userId),
    ]);

    console.log('keyword User list', keywordUsers);
    // console.log('All uniq user', uniqUsers);
    const countryAndIndustryUserList = lodash.uniq([
      ...flat(userCarrierInterestResult).map(u => u.userId),
      ...flat(userDetailCountryResult).map(u => u.userId),
    ]);

    const finalUsers = [];
    countryAndIndustryUserList.forEach((uid) => {
      finalUsers.push(keywordUsers.find(id => id === uid));
    });

    console.log('final user list', finalUsers, countryAndIndustryUserList);
    const finalUserListPromises = [];
    finalUsers.filter(u => u).forEach(id => finalUserListPromises.push(findUserDetail(id, 'all')));
    const finalUserList = await Promise.all(finalUserListPromises);

    // console.log('final User Result', finalUserList);
    return { blogs: finalBlogDetals || [], users: finalUserList };
  });
  console.log('search response', res);
  return res;
};
