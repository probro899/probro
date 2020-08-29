import express from 'express';
import https from 'https';
import compression from 'compression';
import http from 'http';
import run from 'app-node';
import fs from 'fs';
import bodyParser from 'body-parser';
import authExpress from './express';
import { init as dbinit } from './db';
import { start } from './socket';
import validateToken from './auth/validateToken';
import { initUser } from './api';
import initCachDB from './cache/database/initCacheDB';

// const port = process.env.PORT || 443;
const port = process.env.PORT || 4001;
const app = express(compression());
// app.use((req, res, next) => {
//   if (!req.secure && req.hostname === 'properclass.com' && req.get('X-Forwarded-Proto') === 'http') {
//     res.redirect(301, `https://${req.get('Host')}${req.url}`);
//   } else {
//     next();
//   }
// });

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/properclass.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/properclass.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/properclass.com/chain.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca,
// };

// const server = https.createServer(credentials, app);
const server = http.createServer(app);
run(async (nodeApp) => {
  // define web socket url
  const url = '/shocked/:origin/:token';
  // initialise database
  await dbinit();
  // initialise cache database
  initCachDB();

  // starting socket
  const socket = start({ server, url }, async (session) => {
    const { origin, token } = session.params;
    if (origin === 'web') {
      try {
        // validate user either login or not
        const user = validateToken(token);

        // set the user in session
        session.set('user', user);
        await initUser.call({ session }, user.id);
        // send data to client loginSuccess
        session.dispatch({ type: 'LOGIN', payload: user });

        // return socket to evrything is ok
        return true;
      } catch (err) {
        console.log('error', err);
        session.dispatch({ type: 'LOGOUT' });
        session.emit('logout');
        // return socket user not validated
        return false;
      }
    }
  });

  // setup authentication route
  authExpress(app);

  // Start listening for http request
  server.listen(port);
  console.log(`Server Sarted at ${port} `);
  // Setup exit for socket and server
  nodeApp.addExitHandler(() => {
    socket.stop();
    server.close();
  });
});
