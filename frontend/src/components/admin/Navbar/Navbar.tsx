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

const fetchUserInfo = async (): Promise<UserEntity> => {
  const res = await api.get("/api/users/info");
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(res.statusText);
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
