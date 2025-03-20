export const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      // First check sessionStorage
      let item = window.sessionStorage.getItem(key);

      // If not found in sessionStorage, check localStorage as fallback
      if (!item) {
        item = window.localStorage.getItem(key);
      }

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error accessing storage:", error);
      return null;
    }
  }
  return null;
};

export const setStorageItem = (
  key: string,
  value: unknown,
  rememberMe = false
) => {
  if (typeof window !== "undefined") {
    try {
      // Always set in sessionStorage
      window.sessionStorage.setItem(key, JSON.stringify(value));

      // If rememberMe is true, also set in localStorage
      if (rememberMe) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting storage:", error);
    }
  }
};

export const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      // Remove from both storage types
      window.sessionStorage.removeItem(key);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing storage item:", error);
    }
  }
};
