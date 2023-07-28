"use client";

import UserEntity from "@/entities/UserEntity";
import { authAtom } from "@/states/authAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";


export default function UserProfile({ user }: { user: UserEntity }) {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    setAuth({...auth, userInfo: user});
  }, []);

  return <div>Hello, {user.firstName}</div>
}
