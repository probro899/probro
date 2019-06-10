// for sorting both position as well as timestamp
const posSorting = (a, b) => {
  if (a.position > b.position) {
    return 1;
  }
  if (a.position < b.position) {
    return -1;
  }
};

export default posSorting;

// for sorting timestamp reverse

const timeStampSorting = (a, b) => {
  if (a.timeStamp < b.timeStamp) {
    return 1;
  }
  return -1;
};

export { timeStampSorting };
