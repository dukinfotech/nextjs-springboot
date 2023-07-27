"use client";

import Navbar from "../Navbar/Navbar";
import { useAtomValue } from "jotai";
import { rootAtom } from "@/states/rootAtom";

export default function Content({ children }: { children: React.ReactNode }) {
  const rootState = useAtomValue(rootAtom);
  const isShowSidebar = rootState.isShowSidebar;

  return (
    <div
      className={`${isShowSidebar ? "hidden sm:block " : ""} grow bg-gray-200`}
    >
      <Navbar />
      <div className="container w-full">{children}</div>
    </div>
  );
}
