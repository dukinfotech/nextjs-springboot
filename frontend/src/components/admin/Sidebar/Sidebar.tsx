"use client";

import { useMemo } from "react";
import Header from "./Header";
import { ChartPie, Users, ShieldCheck, Clock } from "react-flaticons";
import { useAtom } from "jotai";
import { rootAtom } from "@/states/rootAtom";
import MenuItem from "./MenuItem";

export default function Sidebar() {
  const [rootState, setRootState] = useAtom(rootAtom);
  const isShowSidebar = rootState.isShowSidebar;

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
        <MenuItem text="Dashboard" path="/admin" icon={<ChartPie />} />
        <MenuItem text="Roles" path="/admin/roles" icon={<Users />} />
        <MenuItem text="Permissions" path="/admin/permissions" icon={<ShieldCheck />} />
        <MenuItem text="Traces" path="/admin/traces" icon={<Clock />} />
      </ul>
    </aside>
  );
}
