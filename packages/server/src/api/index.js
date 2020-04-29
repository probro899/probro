/* eslint-disable import/no-cycle */
import { createScope } from '../socket';
import logout from './common/logout';
import updateUserDetails from './common/updateUserDetails';
import initUser from './initializers/initUser';
import findBoardDetail from './common/findBoradDetail';
import findBlogDetail from './common/findBlogDetails';
import addHandlerApi from './common/create';
import deleteHandler from './common/delete';
import updateHandler from './common/update';
import getHandler from './common/get';
import { createOffer, createAnswer, addICeCandidate, callClose, callStatusChange, onPcStatusChange, commPingPong } from './common/web-rtc';

const mentor = createScope('Mentor', () => {

});

const mentee = createScope('Mentee', () => {

});
// all create api scoping
addHandlerApi.forEach(func => mentor(func));
addHandlerApi.forEach(func => mentee(func));

// all delete api scoping
deleteHandler.forEach(func => mentee(func));
deleteHandler.forEach(func => mentor(func));

// all update api scoping
updateHandler.forEach(func => mentee(func));
updateHandler.forEach(func => mentor(func));

// all get api scoping
getHandler.forEach(func => mentee(func));
getHandler.forEach(func => mentor(func));

mentor(createOffer);
mentor(createAnswer);
mentor(addICeCandidate);
mentor(callClose);
mentor(callStatusChange);
mentor(onPcStatusChange);
mentor(commPingPong);

mentee(createOffer);
mentee(createAnswer);
mentee(addICeCandidate);
mentee(callClose);
mentee(callStatusChange);
mentee(onPcStatusChange);
mentee(commPingPong);

mentor(logout);
mentor(updateUserDetails);

mentee(logout);
mentee(updateUserDetails);

export { updateUserDetails, logout, initUser, findBoardDetail, findBlogDetail };
