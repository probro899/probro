
export default (data, userId) => {
  const formatedData = data.map(arr => arr.filter(ba => ba.userId === userId));
  return formatedData.map(arr => arr.length);
};
