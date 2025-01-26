export const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  }
  return null;
};

export const setStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }
};

export const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  }
};
