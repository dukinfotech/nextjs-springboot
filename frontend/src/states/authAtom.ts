import UserEntity from "@/entities/UserEntity";
import { atomWithStorage } from "jotai/utils";
import { cookieStorage } from "./cookieStorage";

export const accessTokenAtom = atomWithStorage<string>(
  "accessToken",
  "",
  cookieStorage
);

export const userInfoAtom = atomWithStorage<UserEntity | null>(
  "userInfo",
  null,
  cookieStorage
);
