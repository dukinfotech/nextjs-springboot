"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { MenuBurger } from "react-flaticons";
import { useAppSelector } from "@/hooks/hook";

interface HeaderProps {
  onToggle: () => void;
}

export default function Header({ onToggle }: HeaderProps) {
  const isShowSidebar = useAppSelector((state) => state.app.isShowSidebar);

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
