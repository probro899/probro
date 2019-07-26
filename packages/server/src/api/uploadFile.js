export default (record) => {
  console.log('upload image api called', record);
  return record.image;
};
