import { getItem, dropDB } from "../handlers/storage.handler";

/** client logout by clearing token from local-storage **/
const logout = () => {
  dropDB();
  window.location.href = "/login";
};

//jwt token is accompanied with the header, payload and signature
//payload has the expiration date and any other data sent with it.
// if the current time is less than the expiration date then, token is still valid else, it is falsy
export const decodeToken = token => {
  const payload = token.split(".")[1];

  // Decoded token
  const decoded = JSON.parse(window.atob(payload));

  const currentTime = Date.now() / 1000;

  if (currentTime > decoded.exp) {
    logout();
    return false;
  }

  return decoded;
};

// checks if a token exists else has a centerToken
export const isAuthenticated = token => {
  const userToken = token || getItem("centerToken");

  if (!userToken) {
    return false;
  }

  return decodeToken(userToken);
};

// checks if the token is a center, with inspector credentials
export const isCenter = token => {
  let decoded;
  token ? (decoded = isAuthenticated(token)) : (decoded = isAuthenticated());

  if (!decoded) {
    return false;
  }

  const filtered = decoded.groups.filter(group => /^inspector.ng/.test(group));
  return filtered.length > 0;
};

export const isAdminAuthenticated = token => {
  const adminToken = token || getItem("adminToken");

  if (!adminToken) {
    return false;
  }

  return decodeToken(adminToken);
};

export const isAdmin = token => {
  let decoded;
  token
    ? (decoded = isAdminAuthenticated(token))
    : (decoded = isAdminAuthenticated());

  if (!decoded) {
    return false;
  }

  const filtered = decoded.groups.filter(group => /^sales.ng/.test(group));
  return filtered.length > 0;
};

export const isMixed = token => {
  let decoded;
  token
    ? (decoded = isAdminAuthenticated(token) || isAuthenticated(token))
    : (decoded = isAdminAuthenticated() || isAuthenticated());

  if (!decoded) {
    return false;
  }

  const filtered = decoded.groups.filter(
    group => /^sales.ng/.test(group) || /^inspector.ng$/.test(group)
  );

  return filtered.length > 0;
};

/**notes */
// there should be only one token per user
// future look of this file, should point to one method ascertaining if there is a token or not.
