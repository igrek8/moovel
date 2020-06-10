const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { IntrospectionFragmentMatcher } = require("apollo-cache-inmemory");

const introspectionQueryResultData = require("./fragment-types.json");

/**
 * https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
 */

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const link = createHttpLink({
  fetch,
  uri: process.env.GUTHUB_API_URI,
  headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ fragmentMatcher }),
});

module.exports = client;
