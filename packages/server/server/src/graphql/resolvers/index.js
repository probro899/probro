import { getSchema } from './helper-functions';

const dummyData = [{ id: 1, brandName: 'test', sId: 1, stypeId: 1, brandImageUrl: 'test' }]

export default {
  getBrandList: async () => {
    const res = dummyData;
    return res;
  },
  getModelList: async () => {
    const res = await getSchema('ServiceTypeBrandModel');
    const resWithVarient = res.map(m => ({
      ...m,
      varients: getSchema('ServiceTypeBrandModelVarient', {modelId: m.id})
    }
    ));
    return resWithVarient;
  },

  getVarientList: async () => {
    const res = await getSchema('ServiceTypeBrandModelVarient');
    return res;
  },

};
