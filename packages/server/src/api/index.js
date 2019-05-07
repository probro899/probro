import { createScope } from '../socket';
import userRegistration from './userRegistration';
import logout from './logout';
import updateUserDetails from './updateUserDetails';
import switchUser from './switchUser';

const mentor = createScope('Mentor', () => {

});

const mentee = createScope('Mentee', () => {

});

mentor(logout);
mentor(updateUserDetails);

mentee(logout);
mentee(updateUserDetails);

export { updateUserDetails, logout, switchUser, userRegistration };
