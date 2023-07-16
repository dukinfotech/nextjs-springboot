"use client";

import { useAppSelector } from "@/hooks/hook";
import Navbar from "../Navbar/Navbar";

export default function Content({ children }: { children: React.ReactNode }) {
  const isShowSidebar = useAppSelector((state) => state.app.isShowSidebar);

  return (
    <div
      className={`${isShowSidebar ? "hidden sm:block " : ""} grow bg-gray-200`}
    >
      <Navbar />
      <div className="container w-full">{children}</div>
    </div>
  );
}
