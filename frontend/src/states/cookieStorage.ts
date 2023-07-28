import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const cookieStorage = {
  getItem: (key: string, initialValue: any) => {
    try {
      const value = getCookie(key) as string;
      return JSON.parse(value);
    } catch (error) {
      return initialValue;
    }
  },
  setItem(key: string, value: any) {
    setCookie(key, value);
  },
  removeItem(key: string) {
    deleteCookie(key);
  },
};
