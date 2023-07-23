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
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logout, setUserInfo } from "@/states/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    (async () => {
      if (!userInfo) {
        const res = await api.get("/api/users/info");
        const _userInfo = (await res.json()) as UserEntity;
        dispatch(setUserInfo(_userInfo));
      }
    })();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
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
