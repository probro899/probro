import login from './request-handler/login';
import userRegistration from './request-handler/userRegistration';
import userVerification from './request-handler/userVerification';
import updateUserDetails from './request-handler/updateUserDetails';
import fetchInitialData from './request-handler/fetchInitialData';

export default function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post('/auth/login', login);
  app.post('/auth/verification', userVerification);
  app.post('/auth/user-registration', userRegistration);
  app.post('/web/update-user-details', updateUserDetails);
  app.get('/web/fetch-initial-data', fetchInitialData);
}
