"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import { MenuBurger } from "react-flaticons";

interface HeaderProps {
  onToggle: () => void;
}

export default function Header({ onToggle }: HeaderProps) {
  const { isShow } = useContext(SidebarContext);

  return (
    <Navbar
      className={`${
        isShow ? "sidebar-header" : "sidebar-header-center"
      } bg-transparent`}
    >
      <NavbarBrand className={`${isShow ? "block" : "hidden"} text-white`}>
        <p className="font-bold text-inherit">Dx2 Pro</p>
      </NavbarBrand>
      <NavbarContent justify={isShow ? "end" : "center"} className="basis">
        <NavbarItem>
          <Button isIconOnly color="primary" variant="flat" onPress={onToggle}>
            <MenuBurger />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
