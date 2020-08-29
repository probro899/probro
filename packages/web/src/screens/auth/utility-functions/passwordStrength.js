const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export default (value) => {
  if (strongRegex.test(value)) {
    return 'strong';
  }
  if (mediumRegex.test(value)) {
    return 'medium';
  }
  return 'weak';
};
