import { atom } from "jotai";

export type RootAtom = {
  isShowSidebar: boolean;
};

export const rootAtom = atom<RootAtom>({
  isShowSidebar: true,
});
