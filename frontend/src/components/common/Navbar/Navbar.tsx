"use client";

import React from "react";
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Navbar() {
  return (
    <NavbarUI className="navbar">
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">Dashboard</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem as={Link} className="hidden lg:flex" href="#">
          Login
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
