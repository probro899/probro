import 'babel-polyfill';
import 'isomorphic-unfetch';
import express from 'express';
import http from 'http';
import { graphqlHTTP } from 'express-graphql';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { ApolloProvider } from '@apollo/client';
import cors from 'cors';
import run from 'app-node';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import webConfig from './webConfig.json';
import { init as dbinit } from './server/src/db';
import AppComponent from './client/src/App';
import HTML from './client/src/renderer';
import store from './client/src/store';
import authExpress from './server/src/express';
import schema from './server/src/graphql/schema';
import resolvers from './server/src/graphql/resolvers';
import SeoDataProvider from './server/src/seo/index';
import initCachDB from './server/src/cache/database/initCacheDB';
import { start } from './server/src/socket';
import validateToken from './server/src/auth/validateToken';
import { initUser } from './server/src/api';
import client from './client/src/clientConfig';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(
  cors({
    origin: `${webConfig.siteURL}`,
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/', express.static('build/public'));
try {
  run(async () => {
    // Initializing Sqlite Database
    await dbinit();

    // Initializing cache database
    initCachDB();

    // Gaphql handler intialization
    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true,
    }));

    // Socket initialization with authentication
    const server = http.createServer(app);
    app.get('/shocked/web/:token', () => {
      const url = '/shocked/:origin/:token';
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
            // session.dispatch({ type: 'LOGIN', payload: user });
            // return socket to evrything is ok
            return true;
          } catch (err) {
            session.dispatch({ type: 'LOGOUT' });
            session.emit('logout');
            // return socket user not validated
            return false;
          }
        }
      });
    });

    // Handling all the get Request from apolo client
    app.get(['*/:param', '*'], (req, res) => {
      const urlParam = req.params.param ? req.params.param : null;
      const context = {
        urlParam,
      };

      // The client-side App will instead use <BrowserRouter>
      const App = (
        <ApolloProvider client={client}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <AppComponent />
            </StaticRouter>
          </Provider>
        </ApolloProvider>
      );

      // Handle queries etc.. before sending raw html
      getDataFromTree(App).then(async () => {
        const content = ReactDOM.renderToString(App);
        const helmet = Helmet.renderStatic();
        const SEO = await SeoDataProvider(req.params);
        // console.log('final seo tag', SEO);
        const initialState = client.extract();
        // console.log('FETCH URL', req.params);
        const html = <HTML content={content} state={initialState} helmet={helmet} seo={SEO} />;
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
      });
    });

    authExpress(app);
    server.listen(PORT, () => console.log(`App running on port ${PORT}`));
  });
} catch (e) {
  console.error(e);
}
