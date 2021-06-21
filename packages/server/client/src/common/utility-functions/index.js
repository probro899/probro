import getName from './getName';
import { getProfileImage } from './getName';
import matchUrl from './matchUrl';
import uploadFile from './uploadFile';
import getDeviceType from './getDeviceType';
import newLineSolver from './newLineSolver';


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
  if (parseInt(a.timeStamp, 10) < parseInt(b.timeStamp, 10)) {
    return 1;
  }
  return -1;
};

const reverseTimestampSort = (a, b) => {
  // this receives the integer inputs
  if (a.timeStamp < b.timeStamp) {
    return 1;
  }
  return -1;
}

// for normal timestamp (message type)
const normalTimeStampSorting = (a, b) => {
  if (a.timeStamp > b.timeStamp) {
    return 1;
  }
  return -1;
};

const activitySorting = (a, b) => {
  if (parseInt(a.lastActivity, 10) < parseInt(b.lastActivity, 10)) {
    return 1;
  }
  return -1;
}

export { reverseTimestampSort, timeStampSorting, uploadFile, getDeviceType, matchUrl, normalTimeStampSorting, getName, getProfileImage, activitySorting, newLineSolver };
