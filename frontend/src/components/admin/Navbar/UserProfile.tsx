"use client";

import UserEntity from "@/entities/UserEntity";
import { userInfoAtom } from "@/states/authAtom";
import { useHydrateAtoms } from "jotai/utils";

export default function UserProfile({ user }: { user: UserEntity }) {
  useHydrateAtoms([[userInfoAtom, user]]);

  return <div>Hello, {user.firstName}</div>;
}
