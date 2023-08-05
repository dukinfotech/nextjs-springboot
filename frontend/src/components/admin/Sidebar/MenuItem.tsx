import { rootAtom } from "@/states/rootAtom";
import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MenuItemProps {
  text: string;
  path: string;
  icon: ReactNode;
}

export default function MenuItem({ text, path, icon }: MenuItemProps) {
  const { isShowSidebar } = useAtomValue(rootAtom);
  const pathname = usePathname();

  return (
    <li className={pathname === path ? "active" : ""}>
      <a
        href={path}
        className={`${
          isShowSidebar ? "justify-start" : "justify-center"
        } flex p-2 text-base font-normal rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100`}
      >
        {icon}
        <span className={isShowSidebar ? "ml-3 block" : "hidden"}>{text}</span>
      </a>
    </li>
  );
}
