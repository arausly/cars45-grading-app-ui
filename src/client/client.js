import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

//custom handlers
import { decodeToken } from "../config/token.config";

const httpLink = createHttpLink({ uri: "http://localhost:5000/" });

const authLink = setContext((_, { headers }) => {
  const tokenFromStorage =
    localStorage.getItem("centerToken") || localStorage.getItem("adminToken");
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
