"use client";

import { useMemo } from "react";
import Header from "./Header";
import { ChartPie, Users, ShieldCheck, Clock } from "react-flaticons";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { rootAtom } from "@/states/rootAtom";

export default function Sidebar() {
  const [rootState, setRootState] = useAtom(rootAtom);
  const isShowSidebar = rootState.isShowSidebar;
  const pathname = usePathname();

  const widthSidebar = useMemo(() => {
    return isShowSidebar ? "w-full sm:w-80" : "w-20";
  }, [isShowSidebar]);

  return (
    <aside
      className={`${widthSidebar} h-full px-3 py-4 overflow-y-auto bg-slate-800`}
      aria-label="Sidebar"
    >
      <div style={{ transform: "translateY(-16px)" }}>
        <Header
          onToggle={() =>
            setRootState({ ...rootState, isShowSidebar: !isShowSidebar })
          }
        />
      </div>
      <ul className="space-y-2">
        <li className={pathname === "/admin" ? "active" : ""}>
          <a
            href="/admin"
            className={`${
              isShowSidebar ? "justify-start" : "justify-center"
            } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
          >
            <ChartPie />
            <span className={isShowSidebar ? "ml-3 block" : "hidden"}>
              Dashboard
            </span>
          </a>
        </li>
        <li className={pathname === "/admin/roles" ? "active" : ""}>
          <a
            href="/admin/roles"
            className={`${
              isShowSidebar ? "justify-start" : "justify-center"
            } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
          >
            <Users />
            <span className={isShowSidebar ? "ml-3 block" : "hidden"}>
              Roles
            </span>
          </a>
        </li>
        <li className={pathname === "/admin/permissions" ? "active" : ""}>
          <a
            href="/admin/permissions"
            className={`${
              isShowSidebar ? "justify-start" : "justify-center"
            } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
          >
            <ShieldCheck />
            <span className={isShowSidebar ? "ml-3 block" : "hidden"}>
              Permissions
            </span>
          </a>
        </li>
        <li className={pathname === "/admin/traces" ? "active" : ""}>
          <a
            href="/admin/traces"
            className={`${
              isShowSidebar ? "justify-start" : "justify-center"
            } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
          >
            <Clock />
            <span className={isShowSidebar ? "ml-3 block" : "hidden"}>
              Traces
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
