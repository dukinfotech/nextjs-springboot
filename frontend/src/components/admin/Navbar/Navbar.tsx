"use client";

import React, { useEffect } from "react";
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { api } from "@/utils/api";
import UserEntity from "@/entities/UserEntity";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/states/authAtom";

export default function Navbar() {
  const [authState, setAuthState] = useAtom(authAtom);
  const userInfo = authState.userInfo;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!userInfo) {
        const res = await api.get("/api/users/info");
        const _userInfo = (await res.json()) as UserEntity;
        setAuthState({ ...authState, userInfo: _userInfo });
      }
    })();
  }, []);

  const handleLogout = () => {
    setAuthState({ accessToken: "", userInfo: null });
    router.replace("/login");
  };

  return (
    <NavbarUI className="navbar">
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">Dashboard</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <div>Hello, {userInfo?.firstName}</div>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" variant="flat" onPress={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
