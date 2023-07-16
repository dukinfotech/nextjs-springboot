"use client";

import { useMemo, useState } from "react";
import Header from "./Header";
import { SidebarContext } from "./SidebarContext";
import { ChartPie } from "react-flaticons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const pathname = usePathname();

  const widthSidebar = useMemo(() => {
    return isShow ? "w-full sm:w-80" : "w-20";
  }, [isShow]);

  return (
    <SidebarContext.Provider value={{ isShow: isShow }}>
      <aside
        className={`${widthSidebar} h-full px-3 py-4 overflow-y-auto bg-slate-800`}
        aria-label="Sidebar"
      >
        <div style={{ transform: "translateY(-16px)" }}>
          <Header onToggle={() => setIsShow(!isShow)} />
        </div>
        <ul className="space-y-2">
          <li className={pathname === "/" ? "active" : ""}>
            <a
              href="#"
              className={`${
                isShow ? "justify-start" : "justify-center"
              } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
            >
              <ChartPie />
              <span className={isShow ? "ml-3 block" : "hidden"}>
                Dashboard
              </span>
            </a>
          </li>
        </ul>
      </aside>
    </SidebarContext.Provider>
  );
}
