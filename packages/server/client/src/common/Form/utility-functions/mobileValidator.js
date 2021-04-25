const MOBILE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{3,4})(?: *x(\d+))?\s*$/;

export default (value) => {
  if (MOBILE_REGEX.test(value)) {
    return true;
  }
  return false;
};
