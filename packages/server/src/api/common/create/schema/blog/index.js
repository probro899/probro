/* eslint-disable import/no-cycle */
import add from '../../add';

async function addBlog(record) {
  const arrOfTitleWord = `${record.title}`.split(' ');
  console.log('Array of Title', arrOfTitleWord);
  const arrOfTitleWordLowerCase = arrOfTitleWord.map(w => w.toLowerCase());
  console.log('arrof title word lower case', arrOfTitleWordLowerCase);
  const slugWord = arrOfTitleWordLowerCase.reduce((slug, w) => {
    slug = `${slug}-${w}`;
    return slug;
  }, '');
  const tempSlug = slugWord.slice(1);
  const slug = `${tempSlug}-${Date.now()}`;
  const res = await add.call(this, 'Blog', { ...record, slug });
  return res;
}

async function addBlogComment(record) {
  const res = await add.call(this, 'BlogComment', record);
  return res;
}

async function addBlogLike(record) {
  const res = await add.call(this, 'BlogLike', record);
  return res;
}

export default [
  addBlog,
  addBlogComment,
  addBlogLike,
];
