export const getItem = key => {
  const result = localStorage.getItem(key);
  if (result) return JSON.parse(result);
  return null;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
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
