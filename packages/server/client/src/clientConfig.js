import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import webConfig from '../../webConfig.json';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
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
