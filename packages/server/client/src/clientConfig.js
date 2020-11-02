import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import webConfig from '../../webConfig.json';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `${webConfig.siteURL}/graphql`,
    credentials: 'same-origin',
  }),
});
export default client;
