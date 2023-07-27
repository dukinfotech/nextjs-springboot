import UserEntity from "@/entities/UserEntity";
import { atom } from "jotai";

export type AuthAtom = {
  accessToken: string;
  userInfo: UserEntity | null;
};

export const authAtom = atom<AuthAtom>({
  accessToken: "",
  userInfo: null,
});
