import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

//custom handlers
import { decodeToken } from "../config/token.config";
import { getItem } from "../handlers/storage.handler";

//graphql queries
import { getCarByLotNo } from "../components/CarSearch/carSearch.graphql";

import typedefs from "./typedefs";
import resolvers from "./resolvers";

const httpLink = createHttpLink({ uri: "http://localhost:5000/" });

const authLink = setContext((_, { headers }) => {
  const tokenFromStorage = getItem("centerToken") || getItem("adminToken");
  const validToken =
    (tokenFromStorage && decodeToken(tokenFromStorage) && tokenFromStorage) ||
    null;
  return {
    headers: {
      ...headers,
      authorization: validToken || ""
    }
  };
});

export const cache = new InMemoryCache();

//initialize the cache from localStorage, on page load
const data = getItem("car");
if (data) {
  cache.writeQuery({ query: getCarByLotNo, data });
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typedefs,
  resolvers
});

export default client;
