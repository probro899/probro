
export default async (data, apis) => {
  console.log('add and update video description called', data, apis);
  const res = await apis.addVideoDescription(data);
  console.log('video des add res', res);
}