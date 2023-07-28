"use client";

import UserEntity from "@/entities/UserEntity";
import { authAtom } from "@/states/authAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function UserProfile({ user }: { user: UserEntity }) {
  const [authState, setAuthState] = useAtom(authAtom);

  useEffect(() => {
    if (authState.accessToken) {
      setAuthState({ ...authState, userInfo: user });
    }
  }, []);

  return <div>Hello, {user.firstName}</div>;
}
