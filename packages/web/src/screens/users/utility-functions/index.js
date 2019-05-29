const sorting = (a, b) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 1;
};

export default sorting;
