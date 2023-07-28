"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <Button color="primary" variant="flat" onPress={handleLogout}>
      Logout
    </Button>
  );
}
