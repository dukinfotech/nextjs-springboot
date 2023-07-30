"use client";

import { accessTokenAtom, userInfoAtom } from "@/states/authAtom";
import { Button } from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUserInfo = useSetAtom(userInfoAtom);

  const handleLogout = () => {
    setAccessToken("");
    setUserInfo(null);
    router.replace("/login");
  };

  return (
    <Button color="primary" variant="flat" onPress={handleLogout}>
      Logout
    </Button>
  );
}
