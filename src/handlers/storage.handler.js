export const getItem = key => {
  return localStorage.getItem(key);
};

export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const dropDB = () => {
  localStorage.clear();
};

export const removeItem = key => {
  localStorage.removeItem(key);
};

export const removeAllKeyItemsThatInclude = str => {
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage
        .key(i)
        .toLowerCase()
        .includes(str.toLowerCase())
    ) {
      localStorage.removeItem(localStorage.key(i));
    }
  }
};
