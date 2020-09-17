import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import webConfig from '../../webConfig.json';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};


const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `${webConfig.siteURL}/graphql`,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});
export default client;
