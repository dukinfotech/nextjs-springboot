import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import UserProfile from "./UserProfile";
import LogoutButton from "./LogoutButton";
import UserEntity from "@/entities/UserEntity";
import { api } from "@/utils/api";
import { redirect } from "next/navigation";

const fetchUserInfo = async () => {
  const res = await api.get("/api/users/info");
  if (res.ok) {
    const userInfo = (await res.json()) as UserEntity;
    return userInfo;
  } else {
    if (res.status === 401) {
      redirect("/login?isExpired=true");
    }
    return Promise.reject();
  }
};

export default async function Navbar() {
  const user = await fetchUserInfo();

  return (
    <NavbarUI className="navbar">
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">Dashboard</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserProfile user={user} />
        </NavbarItem>
        <NavbarItem>
          <LogoutButton />
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
