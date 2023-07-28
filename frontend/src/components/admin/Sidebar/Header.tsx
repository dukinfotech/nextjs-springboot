"use client";

import { rootAtom } from "@/states/rootAtom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { MenuBurger } from "react-flaticons";

interface HeaderProps {
  onToggle: () => void;
}

export default function Header({ onToggle }: HeaderProps) {
  const { isShowSidebar } = useAtomValue(rootAtom);

  return (
    <Navbar
      className={`${
        isShowSidebar ? "sidebar-header" : "sidebar-header-center"
      } bg-transparent`}
    >
      <NavbarBrand
        className={`${isShowSidebar ? "block" : "hidden"} text-white`}
      >
        <p className="font-bold text-inherit">Dx2 Pro</p>
      </NavbarBrand>
      <NavbarContent
        justify={isShowSidebar ? "end" : "center"}
        className="basis"
      >
        <NavbarItem>
          <Button isIconOnly color="primary" variant="flat" onPress={onToggle}>
            <MenuBurger />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
