// ===============================
// Session Storage Helpers
// ===============================

export const setSessionData = (key, value) => {
  if (typeof value === "string") {
    sessionStorage.setItem(key, value); // direct string
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionData = (key) => {
  const data = sessionStorage.getItem(key);
  try {
    return JSON.parse(data); // object/string dono kaam karega
  } catch {
    return data; // agar already string hai
  }
};


export const removeSessionData = (key) => {
  sessionStorage.removeItem(key);
};

// ===============================
// Local Storage Helpers
// ===============================

export const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Local storage parse error:", err);
    return null;
  }
};

export const removeLocalData = (key) => {
  localStorage.removeItem(key);
};
