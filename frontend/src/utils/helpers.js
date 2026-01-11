// Session & local storage helpers

export const setSessionData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionData = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeSessionData = (key) => {
  sessionStorage.removeItem(key);
};

export const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeLocalData = (key) => {
  localStorage.removeItem(key);
};
