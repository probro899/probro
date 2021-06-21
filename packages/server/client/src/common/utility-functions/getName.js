import { ENDPOINT } from '../../config';

export default (user) => {
  let fullName = user.firstName;
  if (user.middleName) { fullName = fullName + ' ' + user.middleName; }
  fullName = fullName + ' ' + user.lastName;
  return fullName;
};

const getProfileImage = (userDetail) => {
  return userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + userDetail.userId}/profile/${userDetail.image}` : '/assets/graphics/user.svg';
}

export { getProfileImage };
