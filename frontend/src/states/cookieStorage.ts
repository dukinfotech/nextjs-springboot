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
    setCookie(key, value, {
      maxAge: parseInt(process.env.APP_ACCESS_TOKEN_EXPIRE as string) || 360,
    });
  },
  removeItem(key: string) {
    deleteCookie(key);
  },
};
