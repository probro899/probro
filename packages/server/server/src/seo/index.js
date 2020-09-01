import db from '../db';
import { siteURL } from '../../../webConfig.json';

export default async (url) => {
const path = url['0'];
const slug = url.param;
// console.log('path and url', path, slug);
if (path === '/details') {
  const id = parseInt(slug.split('-')[1], 10);
  const currentProductDetails = await db.execute(async({ findOne }) => {
    const result = await findOne('ServiceTypeBrandModel', { id });
    return result;
  })

  // for new product details meta tags
  return  `<title>${currentProductDetails.name}</title>
            <meta property="og:image" content="${siteURL}/model_image/${currentProductDetails.image}" />
            <meta property="og:image:secure_url" content="${siteURL}/model_image/${currentProductDetails.image}"/>
            <meta name="description" content="${currentProductDetails.name}" />`
  }


  // for news meta tags
  if (path === '/news-details') {
    const id = parseInt(slug.split('-')[1], 10);
    const currentNews = await db.execute(async({ findOne }) => {
      const result = await findOne('News', { slug });
      return result;
    });
    return  `<title>${currentNews.header}</title>
    <meta property="og:image" content="${siteURL}/images/${currentNews.image}"/>
    <meta property="og:image:secure_url" content="${siteURL}/images/${currentNews.image}"/>
    <meta name="description" content="${currentNews.header}"/>`;
  }

  // for used product details meta tags
  if (path === '/used-vehicle/details') {
    const currentVehicle = await db.execute(async({ findOne }) => {
      const result = await findOne('SellVehicle', { slug });
      return result;
    });
    return  `<title>${currentVehicle.model}</title>
    <meta property="og:image" content="${siteURL}/images/${currentVehicle.image1}"/>
    <meta property="og:image:secure_url" content="${siteURL}/images/${currentVehicle.image1}"/>
    <meta name="description" content="${currentVehicle.variant}"/>`;
  }

  return ''
}
