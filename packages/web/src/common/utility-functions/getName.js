export default (user) => {
  let fullName = user.firstName;
  if (user.middleName) { fullName = fullName + ' ' + user.middleName; }
  fullName = fullName + ' ' + user.lastName;
  return fullName;
};
