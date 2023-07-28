"use client";

import { authAtom } from "@/states/authAtom";
import { Button } from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const setAuthState = useSetAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    setAuthState({ accessToken: "", userInfo: null });
    router.replace("/login");
  };

  return (
    <Button color="primary" variant="flat" onPress={handleLogout}>
      Logout
    </Button>
  );
}
