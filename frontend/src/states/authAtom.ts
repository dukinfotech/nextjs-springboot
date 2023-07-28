import UserEntity from "@/entities/UserEntity";
import { atomWithStorage } from "jotai/utils";
import { cookieStorage } from "./cookieStorage";

export type AuthType = {
  accessToken: string;
  userInfo: UserEntity | null;
};

export const authAtom = atomWithStorage<AuthType>(
  "auth", // key of cookie
  {
    accessToken: "",
    userInfo: null,
  },
  cookieStorage
);
