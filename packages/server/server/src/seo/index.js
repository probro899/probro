import PathMatch from 'path-match';
import db from '../db';
import { siteURL } from '../../../webConfig.json';

export default async (url) => {
  const route = PathMatch({
    sensitive: true,
    strict: true,
    end: true,
  });

  const blogDetailPathMatchUrl = route('/blog/:id');

  const path = url['0'];
  const slug = url.param;
  const blogPathMatchRes = blogDetailPathMatchUrl(path);
  if (blogPathMatchRes) {
    const { id } = blogPathMatchRes;
    const currentBlog = await db.execute(async ({ findOne }) => {
      const result = await findOne('Blog', { slug });
      const userRes = await findOne('User', { slug: id });
      const coverImageUrl = `assets/user/${10000000 + userRes.id}/blog/${result.coverImage}`;
      return { ...result, coverImage: coverImageUrl };
    });
    const stringContent = currentBlog.content.replace(/<[^>]+>/g, '').slice(0, 200);
    return `<title>${currentBlog.title}</title>
    <meta property="og:image" content="${siteURL}/${currentBlog.coverImage}"/>
    <meta property="og:image:secure_url" content="${siteURL}/images/${currentBlog.coverImage}"/>
    <meta name="description" content="${stringContent}"/>`;
  }
  return '';
};
